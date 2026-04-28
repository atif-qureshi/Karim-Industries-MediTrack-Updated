import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../Pages/Home/Home';

// Mock all image imports
jest.mock('../Pages/Home/Images/CottonBandages.jpg', () => 'mock-cotton-bandages.jpg');
jest.mock('../Pages/Home/Images/CottonWool.jpg', () => 'mock-cotton-wool.jpg');
jest.mock('../Pages/Home/Images/CrepeBandage.jpeg', () => 'mock-crepe-bandage.jpeg');
jest.mock('../Pages/Home/Images/EyePad.jpeg', () => 'mock-eye-pad.jpeg');
jest.mock('../Pages/Home/Images/FusidateGuaze.jpg', () => 'mock-fusidate-guaze.jpg');
jest.mock('../Pages/Home/Images/GuazeSwab.png', () => 'mock-guaze-swab.png');
jest.mock('../Pages/Home/Images/LapSpongaes.jpg', () => 'mock-lap-sponges.jpg');
jest.mock('../Pages/Home/Images/LintGuaze.jpg', () => 'mock-lint-guaze.jpg');
jest.mock('../Pages/Home/Images/OrthoCotton.jpeg', () => 'mock-ortho-cotton.jpeg');
jest.mock('../Pages/Home/Images/POP.webp', () => 'mock-pop.webp');
jest.mock('../Pages/Home/Section/Surgicalteam.jpg', () => 'mock-surgical-team.jpg');
jest.mock('../Pages/Home/Section/AdvanceWound.jpeg', () => 'mock-advance-wound.jpeg');

describe('Home Component', () => {
  test('renders home page with slider', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText('Cotton Bandage')).toBeInTheDocument();
    expect(screen.getByText('Cotton Wool')).toBeInTheDocument();
    expect(screen.getByText('Crepe Bandage')).toBeInTheDocument();
  });

  test('renders image text section', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText('High-quality wound dressing products')).toBeInTheDocument();
    expect(screen.getByText('Surgical Team')).toBeInTheDocument();
  });

  test('renders product categories', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText('Cotton Wool')).toBeInTheDocument();
    expect(screen.getByText('Cotton Balls')).toBeInTheDocument();
    expect(screen.getByText('Zig Zag Cotton')).toBeInTheDocument();
  });

  test('renders contact section', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });
});