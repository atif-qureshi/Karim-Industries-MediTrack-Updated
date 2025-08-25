import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MediCott from './images/Medi_cott.png';
import MediBalls from './images/Medi_Balls.png';
import MediZigZag from './images/Medi-Zig-Zag.png';
import OrthoCott from './images/Ortho-Cott.png';
import MediCrape from './images/Medi-Crepe.png';
import MediPlast from './images/Medi-Plast.png';
import MediBand from './images/Medi-Band.png';
import MediTraingular from './images/Medi-Triangular.png';
import SoftGuaze from './images/Soft-Guaz.png';
import MeSoftGuaze from './images/Me-Soft-Guaze.png';
import SoftGuazeRoll from './images/Soft-Guaze-Roll.png';
import MediLintGuaze from './images/Medi-Lint-Guaze.png';
import MediLapSponges from './images/Medi_Lap-Sponges.png';
import MediSufraTulle from './images/Medi-Sofra-Tulle.png';
import SeptiGrassTulle from './images/Septi-Gras_Tulle.png';
import MediParaffin from './images/Medi-Paraffin-Guaze.png';
import FustinTulle from './images/Fusitin-Tulle.png';
import MediEyePad from './images/Medi-Eye-Pad.png';
import PoveeTulle from './images/Povee-Tulle.png';
import SilvaTulle from './images/Silvs-Tulle-Guaze.png';
import SurgiGrip from './images/Surgi-Grip.png';
import AlcoSwab from './images/Alco-Swab.png';
import MedicareDrapeKit from './images/Medicare-Drape-Kit.png';
import MedicareGown from './images/Medicare-Gown.png';
import './ProductDetail.css';
const ProductDetail = () => {
    const { id } = useParams();

    const products = [
        {
            id: 1,
            name: "Medi Cot",
            title: "Absorbent Cotton Wool",
            description: "100% bleached absorbent cotton complying with BP/BPC specifications. Used for absorption of exudates, peripheral cleaning wounds and supporting the application of products on the skin.",
            features: [
                "Chemical inert and free of any optical brightening agent",
                "Sterile before use",
                "Standard weights: 100g, 200g, 400g, 500g, 1000g"
            ],
            sizes: "Available in all weights as per customer demand",
            image: MediCott
        },
        {
            id: 2,
            name: "Medi Balls",
            title: "Cotton Balls",
            description: "Soft, gentle & non-allergic cotton balls for medical & cosmetic use. 100% bleached absorbent cotton complying with BP standards.",
            features: [
                "Used for absorption of exudates and wound cleaning",
                "Chemical inert and free of any optical brightener",
                "Sterile before use",
                "Standard Weight: 1g to 5g"
            ],
            sizes: "Available in all weights as per customer demand",
            image: MediBalls
        },
        {
            id: 3,
            name: "Medi Zig Zag",
            title: "Zig Zag Cotton",
            description: "100% bleached absorbent cotton in zig zag form for better absorption and wound care.",
            features: [
                "Complying with BP/BPC specifications",
                "Chemical inert and free of any optical brightening agent",
                "Sterile before use",
                "Standard weights: 100g, 200g"
            ],
            sizes: "Available in all weights as per customer demand",
            image: MediZigZag
        },
        {
            id: 4,
            name: "Ortho Cot",
            title: "Non Absorbent Cotton",
            description: "Orthopedic padding that provides soft, comfortable cushioning and protection for the patient.",
            features: [
                "100% bleached Non Absorbent Cotton",
                "Used for padding under Plaster of Paris Bandage (POP)",
                "Standard Sizes: 3 inches, 4 inches, 6 inches"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: OrthoCott
        },
        {
            id: 5,
            name: "Medi Crepe",
            title: "Cotton Crepe Bandage",
            description: "Non-adhesive bandage of high-quality cotton yarns for reinforcement of strains, sprains and weak joints.",
            features: [
                "Shapes around contours of the joint offering enhanced support",
                "Lightweight and breathable",
                "100% cotton yarn",
                "Standard Size: Width 7.5cm, 10cm, 15cm x Length 3m & 4.5m"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: MediCrape
        },
        {
            id: 6,
            name: "Medi Plast",
            title: "Plaster of Paris Bandage",
            description: "Made of 100% pure hydrophilic cotton Leno gauze coated with natural POP for fast and durable immobilization.",
            features: [
                "X-Ray permeable",
                "Does not absorb X-Rays",
                "Setting time as per method",
                "Standard Size: Width 7.5cm, 10cm, 15cm x Length 2.7m"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: MediPlast
        },
        {
            id: 7,
            name: "Medi Band",
            title: "Open Wove Bandage",
            description: "Basic bandage with loose weave for ventilation, ideal for securing dressings without pressure.",
            features: [
                "Non-elastic design for wound dressings",
                "Ventilation for burns/non-bleeding wounds",
                "100% cotton",
                "Standard Size: Width: 5cm, 6.5cm, 7.5cm, 10cm, 15cm x Length: 3m, 4m, 5m, & 6m"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: MediBand
        },
        {
            id: 8,
            name: "Medi Triangular",
            title: "Triangular Bandage",
            description: "Made of 100% cotton for versatile medical use including slings and securing dressings.",
            features: [
                "Complete with two Safety pins",
                "Support to arms and shoulders (sling)",
                "To secure splints and dressing",
                "To control bleeding (tourniquet)"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: MediTraingular
        },
        {
            id: 9,
            name: "Soft Gauze",
            title: "Gauze Swab",
            description: "Highly absorbent disposable Gauze pads for wound care and cleaning.",
            features: [
                "Made from 100% cotton Threads",
                "Pre-washed and packed in Sterile/Non Sterile Pouches",
                "Folded edges to minimize lint",
                "Standard Size: 7.5cm x 7.5cm, 10cm x 10cm, 15cm x 15cm"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: SoftGuaze
        },
        {
            id: 10,
            name: "Me Soft Gauze",
            title: "Gauze Swab USP-IV",
            description: "Sterilized gauze swabs complying with United States Pharmacopeia standards.",
            features: [
                "8ply, 12ply & 16ply options",
                "X-Ray detectable thread available",
                "Heat Blister Pack or Hard Blister Pack",
                "Standard Size: 10cm x 10cm, 15cm x 15cm"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: MeSoftGuaze
        },
        {
            id: 11,
            name: "Soft Gauze Roll",
            title: "Surgical Gauze Roll",
            description: "Highly absorbent disposable Surgical Gauze for wound management.",
            features: [
                "Made from 100% cotton Threads",
                "Sterile Before Use",
                "Standard Size: Width: 1m x Length: 2.5m, 5m, 10m, 20m, 30m, 40m, 50m"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: SoftGuazeRoll
        },
        {
            id: 12,
            name: "Medi Lint Gauze",
            title: "Lint Gauze Roll",
            description: "Highly absorbent secondary dressing, suitable for exuding wounds.",
            features: [
                "Soft and conformable, ideal for awkward joints",
                "Helps protect and cushion most wounds",
                "Standard Size: 50g, 500g"
            ],
            sizes: "Available in all weights as per customer demand",
            image: MediLintGuaze
        },
        {
            id: 13,
            name: "Medi Lap Sponges",
            title: "Lap Sponges BP-II",
            description: "Surgical invasive dressing material for intraoperative use with X-Ray detectable thread.",
            features: [
                "Absorption of large amounts of blood and body fluids",
                "X-Ray detectable thread or chip",
                "Standard Size: 30cm × 30cm, 45cm × 45cm (4ply, 6ply, 8ply)"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: MediLapSponges
        },
        {
            id: 14,
            name: "Medi Sofra Tulle",
            title: "Framycetin Sulphate Gauze",
            description: "Antibacterial tulle dressing impregnated with Framycetin Sulphate for infected wounds.",
            features: [
                "Topical Antibiotic Patch",
                "Prevents wound edges from drying",
                "Recommended for infected wounds and chronic wounds",
                "Standard Size: 10cm x 10cm"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: MediSufraTulle
        },
        {
            id: 15,
            name: "Septi Grass Tulle",
            title: "Chlorhexidine Tulle",
            description: "Antiseptic dressing impregnated with Chlorhexidine for wound care.",
            features: [
                "Prevents infection in wounds",
                "Keeps proper moisture in the wound",
                "Recommended for surgical and burn wounds",
                "Standard Size: 10cm x 10cm"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: SeptiGrassTulle
        },
        {
            id: 16,
            name: "Medi Paraffin",
            title: "Paraffin Gauze",
            description: "Gauze dressings impregnated with paraffin ointment for wound moisture management.",
            features: [
                "Prevents wound edges from drying",
                "Recommended for infected wounds",
                "Treats bedsores, ulcers, and burn wounds",
                "Standard Size: 10cm x 10cm"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: MediParaffin
        },
        {
            id: 17,
            name: "Fustin Tulle",
            title: "Sodium Fusidate Gauze",
            description: "Antibacterial dressing impregnated with Sodium Fusidate for infected wounds.",
            features: [
                "Topical Antibiotic Patch",
                "Treats surgical wounds and burn wounds",
                "Standard Size: 10cm x 10cm, 15cm x 20cm, 15cm x 150cm"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: FustinTulle
        },
        {
            id: 18,
            name: "Medi Eye Pad",
            title: "Gauze Eye Pad",
            description: "Specialized dressing for eye protection and wound care.",
            features: [
                "Soft and comfortable for sensitive eye area",
                "Sterile packaging",
                "Standard Size: Eye-specific dimensions"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: MediEyePad
        },
        {
            id: 19,
            name: "Povee-Tulle",
            title: "Povidone-Iodine Gauze",
            description: "Antiseptic dressing with Povidone-Iodine 10% for infected wound management.",
            features: [
                "Topical Antiseptic Tulle Dressing",
                "Prevents wound maceration",
                "Standard Size: 10cm x 10cm, 15cm x 20cm, 15cm x 150cm"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: PoveeTulle
        },
        {
            id: 20,
            name: "Silva Tulle",
            title: "Silver Sulfadiazine Gauze",
            description: "Antibacterial dressing with Silver Sulfadiazine 1% for burn and wound care.",
            features: [
                "Topical Antibacterial Tulle Dressing",
                "Prevents infection in burn wounds",
                "Standard Size: 10cm x 10cm, 15cm x 20cm, 15cm x 150cm"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: SilvaTulle
        },
        {
            id: 21,
            name: "Surgi Grip",
            title: "Surgical Adhesive Paper Tape",
            description: "Medical-grade adhesive tape for securing dressings and devices.",
            features: [
                "Painless removal without irritation",
                "Allows airflow while keeping skin dry",
                "Standard Size: Width: 0.5-5 inch, Length: 3-9 Yard"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: SurgiGrip
        },
        {
            id: 22,
            name: "Alco Swab",
            title: "Alcohol Swab",
            description: "70% Isopropyl Alcohol swabs for disinfection and skin preparation.",
            features: [
                "Individually packaged for hygiene",
                "Dries fast with no residue",
                "Standard Size: 3cmx3cm, 6cmx6cm, 10cm x 10cm"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: AlcoSwab
        },
        {
            id: 23,
            name: "Medicare Drape Kit",
            title: "Surgical Drape Kit Set",
            description: "Complete sterile drape kits for various surgical procedures.",
            features: [
                "Non-woven fabric for durability",
                "Full coverage for sterile conditions",
                "Types: C-Section, Ortho, Universal, Laparoscopic, PCNL, Knee Replacement"
            ],
            sizes: "Available in all configurations as per customer demand",
            image: MedicareDrapeKit
        },
        {
            id: 24,
            name: "Medicare Gown",
            title: "Surgical Gown",
            description: "Protective gowns for medical professionals with fluid-resistant properties.",
            features: [
                "SMS/SMMS non-woven fabric",
                "Breathable yet fluid-resistant",
                "Available in Medium, Large, XL, XXL",
                "Options: Surgical Gown, Reinforced Gown, Isolation Gown"
            ],
            sizes: "Available in all sizes as per customer demand",
            image: MedicareGown
        }
    ];

    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="product-detail-page">
            <div className="products-heading">
                <h1>Products Detail</h1>
                <p>High-quality medical supplies and dressings meeting international standards for healthcare professionals</p>
            </div>
            <div className="product-detail-container">
                <div className="product-image">
                    {/* <img src={`/images/${product.image}`} alt={product.name} /> */}
                    <img src={product.image} alt={product.name} />
                </div>

                <div className="product-info">
                    <h1>{product.name}</h1>
                    <h2>{product.title}</h2>

                    <div className="product-description">
                        <h3>Description:</h3>
                        <p>{product.description}</p>
                    </div>

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