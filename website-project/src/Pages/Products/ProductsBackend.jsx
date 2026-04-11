import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Products.css';
import MediCott from './images/Cotton Wool.jpg';
import MediBalls from './images/Cotton Balls white.jpg';
import MediZigZag from './images/Medi Zig Zag.JPG';
import OrthoCott from './images/ortho cot.jpg';
import CottonCrepe from './images/Cotton Crepe Bandage.jpg';
import Plasterparis from './images/Plaster of Paris New.png';
import MediBand from './images/Medi Band.jpeg';
import Triagular from './images/Triangular White.jpg';
import SoftGuaze from './images/Soft Guaze.JPG';
import MeSoftGuaze from './images/Me Soft Guaze.jpg';
import GuazeRole from './images/Gauze Roll.JPG';
import LintGuaze from './images/Lint Gauze a.jpg';
import MediLapSponges from './images/Medi Lap Sponges.jpg';
import SufraTulle from './images/Medi Sofra Tulle.jpg';
import SeptiGrassTulle from './images/Septi Grass.jpg';
import MediParaffine from './images/Medi Paraffin.jpg';
import FustinTulle from './images/Fusitin Tulle.jpg';
import EyePad from './images/Medi Eye Pad.jpg';
import PoveeTulle from './images/Povee Tulle.jpg';
import SilvaTulle from './images/Silva Tulle.jpg';
import Surgigrip from './images/Paper Tape (Surgi Grip).JPG';
import AlcoSwab from './images/Alcohol Swab.JPG';
import Drape from './images/Medicare Drape Kit.png';
import Gown from './images/Medicare-Gown.png';

const imageMap = {
  1: MediCott,
  2: MediBalls,
  3: MediZigZag,
  4: OrthoCott,
  5: CottonCrepe,
  6: Plasterparis,
  7: MediBand,
  8: Triagular,
  9: SoftGuaze,
  10: MeSoftGuaze,
  11: GuazeRole,
  12: LintGuaze,
  13: MediLapSponges,
  14: SufraTulle,
  15: SeptiGrassTulle,
  16: MediParaffine,
  17: FustinTulle,
  18: EyePad,
  19: PoveeTulle,
  20: SilvaTulle,
  21: Surgigrip,
  22: AlcoSwab,
  23: Drape,
  24: Gown
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Unable to load products.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="products-container">Loading products...</div>;
  }

  if (error) {
    return <div className="products-container">{error}</div>;
  }

  if (!products.length) {
    return <div className="products-container">No products available.</div>;
  }

  return (
    <div className="products-container">
      <div className="products-heading">
        <h1>Our Medical Products</h1>
        <p>High-quality medical supplies and dressings meeting international standards for healthcare professionals</p>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl || imageMap[product.id] || ''} alt={product.name} />
            <h3>{product.name}</h3>
            <Link
              to={`/products/${product.id}`}
              className="inquiry-btn"
              onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
