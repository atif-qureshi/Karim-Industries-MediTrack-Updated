function buildGeminiClient(apiKey) {
  // Gemini REST API base — v1beta exposes all current models including text-embedding-004
  const baseUrl = (process.env.GEMINI_API_BASE || 'https://generativelanguage.googleapis.com/v1beta').replace(/\/+$/g, '');

  // Map internal/OpenAI model names to actual Gemini model IDs
  // Available embedding models: gemini-embedding-001, gemini-embedding-2
  // Available chat models: gemini-2.5-flash, gemini-2.0-flash, gemini-3.5-flash, etc.
  const normalizeModel = (model) => {
    const modelMap = {
      'text-embedding-3-small': 'gemini-embedding-001',
      'text-embedding-3-large': 'gemini-embedding-2',
      'gpt-4o-mini': 'gemini-2.5-flash',
      'gpt-4o': 'gemini-2.5-pro'
    };
    return modelMap[model] || model;
  };

  // Gemini REST API authenticates via ?key= query param, NOT Authorization header
  const buildUrl = (path) => `${baseUrl}${path}?key=${apiKey}`;

  const requestJson = async (url, body) => {
    const fetchFn = typeof fetch === 'function' ? fetch : null;
    if (!fetchFn) {
      throw new Error('Global fetch is not available. Node 18+ is required.');
    }

    let response;
    try {
      response = await fetchFn(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(body)
      });
    } catch (err) {
      throw new Error(`Gemini request failed for ${url}: ${err.message}`);
    }

    const text = await response.text();
    let data = {};
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        if (!response.ok) {
          throw new Error(`Gemini returned non-JSON error for ${url} (${response.status}): ${text.slice(0, 300)}`);
        }
      }
    }

    if (!response.ok) {
      const errMsg = data?.error?.message || data?.message || response.statusText;
      throw new Error(`Gemini API error for ${url}: ${errMsg}`);
    }
    return data;
  };

  return {
    embeddings: {
      create: async ({ model, input }) => {
        const geminiModel = normalizeModel(model);
        const textInput = Array.isArray(input) ? input.join('\n') : input;

        // Gemini embedContent endpoint and request body format
        const url = buildUrl(`/models/${geminiModel}:embedContent`);
        const body = {
          model: `models/${geminiModel}`,
          content: {
            parts: [{ text: textInput }]
          }
        };

        const data = await requestJson(url, body);

        // Gemini response: { "embedding": { "values": [...] } }
        const embedding = data?.embedding?.values;
        if (!Array.isArray(embedding) || embedding.length === 0) {
          throw new Error(`Gemini embedding response missing values. Response: ${JSON.stringify(data).slice(0, 200)}`);
        }

        return { data: [{ embedding }] };
      }
    },
    chat: {
      completions: {
        create: async ({ model, temperature, messages }) => {
          const geminiModel = normalizeModel(model);
          const url = buildUrl(`/models/${geminiModel}:generateContent`);

          // Convert messages to Gemini's content format
          const contents = messages
            .filter((m) => m.role !== 'system')
            .map((m) => ({
              role: m.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: m.content }]
            }));

          // Prepend system message as first user turn if present
          const systemMsg = messages.find((m) => m.role === 'system');
          if (systemMsg) {
            contents.unshift({ role: 'user', parts: [{ text: systemMsg.content }] });
          }

          const body = {
            contents,
            generationConfig: {
              temperature: temperature ?? 0.7,
              maxOutputTokens: 1024,
              candidateCount: 1
            }
          };

          const data = await requestJson(url, body);

          // Gemini response: { "candidates": [{ "content": { "parts": [{ "text": "..." }] } }] }
          const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (!content) {
            throw new Error(`Gemini chat response was invalid. Response: ${JSON.stringify(data).slice(0, 200)}`);
          }
          return { choices: [{ message: { content } }] };
        }
      }
    }
  };
}

function createGeminiClient() {
  const geminiKey = process.env.GEMINI_API_KEY;
  const useGemini = String(process.env.USE_GEMINI || 'false').toLowerCase() === 'true';

  if (geminiKey && useGemini) {
    try {
      return buildGeminiClient(geminiKey);
    } catch (err) {
      console.warn('Failed to initialize Gemini client:', err.message || err);
      return null;
    }
  }

  if (geminiKey && !useGemini) {
    console.warn('GEMINI_API_KEY is set but USE_GEMINI is not enabled. To use Gemini, set USE_GEMINI=true.');
    return null;
  }

  console.warn('GEMINI_API_KEY is not configured or enabled — RAG features disabled.');
  return null;
}

module.exports = { createGeminiClient };
