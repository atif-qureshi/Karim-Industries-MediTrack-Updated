import React from 'react'
import './CustomManuf.css';
const CustomManuf = () => {
    return (
        <div>
            <main className="main">
                {/* <!-- Main Mestion STart --> */}

                <div className="manufacturing-container">
                    {/* <!-- Hero Section --> */}
                    <section className="manufacturing-hero">
                        <h1>Manufacturing Excellence in Surgical Dressings</h1>
                        <p>
                            Karim Industries combines cutting-edge technology with
                            uncompromising quality standards to produce premium surgical
                            dressing products for healthcare professionals worldwide.
                        </p>
                    </section>

                    {/* <!-- Manufacturing Features --> */}
                    <section className="manufacturing-features">
                        <div className="feature-card">
                            <div className="feature-icon">🏭</div>
                            <h3>State-of-the-Art Facility</h3>
                            <p>
                                Our ½ Km Raiwind Road manufacturing plant is equipped with modern
                                machinery and clean rooms to ensure sterile production
                                environments.
                            </p>
                            <p>
                                Continuous investment in technology allows us to maintain the
                                highest production standards.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">🧪</div>
                            <h3>Quality Control</h3>
                            <p>
                                Every batch undergoes rigorous testing to comply with BP, BPC, and
                                USP specifications.
                            </p>
                            <p>
                                Our in-house quality assurance team ensures consistency and
                                reliability in every product.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">🔄</div>
                            <h3>Custom Manufacturing</h3>
                            <p>
                                We offer flexible production capabilities to meet specific
                                customer requirements.
                            </p>
                            <p>
                                Available in all sizes and weights as per customer demand, with
                                options for sterile and non-sterile packaging.
                            </p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🧪</div>
                            <h3>Quality Control</h3>
                            <p>
                                Every batch undergoes rigorous testing to comply with BP, BPC, and
                                USP specifications.
                            </p>
                            <p>
                                Our in-house quality assurance team ensures consistency and
                                reliability in every product.
                            </p>
                        </div>
                    </section>

                    {/* <!-- Product Categories --> */}
                    <section className="product-categories">
                        <h2>Our Product Categories</h2>
                        <div className="category-grid">
                            {/* <!-- Cotton Products --> */}
                            <div className="category-card">
                                <div
                                    className="category-img"
                                    style={{
                                        backgroundImage: "url('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"
                                    }}
                                ></div>

                                <div className="category-content">
                                    <h3>Cotton Products</h3>
                                    <ul>
                                        <li>Absorbent Cotton Wool (Medi Cot)</li>
                                        <li>Cotton Balls (Medi Balls)</li>
                                        <li>Zig Zag Cotton (Medi Zig Zag)</li>
                                        <li>Non Absorbent Cotton (Ortho Cot)</li>
                                    </ul>
                                </div>
                            </div>

                            {/* <!-- Bandages --> */}
                            <div className="category-card">
                                <div
                                    className="category-img"
                                    style={{
                                        backgroundImage: "url('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"
                                    }}
                                ></div>

                                <div className="category-content">
                                    <h3>Bandages</h3>
                                    <ul>
                                        <li>Cotton Crepe Bandage (Medi Crepe)</li>
                                        <li>Plaster of Paris Bandage (Medi Plast)</li>
                                        <li>Bandage Open Wove (Medi Band)</li>
                                        <li>Triangular Bandage (Medi Triangular)</li>
                                    </ul>
                                </div>
                            </div>

                            {/* <!-- Gauze Products --> */}
                            <div className="category-card">
                                <div
                                    className="category-img"
                                    style={{
                                        backgroundImage: "url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"
                                    }}
                                ></div>

                                <div className="category-content">
                                    <h3>Gauze Products</h3>
                                    <ul>
                                        <li>Gauze Swab (Soft Gauze)</li>
                                        <li>Gauze Swab USP-IV (Me Soft Gauze)</li>
                                        <li>Surgical Gauze Roll (Soft Gauze)</li>
                                        <li>Lint Gauze (Medi Lint Gauze)</li>
                                    </ul>
                                </div>
                            </div>

                            {/* <!-- Specialized Dressings --> */}
                            <div className="category-card">
                                <div
                                    className="category-img"
                                    style={{
                                        backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"
                                    }}
                                ></div>

                                <div className="category-content">
                                    <h3>Specialized Dressings</h3>
                                    <ul>
                                        <li>Framycetin Sulphate (Medi Sofra Tulle)</li>
                                        <li>Chlorhexidine Tulle (Septi Grass Tulle)</li>
                                        <li>Paraffin Gauze (Medi Paraffin)</li>
                                        <li>Fusidic Acid (Fustin Tulle)</li>
                                    </ul>
                                </div>
                            </div>

                            {/* <!-- Surgical Products --> */}
                            <div className="category-card">
                                <div
                                    className="category-img"
                                    style={{
                                        backgroundImage: "url('https://images.unsplash.com/photo-1581595219315-a187dd40c322?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"
                                    }}
                                ></div>

                                <div className="category-content">
                                    <h3>Surgical Products</h3>
                                    <ul>
                                        <li>Lap Sponges (Medi Lap Sponges)</li>
                                        <li>Surgical Drape Kit Set (Medicare)</li>
                                        <li>Surgical Gowns (Medicare)</li>
                                        <li>Surgical Adhesive Paper Tape (Surgi Grip)</li>
                                    </ul>
                                </div>
                            </div>

                            {/* <!-- Antiseptic Products --> */}
                            <div className="category-card">
                                <div
                                    className="category-img"
                                    style={{
                                        backgroundImage: "url('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"
                                    }}
                                ></div>

                                <div className="category-content">
                                    <h3>Antiseptic Products</h3>
                                    <ul>
                                        <li>Povidone-Iodine Povee-Tulle</li>
                                        <li>Silver Sulfadiazine (Silva Tulle)</li>
                                        <li>Alcohol Swab (Alco Swab)</li>
                                        <li>Gauze Eye Pad (Medi Eye Pad)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* <!-- Quality Assurance --> */}
                    <section className="quality-section">
                        <h2>Quality Assurance & Standards</h2>
                        <p>
                            Karim Industries is committed to manufacturing products that meet
                            the highest international standards for medical devices and surgical
                            dressings.
                        </p>

                        <div className="standards-grid">
                            <div className="standard-item">
                                <h3>BP Compliance</h3>
                                <p>
                                    British Pharmacopoeia standards for all cotton and bandage
                                    products
                                </p>
                            </div>
                            <div className="standard-item">
                                <h3>BPC Compliance</h3>
                                <p>
                                    British Pharmaceutical Codex specifications for specialized
                                    dressings
                                </p>
                            </div>
                            <div className="standard-item">
                                <h3>USP-IV</h3>
                                <p>United States Pharmacopeia standards for select products</p>
                            </div>
                            <div className="standard-item">
                                <h3>Sterility Assurance</h3>
                                <p>Validated sterilization processes for sterile products</p>
                            </div>
                        </div>
                    </section>

                    {/* <!-- CTA Section -->s */}
                    <section className="cta-section">
                        <h2>Ready to Partner with Us?</h2>
                        <p>
                            Whether you need standard products or custom manufacturing
                            solutions, Karim Industries has the expertise and capacity to meet
                            your requirements for surgical dressing products.
                        </p>
                        <a href="mailto:info@karimindustries.com.pk" className="cta-button"
                        >Contact Our Manufacturing Team</a
                        >
                    </section>
                </div>
            </main>
        </div>
    )
}

export default CustomManuf
