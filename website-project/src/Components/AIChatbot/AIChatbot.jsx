import React, { useEffect, useRef, useState } from 'react';
import './AIChatbot.css';
const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hello! I am your AI Medical Product Assistant. Ask me about products, suitability, latex-free options, or surgical supplies.' }
  ]);
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const addMessage = (message) => {
    setMessages((current) => [...current, message]);
  };

  const submitQuestion = async (e) => {
    e.preventDefault();
    const trimmed = question.trim();
    if (!trimmed) return;

    setError('');
    addMessage({ role: 'user', text: trimmed });
    setQuestion('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/rag/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmed })
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.message || 'Unable to process your question.');
      }

      const data = await response.json();
      const answer = data.answer || 'I could not find enough information in the product catalog.';
      const products = Array.isArray(data.products) && data.products.length ? `\n\nProducts: ${data.products.join(', ')}` : '';
      const source = Array.isArray(data.sources) && data.sources.length ? `\n\nSource: ${data.sources.join(', ')}` : '';
      addMessage({ role: 'assistant', text: `${answer}${products}${source}` });
    } catch (err) {
      console.error('Chatbot error:', err);
      setError(err.message || 'Chatbot request failed.');
      addMessage({ role: 'assistant', text: 'I could not find enough information in the product catalog.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`ai-chatbot-widget${isOpen ? ' open' : ''}`}>

      {/* Floating pill — visible only when closed */}
      <button
        className="ai-chatbot-toggle"
        onClick={() => setIsOpen(true)}
        aria-label="Open AI chat"
      >
        <span className="ai-chatbot-toggle-icon">AI</span>
        Ask about products
      </button>

      {/* Full header — visible only when open */}
      <div className="ai-chatbot-header">
        <div>
          <div className="ai-chatbot-title">AI Medical Product Assistant</div>
          <div className="ai-chatbot-subtitle">Ask about medical products, surgical supplies, and recommendations.</div>
        </div>
        <button
          className="ai-chatbot-close"
          onClick={() => setIsOpen(false)}
          aria-label="Close chat"
        >
          ×
        </button>
      </div>

      {isOpen && (
        <div className="ai-chatbot-body">
          <div className="ai-chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`ai-chatbot-message ${message.role}`}>
                <span>{message.text}</span>
              </div>
            ))}
            {isLoading && (
              <div className="ai-chatbot-message assistant typing">
                <span>Typing...</span>
              </div>
            )}
          </div>

          {error && <div className="ai-chatbot-error">{error}</div>}

          <form className="ai-chatbot-input-row" onSubmit={submitQuestion}>
            <input
              ref={inputRef}
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about gloves, sterilization, latex-free products..."
              aria-label="Ask a question"
            />
            <button type="submit" disabled={isLoading}>Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIChatbot;
