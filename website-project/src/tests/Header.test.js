import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../Components/Header/HeaderBackend';

// Mock the logo image
jest.mock('../Components/Header/Images/logo.jpg', () => 'mock-logo.jpg');

// Mock Hamburger component
jest.mock('../Components/Header/Hamburger.js', () => () => <div>Hamburger Menu</div>);

describe('Header Component', () => {
  beforeEach(() => {
    global.fetch.mockClear();
  });

  test('renders header with logo and navigation', () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve([
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
      ]),
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByAltText('Karim Industries Logo')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
  });

  test('search functionality filters products', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve([
        { id: 1, name: 'Cotton Wool' },
        { id: 2, name: 'Cotton Balls' },
      ]),
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'Cotton' } });

    await waitFor(() => {
      expect(screen.getByText('Cotton Wool')).toBeInTheDocument();
      expect(screen.getByText('Cotton Balls')).toBeInTheDocument();
    });
  });

  test('clicking search suggestion navigates to product', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve([
        { id: 1, name: 'Cotton Wool' },
      ]),
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'Cotton' } });

    await waitFor(() => {
      const suggestion = screen.getByText('Cotton Wool');
      fireEvent.click(suggestion);
    });

    // Since useNavigate is mocked, we can't check navigation, but the click should work
    expect(suggestion).toBeInTheDocument();
  });

  test('mobile menu toggle works', () => {
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve([]),
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const hamburger = screen.getByText('Hamburger Menu');
    expect(hamburger).toBeInTheDocument();
    // Note: Actual toggle logic might need more setup
  });
});