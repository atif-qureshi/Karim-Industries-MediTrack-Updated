import React, { useState, useEffect } from 'react';
import './Home.css';
import slide1 from './Images/Mask-group-5.png';
import slide2 from './Images/Mask-group-51.png';
import slide3 from './Images/Mask-group-54.png';
import pressure from './Images/pressure-1-1.png';
import AuthPopup from '../AuthPopup/AuthPop'; 

const Home = () => {
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  useEffect(() => {
    // Show popup when home page loads
    const timer = setTimeout(() => {
      // Check if user is not already logged in
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (!isLoggedIn) {
        setShowAuthPopup(true);
      }
    }, 1000); // Show after 1 second delay

    return () => clearTimeout(timer);
  }, []);

  const handleLoginSuccess = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setShowAuthPopup(false);
  };

  return (
    <div>
      {/* Auth Popup - will appear automatically */}
      {showAuthPopup && (
        <AuthPopup
          onClose={() => setShowAuthPopup(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* Rest of your existing home page content */}
      <div className="slider-container">
        <div className="slider">
          <div className="slide">
            <img src={slide1} alt="Slide 1" />
            <div className="slide-content">
              <h2>Beautiful Nature</h2>
              <p>Explore the wonders of the natural world</p>
            </div>
          </div>
          <div className="slide">
            <img src={slide2} alt="Slide 2" />
            <div className="slide-content">
              <h2>Urban Landscapes</h2>
              <p>Discover amazing cityscapes around the globe</p>
            </div>
          </div>
          <div className="slide">
            <img src={slide3} alt="Slide 3" />
            <div className="slide-content">
              <h2>Modern Technology</h2>
              <p>The latest innovations shaping our future</p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="video-section">
        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/a7UKUoVxAxo?si=HSV8nPYC1KdCve51"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen>
          </iframe>
          <div className="video-caption">Our Services</div>
        </div>

        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/V9lUW-S2kDA?si=Zq9czTgQnrOsIWMW"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen>
          </iframe>
          <div className="video-caption">Company Overview</div>
        </div>
      </div>

      {/* Image + Text Box Section */}
      <div className="image-text-section">
        <div className="image-box">
          <img
            src={slide3}
            alt="High-quality wound dressing products"
          />
        </div>
        <div className="text-content">
          <h2>
            Experience Effective Wound Dressing Solutions with Best Traditional
            Wound Dressing Manufacturer
          </h2>
          <p>
            As a leading wound dressing manufacturer, we provide clinically proven
            solutions for effective wound care management. Our traditional wound
            dressings combine time-tested methods with modern manufacturing
            standards to deliver superior healing results.
          </p>
          <p>
            Our products are designed by medical professionals to promote optimal
            wound healing while preventing infections. We use only the highest
            quality materials that meet international healthcare standards.
          </p>
          <a href="." className="cta-button">Explore Our Products</a>
        </div>
      </div>

      <div className="text-content-2">
        <h2>
          Experience the Wide Range <br />
          of Wound Care Supplies Wholesale
        </h2>
        <p>
          As the top surgical dressing supplier worldwide, we offer a lot of
          top-quality wound care solutions for our patients and caregivers. Our
          applications are part of the products that are used for medical
          treatment worldwide. Our global wound care solutions help professionals
          to improve the life quality of their patients. We work with hundreds of
          nursing facilities and medical suppliers to fulfill our aim of serving
          humanity in the best way. It helps us to honor our pledge of providing
          affordable and inexpensive wound care supplies to everyone, including
          deserving patients. Our extensive range of wound care supplies include;
        </p>
      </div>

      <div className="image-text-section-2">
        <div className="image-box-2">
          <img
            src={slide1}
            alt="High-quality wound dressing products"
          />
        </div>
        <div className="text-content-3">
          <h2>Traditional Wound Dressing</h2>
          <p>
            At Karim Industries, we use patient-centric approaches and innovative
            solutions to develop traditional wound dressings for our patients.
            These dressings protect wounds from contamination. These dressings are
            used for uninfected wounds with mild exudate. Our unique traditional
            wound dressing solutions include absorbent cotton wool products,
            absorbent gauze dressings/ sponges, absorbent lint, tulle dressings
            and bandages.
          </p>
          <a href="." className="cta-button-2">Explore Our Products</a>
        </div>
      </div>

      <div className="image-text-section-3">
        <div className="image-box-3">
          <img
            src={slide3}
            alt="High-quality wound dressing products"
          />
        </div>
        <div className="text-content-4">
          <h2>Condition Specific Dressing</h2>
          <p>
            At Karim Industries, we use patient-centric approaches and innovative
            solutions to develop traditional wound dressings for our patients.
            These dressings protect wounds from contamination. These dressings are
            used for uninfected wounds with mild exudate. Our unique traditional
            wound dressing solutions include absorbent cotton wool products,
            absorbent gauze dressings/ sponges, absorbent lint, tulle dressings
            and bandages.
          </p>
          <a href="." className="cta-button-3">Explore Our Products</a>
        </div>
      </div>

      <div className="image-text-section-4">
        <div className="image-box-4">
          <img
            src={pressure}
            alt="High-quality wound dressing products"
          />
        </div>
        <div className="text-content-4">
          <h2>Advanced Wound Dressing</h2>
          <p>
            At Karim Industries, we use patient-centric approaches and innovative
            solutions to develop traditional wound dressings for our patients.
            These dressings protect wounds from contamination. These dressings are
            used for uninfected wounds with mild exudate. Our unique traditional
            wound dressing solutions include absorbent cotton wool products,
            absorbent gauze dressings/ sponges, absorbent lint, tulle dressings
            and bandages.
          </p>
          <a href="." className="cta-button-4">Explore Our Products</a>
        </div>
      </div>

      {/* Cards */}
      <div className="card-container">
        <div className="card">
          <div className="card-content">
            <h3>Quality Assurance</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, soluta. Voluptas dolorum itaque in officia accusamus id repellat quidem libero sapiente perferendis, tempore aliquid eos maiores! Eum maxime, molestias amet praesentium fugit labore quaerat consectetur ad rerum nemo corrupti, id est ut et eligendi sit cum! Labore ullam praesentium totam!</p>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <h3>Innovative Solutions</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, veritatis ratione corporis quis at cupiditate numquam eos qui aut illo deleniti totam non quia unde libero nihil laudantium accusantium. Natus, inventore quibusdam. Eius eveniet quis, nulla ducimus iste soluta omnis deserunt tenetur, odio ipsum suscipit aspernatur saepe autem, voluptatem incidunt?</p>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <h3>Patient-Centric Approaches</h3>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, eligendi est voluptatibus unde qui cupiditate, sed atque nulla quaerat quibusdam, commodi tempora. Qui dolorem iste eius quam ratione consectetur. Quae optio minus officiis, officia excepturi aut voluptas magnam fuga quos nemo ullam doloribus vero laborum voluptate dolore suscipit aliquid numquam?</p>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <h3>Traditional Supply</h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum incidunt atque corporis, nesciunt corrupti suscipit cupiditate, repellendus rerum dolor libero tempore optio sit nemo non doloribus amet id itaque sint assumenda! Cum fuga nulla nostrum, ad porro maiores optio magnam sapiente saepe. Reiciendis dolore unde incidunt quasi, repellat rerum optio!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;