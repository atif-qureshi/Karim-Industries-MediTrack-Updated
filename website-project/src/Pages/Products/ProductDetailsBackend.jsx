import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductDetail.css';
import AlcoholSwab from './images/Alcohol Swab.JPG';
import CottonWool from './images/Cotton Wool.jpg';
import CottonBalls from './images/Cotton Balls white.jpg';
import CottonCrepe from './images/Cotton Crepe Bandage.jpg';
import FusitinTulle from './images/Fusitin Tulle.jpg';
import GauzeRoll from './images/Gauze Roll.JPG';
import LintGauze from './images/Lint Gauze a.jpg';
import MeSoftGuaze from './images/Me Soft Guaze.jpg';
import MediBand from './images/Medi Band.jpeg';
import MediEyePad from './images/Medi Eye Pad.jpg';
import MediLapSponges from './images/Medi Lap Sponges.jpg';
import MediParaffin from './images/Medi Paraffin.jpg';
import MediPlast from './images/Plaster of Paris New.png';
import MediSofraTulle from './images/Medi Sofra Tulle.jpg';
import MediTriangular from './images/Triangular White.jpg';
import MediZigZag from './images/Medi Zig Zag.JPG';
import MedicareDrapeKit from './images/Medicare Drape Kit.png';
import MedicareGown from './images/Medicare-Gown.png';
import OrthoCott from './images/ortho cot.jpg';
import PoveeTulle from './images/Povee Tulle.jpg';
import SeptiGrassTulle from './images/Septi Grass.jpg';
import SilvaTulle from './images/Silva Tulle.jpg';
import SoftGuaze from './images/Soft Guaze.JPG';
import SurgiGrip from './images/Paper Tape (Surgi Grip).JPG';

const imageMap = {
  'Alco Swab': AlcoholSwab,
  'Fustin Tulle': FusitinTulle,
  'Medi Band': MediBand,
  'Medi Cot': CottonWool,
  'Medi Balls': CottonBalls,
  'Medi Crepe': CottonCrepe,
  'Me Soft Gauze': MeSoftGuaze,
  'Medi Eye Pad': MediEyePad,
  'Medi Lap Sponges': MediLapSponges,
  'Medi Lint Gauze': LintGauze,
  'Medi Paraffin': MediParaffin,
  'Medi Plast': MediPlast,
  'Medi Sofra Tulle': MediSofraTulle,
  'Medi Triangular': MediTriangular,
  'Medi Zig Zag': MediZigZag,
  'Medicare Drape Kit': MedicareDrapeKit,
  'Medicare Gown': MedicareGown,
  'Ortho Cot': OrthoCott,
  'Povee-Tulle': PoveeTulle,
  'Septi Grass Tulle': SeptiGrassTulle,
  'Silva Tulle': SilvaTulle,
  'Soft Gauze': SoftGuaze,
  'Soft Gauze Roll': GauzeRoll,
  'Surgi Grip': SurgiGrip
};

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Product not found');
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setProduct(null);
        setError('Product not found.');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="product-detail-page">Loading product...</div>;
  }

  if (!product) {
    return <div className="product-detail-page">{error || 'Product not found.'}</div>;
  }

  const isLargeImage = [1, 2, 8, 9, 10].includes(product.id);

  return (
    <div className="product-detail-page">
      <div className="products-heading">
        <h1>Products Detail</h1>
        <p>High-quality medical supplies and dressings meeting international standards for healthcare professionals</p>
      </div>
      <div className="product-detail-container">
        <div className="product-image">
          <img
            src={product.imageUrl || imageMap[product.name] || ''}
            alt={product.name}
            className={isLargeImage ? 'large-image' : ''}
          />
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <h2>{product.title}</h2>
          <div className="product-description">
            <h3>Description:</h3>
            <p>{product.description}</p>
          </div>

          {product.storage && product.storage.length > 0 && (
            <div className="product-storage">
              <h3>Storage:</h3>
              <ul>
                {product.storage.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="product-features">
            <h3>Features:</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="product-sizes">
            <h3>Available Sizes:</h3>
            <p>{product.sizes}</p>
          </div>

          <div className="product-usage">
            <h3>Usage:</h3>
            <ul>
              {product.usage.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {product.precautions && product.precautions.length > 0 && (
            <div className="product-precaution">
              <h3>Precautions:</h3>
              <ul>
                {product.precautions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <Link
            to="/ContactUs"
            className="inquiry-btn"
            onClick={() => window.scrollTo(0, 0)}
          >
            Product Inquiry
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
