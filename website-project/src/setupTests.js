// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock images and fetch for tests
global.fetch = jest.fn();
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const mockImage = {
  src: '',
  onload: null,
  onerror: null,
};
global.Image = jest.fn(() => mockImage);
global.FileReader = jest.fn(() => ({
  readAsDataURL: jest.fn(),
  onload: null,
  result: 'data:image/png;base64,mock',
}));

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Link: ({ children, ...props }) => <a {...props}>{children}</a>,
  MemoryRouter: ({ children }) => <div>{children}</div>,
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' }),
  useParams: () => ({}),
  BrowserRouter: ({ children }) => <div>{children}</div>,
}));
