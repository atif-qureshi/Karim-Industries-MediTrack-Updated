import React from 'react'
import './ProductCustomization.css';
import './ProductCustomization.js';
const ProductCustomization = () => {
    return (
        <div>
            <main className="main_container">
                <div className="customization-container">
                    {/* <!-- Hero Section --> */}
                    <section className="customization-hero">
                        <h1>Customize Your Medical Products</h1>
                        <p>
                            Tailor our surgical dressing products to your exact specifications
                            with our flexible customization options
                        </p>
                    </section>

                    {/* <!-- Product Selection --> */}
                    <section className="product-selection">
                        <h2>Select Your Product</h2>
                        <div className="product-grid">
                            {/* <!-- Cotton Products --> */}
                            <div className="product-card" data-category="cotton">
                                <div
                                    className="product-image"
                                    style={{
                                        backgroundImage: "url('https://images.unsplash.com/photo-1583947581924-a6d4a7e6aa30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"
                                    }}
                                ></div>

                                <h3>Cotton Products</h3>
                                <ul>
                                    <li>Absorbent Cotton Wool (Medi Cot)</li>
                                    <li>Cotton Balls (Medi Balls)</li>
                                    <li>Zig Zag Cotton (Medi Zig Zag)</li>
                                    <li>Non Absorbent Cotton (Ortho Cot)</li>
                                </ul>
                                <button className="select-btn">Select</button>
                            </div>

                            {/* <!-- Bandages --> */}
                            <div className="product-card" data-category="bandages">
                                <div
                                    className="product-image"
                                    style={{
                                        backgroundImage: "url('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"
                                    }}
                                ></div>

                                <h3>Bandages</h3>
                                <ul>
                                    <li>Cotton Crepe Bandage (Medi Crepe)</li>
                                    <li>Plaster of Paris Bandage (Medi Plast)</li>
                                    <li>Bandage Open Wove (Medi Band)</li>
                                    <li>Triangular Bandage (Medi Triangular)</li>
                                </ul>
                                <button className="select-btn">Select</button>
                            </div>

                            {/* <!-- Gauze Products --> */}
                            <div className="product-card" data-category="gauze">
                                <div
                                    className="product-image"
                                    style={{
                                        backgroundImage: "url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"
                                    }}
                                ></div>

                                <h3>Gauze Products</h3>
                                <ul>
                                    <li>Gauze Swab (Soft Gauze)</li>
                                    <li>Gauze Swab USP-IV (Me Soft Gauze)</li>
                                    <li>Surgical Gauze Roll (Soft Gauze)</li>
                                    <li>Lint Gauze (Medi Lint Gauze)</li>
                                </ul>
                                <button className="select-btn">Select</button>
                            </div>
                        </div>
                    </section>

                    {/* <!-- CUSTOMER/COMPANY INFO SECTION --> */}
                    <section className="customer-info">
                        <h2>Your Information</h2>
                        <div className="info-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label for="company-name">Company/Hospital Name</label>
                                    <input
                                        type="text"
                                        id="company-name"
                                        placeholder="e.g. Al-Shifa Hospital"
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="contact-person">Contact Person</label>
                                    <input
                                        type="text"
                                        id="contact-person"
                                        placeholder="e.g. Dr. Ahmed Khan"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label for="email">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="contact@hospital.com"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="phone">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        placeholder="+92 300 1234567"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label for="address">Delivery Address</label>
                                <textarea
                                    id="address"
                                    rows="3"
                                    placeholder="Full address with city/postal code"
                                ></textarea>
                            </div>
                        </div>
                    </section>
                    {/* <!-- Customization Form --> */}
                    <section className="customization-form">
                        <h2>Customization Options</h2>
                        <form id="product-customization">
                            <div className="form-group">
                                <label for="product-type">Product Type</label>
                                <select id="product-type" required>
                                    <option value="">Select a product</option>
                                    <option value="medi-cot">
                                        Absorbent Cotton Wool (Medi Cot)
                                    </option>
                                    <option value="medi-balls">Cotton Balls (Medi Balls)</option>
                                    <option value="medi-zig-zag">
                                        Zig Zag Cotton (Medi Zig Zag)
                                    </option>
                                    <option value="ortho-cot">
                                        Non Absorbent Cotton (Ortho Cot)
                                    </option>
                                    <option value="medi-crepe">
                                        Cotton Crepe Bandage (Medi Crepe)
                                    </option>
                                    <option value="medi-plast">
                                        Plaster of Paris Bandage (Medi Plast)
                                    </option>
                                    <option value="medi-band">Bandage Open Wove (Medi Band)</option>
                                    <option value="medi-triangular">
                                        Triangular Bandage (Medi Triangular)
                                    </option>
                                    <option value="soft-gauze">Gauze Swab (Soft Gauze)</option>
                                    <option value="me-soft-gauze">
                                        Gauze Swab USP-IV (Me Soft Gauze)
                                    </option>
                                    <option value="surgical-gauze">
                                        Surgical Gauze Roll (Soft Gauze)
                                    </option>
                                    <option value="medi-lint">Lint Gauze (Medi Lint Gauze)</option>
                                </select>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label for="size">Size/Dimensions</label>
                                    <select id="size" required>
                                        <option value="">Select size</option>
                                        {/* <!-- Options will be populated by JavaScript based on product selection --> */}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label for="weight">Weight (if applicable)</label>
                                    <select id="weight">
                                        <option value="">Select weight</option>
                                        {/* <!-- Options will be populated by JavaScript based on product selection --> */}
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label for="sterility">Sterility</label>
                                    <select id="sterility" required>
                                        <option value="">Select option</option>
                                        <option value="sterile">Sterile</option>
                                        <option value="non-sterile">Non-Sterile</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label for="packaging">Packaging Type</label>
                                    <select id="packaging" required>
                                        <option value="">Select packaging</option>
                                        <option value="individual">Individual Units</option>
                                        <option value="bulk">Bulk Packaging</option>
                                        <option value="blister">Blister Pack</option>
                                        <option value="pouch">Plastic Pouch</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label for="quantity">Quantity</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    min="100"
                                    value="100"
                                    required
                                />
                                <span className="note">Minimum order: 100 units</span>
                            </div>

                            <div className="form-group">
                                <label for="special-requirements">Special Requirements</label>
                                <textarea
                                    id="special-requirements"
                                    rows="4"
                                    placeholder="Any additional customization requirements..."
                                ></textarea>
                            </div>

                            <div className="form-actions">
                                <button type="reset" className="btn secondary">Reset</button>
                                <button type="submit" className="btn primary">
                                    Request Custom Quote
                                </button>
                            </div>
                        </form>
                    </section>

                    {/* <!-- Customization Examples --> */}
                    <section className="customization-examples">
                        <h2>Popular Customizations</h2>
                        <div className="examples-grid">
                            <div className="example-card">
                                <div
                                    className="example-image"
                                    style={{
                                        backgroundImage: "url('https://images.unsplash.com/photo-1581093057305-3cb3914b6ab1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"
                                    }}
                                ></div>

                                <h3>Custom-Sized Gauze</h3>
                                <p>
                                    Gauze swabs tailored to your required dimensions (from 7.5cm to
                                    45cm) with optional X-Ray detectable thread.
                                </p>
                            </div>

                            <div className="example-card">
                                <div
                                    className="example-image"
                                    style={{
                                        backgroundImage: "url('https://images.unsplash.com/photo-1581093057923-a05d8a4b88c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"
                                    }}
                                ></div>

                                <h3>Private Label Bandages</h3>
                                <p>
                                    Crepe bandages with your branding, in custom widths (7.5cm to
                                    15cm) and lengths (3m to 4.5m).
                                </p>
                            </div>

                            <div className="example-card">
                                <div
                                    className="example-image"
                                    style={{
                                        backgroundImage: "url('https://images.unsplash.com/photo-1581093057305-3cb3914b6ab1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"
                                    }}
                                ></div>

                                <h3>Specialized Tulle Dressings</h3>
                                <p>
                                    Antibacterial tulle dressings (Fusidic Acid, Silver
                                    Sulfadiazine) in custom patch or roll formats.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* <!-- Quality Assurance --> */}
                    <section className="quality-assurance">
                        <h2>Quality You Can Trust</h2>
                        <div className="quality-grid">
                            <div className="quality-item">
                                <div className="quality-icon">🏭</div>
                                <h3>BP/BPC Compliant</h3>
                                <p>
                                    All products meet British Pharmacopoeia standards for quality
                                    and safety.
                                </p>
                            </div>
                            <div className="quality-item">
                                <div className="quality-icon">🧪</div>
                                <h3>Sterility Assurance</h3>
                                <p>
                                    Validated sterilization processes for sterile product variants.
                                </p>
                            </div>
                            <div className="quality-item">
                                <div className="quality-icon">📦</div>
                                <h3>Custom Packaging</h3>
                                <p>
                                    Flexible packaging options to meet your specific requirements.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* <!-- CTA Section --> */}
                    <section className="customization-cta">
                        <h2>Ready to Create Your Custom Product?</h2>
                        <p>
                            Our team is ready to help you develop the perfect surgical dressing
                            solution for your needs.
                        </p>
                        <div className="cta-buttons">
                            <a href="tel:+923004090248" className="cta-btn phone"
                            >Call Us: +92-300-4090248</a
                            >
                            <a href="mailto:info@karimindustries.com.pk" className="cta-btn email"
                            >Email Us</a
                            >
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default ProductCustomization;
