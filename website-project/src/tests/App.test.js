import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

// Mock all components to avoid image imports and complex rendering
jest.mock('../Components/Header/HeaderBackend.jsx', () => () => <div>Header</div>);
jest.mock('../Pages/Home/Home.jsx', () => () => <div>Home</div>);
jest.mock('../Pages/AboutUs/About.jsx', () => () => <div>About Us</div>);
jest.mock('../Components/Footer/Footer.jsx', () => () => <div>Footer</div>);
jest.mock('../Pages/StandardCompliance/StandardCompliance.jsx', () => () => <div>Standard Compliance</div>);
jest.mock('../Pages/GlobalExport/GlobalExport.jsx', () => () => <div>Global Export</div>);
jest.mock('../Pages/LogisticManagement/LogisticManagement.jsx', () => () => <div>Logistic Management</div>);
jest.mock('../Pages/MarketCompliance/MarketCompliance.jsx', () => () => <div>Market Compliance</div>);
jest.mock('../Pages/ExhibitionsProgram/ExhibitionProgram.jsx', () => () => <div>Exhibition Program</div>);
jest.mock('../Pages/DistributerCollabration/DistributerCollabration.jsx', () => () => <div>Distributer Collaboration</div>);
jest.mock('../Pages/Products/ProductsBackend.jsx', () => () => <div>Products</div>);
jest.mock('../Pages/Products/ProductDetailsBackend.jsx', () => () => <div>Product Detail</div>);
jest.mock('../Pages/Admin/Admin.jsx', () => () => <div>Admin</div>);
jest.mock('../Pages/ContactUs/ContactUs.jsx', () => () => <div>Contact Us</div>);
jest.mock('../Pages/Services/Services.jsx', () => () => <div>Services</div>);
jest.mock('../Components/ScreenLoader/PageTransition.jsx', () => ({ children }) => <div>{children}</div>);
jest.mock('../Components/WhatsAppButton/WhatsAppButton.jsx', () => () => <div>WhatsApp Button</div>);
jest.mock('../Components/NotFound/NotFound.jsx', () => () => <div>Not Found</div>);

test('renders App with Header and Footer', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText('Header')).toBeInTheDocument();
  expect(screen.getByText('Footer')).toBeInTheDocument();
  expect(screen.getByText('Home')).toBeInTheDocument();
});

test('renders Not Found for unknown route', () => {
  render(
    <MemoryRouter initialEntries={['/unknown']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText('Not Found')).toBeInTheDocument();
});
