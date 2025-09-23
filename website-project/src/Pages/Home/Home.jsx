import { Link } from 'react-router-dom';
import './Home.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CottonBandage from './Images/CottonBandages.jpg';
import Wool from './Images/CottonWool.jpg';
import Crepe from './Images/CrepeBandage.jpeg';
import Eye from './Images/EyePad.jpeg';
import FusidateTulle from './Images/FusidateGuaze.jpg';
import Swab from './Images/GuazeSwab.png';
import Lap from './Images/LapSpongaes.jpg';
import Lint from './Images/LintGuaze.jpg';
import Ortho from './Images/OrthoCotton.jpeg';
import POp from './Images/POP.webp';

import Surgical from './Section/Surgicalteam.jpg';
import Advance from './Section/AdvanceWound.jpeg';  
const Home = () => {
  return (
    <div>
      <div className="slider-container">
        <div className="slider">
          <div className="slide">
            <img src={CottonBandage} alt="Slide 1" loading='lazy'/>
            <div className="slide-content">
              <h2>Cotton Bandage</h2>
            </div>
          </div>

          <div className="slide">
            <img src={Wool} alt="Slide 2" loading='lazy'/>
            <div className="slide-content">
              <h2>Cotton Wool</h2>
            </div>
          </div>

          <div className="slide">
            <img src={Crepe} alt="Slide 3" loading='lazy'/>
            <div className="slide-content">
              <h2>Crepe Bandage</h2>
            </div>
          </div>

          <div className="slide">
            <img src={Eye} alt="Slide 4" loading='lazy'/>
            <div className="slide-content">
              <h2>Eye Pad</h2>
            </div>
          </div>

          <div className="slide">
            <img src={FusidateTulle} alt="Slide 6" loading='lazy'/>
            <div className="slide-content">
              <h2>Fusidic Tulle</h2>
            </div>
          </div>

          <div className="slide">
            <img src={Swab} alt="Slide 7" loading='lazy'/>
            <div className="slide-content">
              <h2>Gauze Swab</h2>
            </div>
          </div>

          <div className="slide">
            <img src={Lap} alt="Slide 8" loading='lazy'/>
            <div className="slide-content">
              <h2>Lap Sponges</h2>
            </div>
          </div>

          <div className="slide">
            <img src={Lint} alt="Slide 9" loading='lazy'/>
            <div className="slide-content">
              <h2>Lint Gauze</h2>
            </div>
          </div>

          <div className="slide">
            <img src={Ortho} alt="Slide 10" loading='lazy'/>
            <div className="slide-content">
              <h2>Ortho Cotton</h2>
            </div>
          </div>

          <div className="slide">
            <img src={POp} alt="Slide 11" loading='lazy'/>
            <div className="slide-content">
              <h2>POP</h2>
            </div>
          </div>
        </div>
      </div>


      {/* Image + Text Box Section */}
      <div div className="image-text-section" >
        <div className="image-box">
          <img
            src={Surgical}
            alt="High-quality wound dressing products"
            loading='lazy'
          />
        </div>
        <div className="text-content">
          <h2>
            Experience Effective Surgical Dressing Solutions with Karim Industries
          </h2>
          <p>
            As a leading manufacturer of surgical dressing products established in 1985, we provide top-quality solutions for hospitals and international markets. With a rich history and a commitment to quality, we serve hospitals & international markets.
          </p>
          <p>
            Our products are designed to meet the highest standards of quality, safety, and innovation, contributing to the healthcare industry and patient care.
          </p>
          <Link to="/Products" className="cta-button-2">
            Explore Our Products
          </Link>
        </div>
      </div >

      <div className="text-content-2">
        <h2>
          Experience the Wide Range <br />
          of Wound Care Supplies Wholesale
        </h2>
        <p>
          As a renowned medical device manufacturing company specializing in surgical dressing / disposables, we offer a diverse array of surgical dressing products essential for medical practices. Our global solutions help professionals improve patient quality of life. We collaborate with numerous nursing facilities and medical suppliers to provide affordable wound care supplies to deserving patients. Our extensive range of products includes absorbent cotton wool products, gauze dressings/sponges, lint, tulle dressings, bandages, and more.
        </p>
      </div>

      <div className="image-text-section-2">
        <div className="image-box-2">
          <img
            src={CottonBandage}
            alt="High-quality wound dressing products"
            loading='lazy'
          />
        </div>
        <div className="text-content-3">
          <h2>Traditional Wound Dressing</h2>
          <p>
            At Karim Industries, we prioritize quality and efficiency in our products. These traditional dressings protect wounds from contamination and are suitable for uninfected wounds with mild exudate. Our offerings include Absorbent Cotton Wool (Medi Cot), Cotton Balls (Medi Balls), Zig Zag Cotton (Medi Zig Zag), Non Absorbent Cotton (Ortho Cot), Cotton Crepe Bandage (Medi Crepe), Plaster of Paris Bandage (Medi Plast), Open Wove Bandage (Medi Band), Triangular Bandage (Medi Triangular), Gauze Swab (Soft Gauze), Surgical Gauze Roll (Soft Gauze), and Lint Gauze (Medi Lint Gauze).
          </p>
          <Link to="/Products" className="cta-button-2">
            Explore Our Products
          </Link>
        </div>
      </div>

      <div className="image-text-section-3">
        <div className="image-box-3">
          <img
            src={Eye}
            alt="High-quality wound dressing products"
            loading='lazy'
          />
        </div>
        <div className="text-content-4">
          <h2>Condition Specific Dressing</h2>
          <p>
            Our condition-specific dressings are designed for targeted wound care. These include Lap Sponges (Medi Lap Sponges) for absorption during surgery, Gauze Eye Pad (Medi Eye Pad) for eye protection and relief, Alcohol Swab (Alco Swab) for cleaning and disinfection, and various medicated tulle dressings like Framycetin Sulphate (Medi Sofra Tulle), Chlorhexidine Tulle (Septi Grass Tulle), Paraffin Gauze (Medi Paraffin), Fusidic Acid (Fusitin Tulle), Povidone-Iodine (Povee-Tulle), and Silver Sulfadiazine (Silva Tulle) for infected and chronic wounds.
          </p>
          <Link to="/Products" className="cta-button-2">
            Explore Our Products
          </Link>
        </div>
      </div>

      <div className="image-text-section-4">
        <div className="image-box-4">
          <img
            src={Advance}
            alt="High-quality wound dressing products"
            loading='lazy'
          />
        </div>
        <div className="text-content-4">
          <h2>Advanced Wound Dressing</h2>
          <p>
            Karim Industries offers advanced solutions for complex wound management. These include Surgical Adhesive Paper Tape (Surgi Grip) for securing dressings, Surgical Drape Kit Set (Medicare) for sterile surgical environments, and Surgical Gowns (Medicare) for maximum barrier protection during procedures.
          </p>
          <Link to="/Products" className="cta-button-2">
            Explore Our Products
          </Link>
        </div>
      </div>

      {/* Cards */}
      <div className="card-container">
        <div className="card">
          <div className="card-content">
            <h3>Quality Assurance</h3>
            <p>We prioritize quality, employing rigorous testing and advanced manufacturing techniques to guarantee the reliability and efficacy of our products. Our certifications include ISO 13485:2016, ISO 9001:2015, ISO 45001:2018, and BCI, ensuring compliance with international standards.</p>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <h3>Innovative Solutions</h3>
            <p>We invest in research and development to remain at the forefront of medical innovation, aligning our products with the latest advancements and best practices in the healthcare industry.</p>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <h3>Patient-Centric Approaches</h3>
            <p>Our mission is to provide top-quality surgical dressing products that meet the highest standards of quality, safety, and innovation, contributing to patient care worldwide.</p>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <h3>Traditional Supply</h3>
            <p>Karim Industries serves hospitals, healthcare institutions, retail consumers, and international markets globally with our products.</p>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Home;