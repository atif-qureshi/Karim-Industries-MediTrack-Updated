import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header.jsx';
import Home from './Pages/Home/Home.jsx';
import AboutUs from './Pages/AboutUs/About.jsx';
import Footer from './Components/Footer/Footer.jsx';
import CustomManuf from './Pages/CustomManuf/CustomManuf.jsx';
import ProductCustomization from './Pages/ProductCustomization/ProductCustomization.jsx';
import StandardCompliance from './Pages/StandardCompliance/StandardCompliance.jsx';
import GlobalExport from './Pages/GlobalExport/GlobalExport.jsx';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path='/CustomManuf' element={<CustomManuf />} />
        <Route path='/ProductCustomization' element={<ProductCustomization />} />
        <Route path='/StandardCompliance' element = {<StandardCompliance/>}/>
        <Route path='/GlobalExport' element={<GlobalExport />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
