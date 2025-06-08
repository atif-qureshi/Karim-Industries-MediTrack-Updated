import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header.jsx';
import Home from './Pages/Home/Home.jsx';
import AboutUs from './Pages/AboutUs/About.jsx';
import Footer from './Components/Footer/Footer.jsx';
import CustomManuf from './Pages/CustomManuf/CustomManuf.jsx';
import StandardCompliance from './Pages/StandardCompliance/StandardCompliance.jsx';
import GlobalExport from './Pages/GlobalExport/GlobalExport.jsx';
import LogisticManagement from './Pages/LogisticManagement/LogisticManagement.jsx';
import MarketCompliance from './Pages/MarketCompliance/MarketCompliance.jsx';
import ExhibitionProgram from './Pages/ExhibitionsProgram/ExhibitionProgram.jsx';
import DistributerCollabration from './Pages/DistributerCollabration/DistributerCollabration.jsx';
import Products from './Pages/Products/Products.jsx';
import ProductDetail from './Pages/Products/ProductDetails.jsx';
import ContactUs from './Pages/ContactUs/ContactUs.jsx';
import Services from './Pages/Services/Services.jsx';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path='/CustomManuf' element={<CustomManuf />} />
        <Route path='/StandardCompliance' element={<StandardCompliance />} />
        <Route path='/GlobalExport' element={<GlobalExport />} />
        <Route path='/LogisticManagement' element={<LogisticManagement />} />
        <Route path='/MarketCompliance' element={<MarketCompliance />} />
        <Route path='/ExhibitionProgram' element={<ExhibitionProgram />} />
        <Route path='/DistributerCollaboration' element={<DistributerCollabration />} />
        <Route path='/Products' element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path='/ContactUs' element={<ContactUs />} />
        <Route path='/Services' element={<Services />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

