import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';

describe('Footer Component', () => {
  test('renders footer with quick links', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  test('renders factory address', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText('Factory')).toBeInTheDocument();
    expect(screen.getByText(/½ Km Raiwind Road/)).toBeInTheDocument();
    expect(screen.getByText('+92-42-35392174')).toBeInTheDocument();
  });

  test('renders office address', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText('Office')).toBeInTheDocument();
    expect(screen.getByText(/Karim Industries/)).toBeInTheDocument();
  });

  test('renders social media links', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText('Follow Us')).toBeInTheDocument();
    // Check for social media icons or links
    const facebookLink = screen.getByRole('link', { name: /facebook/i });
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(facebookLink).toBeInTheDocument();
    expect(linkedinLink).toBeInTheDocument();
  });

  test('renders copyright notice', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText(/© 2024 Karim Industries/)).toBeInTheDocument();
  });
});