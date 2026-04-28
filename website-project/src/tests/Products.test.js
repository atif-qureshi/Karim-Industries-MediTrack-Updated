import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Products from '../Pages/Products/Products';

// Mock all image imports
jest.mock('../Pages/Products/images/Cotton Wool.jpg', () => 'mock-cotton-wool.jpg');
jest.mock('../Pages/Products/images/Cotton Balls white.jpg', () => 'mock-cotton-balls.jpg');
jest.mock('../Pages/Products/images/Medi Zig Zag.JPG', () => 'mock-medi-zig-zag.jpg');
jest.mock('../Pages/Products/images/ortho cot.jpg', () => 'mock-ortho-cot.jpg');
jest.mock('../Pages/Products/images/Cotton Crepe Bandage.jpg', () => 'mock-cotton-crepe.jpg');
jest.mock('../Pages/Products/images/Plaster of Paris New.png', () => 'mock-plaster-paris.jpg');
jest.mock('../Pages/Products/images/Medi Band.jpeg', () => 'mock-medi-band.jpg');
jest.mock('../Pages/Products/images/Triangular White.jpg', () => 'mock-triangular.jpg');
jest.mock('../Pages/Products/images/Soft Guaze.JPG', () => 'mock-soft-guaze.jpg');
jest.mock('../Pages/Products/images/Me Soft Guaze.jpg', () => 'mock-me-soft-guaze.jpg');
jest.mock('../Pages/Products/images/Gauze Roll.JPG', () => 'mock-guaze-roll.jpg');
jest.mock('../Pages/Products/images/Lint Gauze a.jpg', () => 'mock-lint-guaze.jpg');
jest.mock('../Pages/Products/images/Medi Lap Sponges.jpg', () => 'mock-medi-lap-sponges.jpg');
jest.mock('../Pages/Products/images/Medi Sofra Tulle.jpg', () => 'mock-medi-sofra-tulle.jpg');
jest.mock('../Pages/Products/images/Septi Grass.jpg', () => 'mock-septi-grass.jpg');
jest.mock('../Pages/Products/images/Medi Paraffin.jpg', () => 'mock-medi-paraffin.jpg');
jest.mock('../Pages/Products/images/Fusitin Tulle.jpg', () => 'mock-fusitin-tulle.jpg');
jest.mock('../Pages/Products/images/Medi Eye Pad.jpg', () => 'mock-medi-eye-pad.jpg');
jest.mock('../Pages/Products/images/Povee Tulle.jpg', () => 'mock-povee-tulle.jpg');
jest.mock('../Pages/Products/images/Silva Tulle.jpg', () => 'mock-silva-tulle.jpg');
jest.mock('../Pages/Products/images/Paper Tape (Surgi Grip).JPG', () => 'mock-surgi-grip.jpg');
jest.mock('../Pages/Products/images/Alcohol Swab.JPG', () => 'mock-alco-swab.jpg');
jest.mock('../Pages/Products/images/Medicare Drape Kit.png', () => 'mock-drape-kit.jpg');
jest.mock('../Pages/Products/images/Medicare-Gown.png', () => 'mock-gown.jpg');

describe('Products Component', () => {
  test('renders products page with product list', () => {
    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    );

    expect(screen.getByText('Medi Cot')).toBeInTheDocument();
    expect(screen.getByText('Absorbent Cotton Wool')).toBeInTheDocument();
    expect(screen.getByText('Medi Balls')).toBeInTheDocument();
  });

  test('renders product features', () => {
    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    );

    expect(screen.getByText('Chemical inert and free of any optical brightening agent')).toBeInTheDocument();
    expect(screen.getByText('Sterile before use')).toBeInTheDocument();
  });

  test('renders product usage', () => {
    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    );

    expect(screen.getByText('Cleansing and swabbing wounds')).toBeInTheDocument();
    expect(screen.getByText('Pre-operative skin preparation')).toBeInTheDocument();
  });
});