// src/AppRouter.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import About from './Pages/About_Us/About';
import Products from './Pages/Product_Customi/Products'; // Adjust path as needed
import Exhibitions from './Pages/Exhibitions_Program/Exhibitions';
import GlobalExport from './Pages/Global_Export/GlobalExport';

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/exhibitions" element={<Exhibitions />} />
                <Route path="/global-export" element={<GlobalExport />} />
                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
}

export default AppRouter;