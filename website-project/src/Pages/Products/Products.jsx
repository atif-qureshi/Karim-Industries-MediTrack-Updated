import { Link } from 'react-router-dom';
import './Products.css';
import MediCott from './images/Cotton Wool.jpg'
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


const Products = () => {
    const products = [
        {
            "id": 1,
            "name": "Medi Cot",
            "title": "Absorbent Cotton Wool",
            "description": "100% bleached absorbent cotton complying with BP/BPC specifications. Used for absorption of exudates, peripheral cleaning wounds and supporting the application of products on the skin.",
            "features": [
                "Chemical inert and free of any optical brightening agent",
                "Sterile before use",
                "Standard weights: 100g, 200g, 400g, 500g, 1000g"
            ],
            "sizes": "Available in all weights as per customer demand",
            "image": MediCott,
            "usage": [
                "Cleansing and swabbing wounds",
                "Pre-operative skin preparation",
                "Application of medicaments to wounds",
                "Provides effective padding and protection over dressings",
                "Absorbs fluids, blood, and exudates efficiently",
                "Chemically inert and soft — prevents irritation and protects sensitive skin",
                "Used in surgical procedures for high fluid and blood absorbency",
                "Not recommended directly on open wounds (fibers may break away)"
            ]

        },
        {
            "id": 2,
            "name": "Medi Balls",
            "title": "Cotton Balls",
            "description": "Soft, gentle & non-allergic cotton balls for medical & cosmetic use. 100% bleached absorbent cotton complying with BP standards.",
            "features": [
                "Used for absorption of exudates and wound cleaning",
                "Chemical inert and free of any optical brightener",
                "Sterile before use",
                "Standard Weight: 1g to 5g"
            ],
            "sizes": "Available in all weights as per customer demand",
            "image": MediBalls,
            "usage": [
                "Cleansing and swabbing wounds",
                "Pre-operative skin preparation",
                "Application of medicaments to wounds",
                "Insertion into orifices such as the ear and nose",
                "Application to the throat and eye",
                "Preparation of swabs for taking specimens",
                "Provides high fluid and blood absorbency",
                "Chemically inert and soft — ensures protection and prevents irritation"
            ]

        },
        {
            "id": 3,
            "name": "Medi Zig Zag",
            "title": "Zig Zag Cotton",
            "description": "100% bleached absorbent cotton in zig zag form for better absorption and wound care.",
            "features": [
                "Complying with BP/BPC specifications",
                "Chemical inert and free of any optical brightening agent",
                "Sterile before use",
                "Standard weights: 100g, 200g"
            ],
            "sizes": "Available in all weights as per customer demand",
            "image": MediZigZag,
            "usage": [
                "Cleansing and swabbing wounds",
                "Pre-operative skin preparation",
                "Application of medicaments to wounds",
                "High fluid and blood absorbency capacity",
                "Chemically inert and soft — provides maximum protection without irritation",
                "Free from coloring agents, foreign fibers, and external impurities",
                "Suitable for cleaning and dampening skin and wounds"
            ]

        },
        {
            "id": 4,
            "name": "Ortho Cot",
            "title": "Non Absorbent Cotton",
            "description": "Orthopedic padding that provides soft, comfortable cushioning and protection for the patient.",
            "features": [
                "100% bleached Non Absorbent Cotton",
                "Used for padding under Plaster of Paris Bandage (POP)",
                "Standard Sizes: 3 inches, 4 inches, 6 inches"
            ],
            "sizes": "Available in all sizes as per customer demand",
            "image": OrthoCott,
            "usage": [
                "Padding and protection under Plaster of Paris bandages",
                "Provides cushioning for sensitive areas",
                "Helps prevent pressure sores when used with immobilization devices"
            ]

        },
        {
            "id": 5,
            "name": "Medi Crepe",
            "title": "Cotton Crepe Bandage",
            "description": "Non-adhesive bandage of high-quality cotton yarns for reinforcement of strains, sprains and weak joints.",
            "features": [
                "Shapes around contours of the joint offering enhanced support",
                "Lightweight and breathable",
                "100% cotton yarn",
                "Standard Size: Width 7.5cm, 10cm, 15cm x Length 3m & 4.5m"
            ],
            "sizes": "Available in all sizes as per customer demand",
            "image": CottonCrepe,
            "usage": [
                "Treatment of sprains and strains where light support is required",
                "Supports healing and helps relieve pain in injured areas",
                "Soft and skin-friendly material for comfortable use",
                "Reusable and rewashable — elasticity restored by washing in hot soapy water",
                "Can be used with other surgical appliances for correctional purposes"
            ]

        },
        {
            "id": 6,
            "name": "Medi Plast",
            "title": "Plaster of Paris Bandage",
            "description": "Made of 100% pure hydrophilic cotton Leno gauze coated with natural POP for fast and durable immobilization.",
            "storage": [
                "Must be stored at room temperature with less humidity (Moisture Sensitive)"
            ],
            "features": [
                "X-Ray permeable",
                "Does not absorb X-Rays",
                "Setting time as per method",
                "Standard Size: Width 7.5cm, 10cm, 15cm x Length 2.7m"
            ],
            "sizes": "Available in all sizes as per customer demand",
            "image": Plasterparis,
            "usage": [
                "Immobilization and splinting of fractures",
                "Construction of rest splints and body supports",
                "Used in orthopedic surgery for immobilization, support, and correctional splinting",
                "Management of buckle injuries and minor wrist injuries",
                "Temporary support for most elbow, hand, and foot injuries",
                "Treatment of tibial fractures with significant swelling",
                "Useful in crush injuries and open fractures"
            ],
            "precautions": [
                "Do not insert objects under the plaster",
                "Do not cut or attempt to remove the plaster yourself",
                "Avoid wearing rings on fingers if the injured arm is in plaster"
            ],

        },
        {
            "id": 7,
            "name": "Medi Band",
            "title": "Open Wove Bandage",
            "description": "Basic bandage with loose weave for ventilation, ideal for securing dressings without pressure.",
            "features": [
                "Non-elastic design for wound dressings",
                "Ventilation for burns/non-bleeding wounds",
                "100% cotton",
                "Standard Size: Width: 5cm, 6.5cm, 7.5cm, 10cm, 15cm x Length: 3m, 4m, 5m, & 6m"
            ],
            "sizes": "Available in all sizes as per customer demand",
            "image": MediBand,
            "usage": [
                "Protects and holds dressings in place",
                "Provides support and, when needed, immobilization",
                "Covers wounds and applies pressure to control bleeding",
                "Supports medical devices such as splints",
                "Can be used on its own to provide body support",
                "Ideal for burns and non-bleeding wounds"
            ],
            "precautions": [
                "Not suitable for compound fractures where bone is exposed",
                "Not recommended for broken bones protruding from wounds"
            ]

        },
        {
            "id": 8,
            "name": "Medi Triangular",
            "title": "Triangular Bandage",
            "description": "Made of 100% cotton for versatile medical use including slings and securing dressings.",
            "features": [
                "Complete with two Safety pins",
                "Support to arms and shoulders (sling)",
                "To secure splints and dressing",
                "To control bleeding (tourniquet)"
            ],
            "sizes": "Available in all sizes as per customer demand",
            "image": Triagular,
            "usage": [
                "Used as a sling to support arms and shoulders",
                "Secures splints and dressings",
                "Applies pressure over a large area",
                "Immobilizes ankles and feet",
                "Controls bleeding as a tourniquet",
                "Controls bleeding when direct pressure is unsuitable (e.g., embedded or protruding objects)"
            ],
            "precautions": [
                "If in contact with broken skin, the bandage should be sterilized before use"
            ]

        },
        {
            "id": 9,
            "name": "Soft Gauze",
            "title": "Gauze Swab",
            "description": "Highly absorbent disposable Gauze pads for wound care and cleaning.",
            "features": [
                "Made from 100% cotton Threads",
                "Pre-washed and packed in Sterile/Non Sterile Pouches",
                "Folded edges to minimize lint",
                "Standard Size: 7.5cm x 7.5cm, 10cm x 10cm, 15cm x 15cm"
            ],
            "sizes": "Available in all sizes as per customer demand",
            "image": SoftGuaze,
            "usage": [
                "Packing open wounds and swabbing procedures",
                "Direct wound dressing for injury management",
                "Stops bleeding and absorbs wound drainage",
                "Cushions injured areas and protects against contamination",
                "Secures medicated dressings in place",
                "Holds splints in position and immobilizes injured parts to prevent further injury",
                "Facilitates proper healing by providing stability"
            ],

        },
        {
            "id": 10,
            "name": "Me Soft Gauze",
            "title": "Gauze Swab USP-IV",
            "description": "Sterilized gauze swabs complying with United States Pharmacopeia standards.",
            "features": [
                "8ply, 12ply & 16ply options",
                "X-Ray detectable thread available",
                "Heat Blister Pack or Hard Blister Pack",
                "Standard Size: 10cm x 10cm, 15cm x 15cm"
            ],
            "sizes": "Available in all sizes as per customer demand",
            "image": MeSoftGuaze,
            "usage": [
                "Packing open wounds during surgical operations",
                "Swabbing procedures during surgery",
                "Used as wound dressings"
            ],
        },
        {
            "id": 11,
            "name": "Soft Gauze Roll",
            "title": "Surgical Gauze Roll",
            "description": "Highly absorbent disposable Surgical Gauze for wound management.",
            "features": [
                "Made from 100% cotton Threads",
                "Sterile Before Use",
                "Standard Size: Width: 1m x Length: 2.5m, 5m, 10m, 20m, 30m, 40m, 50m"
            ],
            "sizes": "Available in all sizes as per customer demand",
            "image": GuazeRole,
            "usage": [
                "Stops bleeding and absorbs wound drainage",
                "Cushions injured areas and provides protection against contamination",
                "Secures medicated dressings in place",
                "Holds splints in position",
                "Immobilizes injured body parts to prevent further injury",
                "Facilitates healing by providing stability"
            ],
            "precautions": [
                "Ensure product is sterile before use"
            ]
        },
        {
            "id": 12,
            "name": "Medi Lint Gauze",
            "title": "Lint Gauze Roll",
            "description": "Highly absorbent secondary dressing, suitable for exuding wounds.",
            "features": [
                "Soft and conformable, ideal for awkward joints",
                "Helps protect and cushion most wounds",
                "Standard Size: 50g, 500g"
            ],
            "sizes": "Available in all weights as per customer demand",
            "image": LintGuaze,
            "usage": [
                "External absorbent and protective dressing",
                "Application of ointments and lotions",
                "Widely used in first-aid treatment and home care"
            ],
        },
        {
            "id": 13,
            "name": "Medi Lap Sponges",
            "title": "Lap Sponges BP-II",
            "description": "Surgical invasive dressing material for intraoperative use with X-Ray detectable thread.",
            "features": [
                "Absorption of large amounts of blood and body fluids",
                "X-Ray detectable thread or chip",
                "Standard Size: 30cm × 30cm, 45cm × 45cm (4ply, 6ply, 8ply)"
            ],
            "sizes": "Available in all sizes as per customer demand",
            "image": MediLapSponges,
            "usage": [
                "Absorbs fluid and blood efficiently during surgical procedures",
                "Dampening and cleaning of skin and wounds",
                "Detectable if accidentally left in the body during surgery"
            ],
            "precautions": [
                "Ensure product is sterile before use"
            ]
        },
        {
            "id": 14,
            "name": "Medi Sofra Tulle",
            "title": "Framycetin Sulphate Gauze",
            "description": "Antibacterial tulle dressing impregnated with Framycetin Sulphate for infected wounds.",
            "features": [
                "Topical Antibiotic Patch",
                "Prevents wound edges from drying",
                "Recommended for infected wounds and chronic wounds",
                "Standard Size: 10cm x 10cm"
            ],
            "sizes": "Available in all sizes as per customer demand",
            "image": SufraTulle,
            "usage": [
                "Clean the wound using standard techniques",
                "Select the appropriate size of dressing and peel open the pouch",
                "Using sterile gloves and forceps, remove the protector paper",
                "Gently apply a single layer of impregnated gauze to the wound",
                "Apply a secondary absorbent dressing if required and secure the area",
                "If the dressing sticks, soak it gently with normal saline (0.9%) before removal"
            ],
            "precautions": [
                "Do not use in the eye, auditory canal (especially with perforated eardrum), or near meninges, brain, or spinal cord",
                "Not for intravenous or oral administration, and not for use in body cavities",
                "Discontinue immediately if signs of hypersensitivity reaction appear and contact a physician"
            ]

        },
        {
            "id": 15,
            "name": "Septi Grass Tulle",
            "title": "Chlorhexidine Tulle",
            "description": "Antiseptic dressing impregnated with Chlorhexidine for wound care.",
            "features": [
                "Prevents infection in wounds",
                "Keeps proper moisture in the wound",
                "Recommended for surgical and burn wounds",
                "Standard Size: 10cm x 10cm"
            ],
            "sizes": "Available in all sizes as per customer demand",
            "image": SeptiGrassTulle,
            "usage": [
                "Prevents infection with antiseptic protection",
                "Maintains optimal wound moisture balance",
                "Recommended for surgical and burn wounds",
                "Apply directly to the cleaned wound surface",
                "Secure with an appropriate secondary dressing"
            ]

        },
        {
            "id": 16,
            "name": "Medi Paraffin",
            "title": "Paraffin Gauze",
            "description": "Gauze dressings impregnated with paraffin ointment for wound moisture management.",
            "features": [
                "Prevents wound edges from drying",
                "Recommended for infected wounds",
                "Treats bedsores, ulcers, and burn wounds",
                "Standard Size: 10cm x 10cm"
            ],
            "sizes": "Available in all sizes as per customer demand",
            "image": MediParaffine,
            "usage": [
                "Serves as a primary wound contact layer for burns, ulcers, skin grafts (donor and receptor sites), and traumatic injuries",
                "Paraffin content reduces adherence to granulating wound surfaces",
                "Apply directly to the wound surface and cover with an absorbent pad secured with tape or bandage",
                "Not recommended for heavily exuding wounds due to risk of tissue maceration",
                "Dressing change frequency depends on the wound’s condition",
                "Sterilized by irradiation; store in a cool place"
            ]

        },
        {
            "id": 17,
            "name": "Fustin Tulle",
            "title": "Sodium Fusidate Gauze",
            "description": "Antibacterial dressing impregnated with Sodium Fusidate for infected wounds.",
            "features": [
                "Topical Antibiotic Patch",
                "Treats surgical wounds and burn wounds",
                "Standard Size: 10cm x 10cm, 15cm x 20cm, 15cm x 150cm"
            ],
            "sizes": "Available in all sizes as per customer demand",
            "image": FustinTulle,
            "usage": [
                "Antibacterial dressing impregnated with Sodium Fusidate ointment",
                "Indicated for infected wounds, surgical wounds, and burn wounds",
                "Applied as a primary wound contact layer to prevent infection and promote healing",
                "Supplied sterile in single-piece packaging"
            ]

        },
        {
            "id": 18,
            "name": "Medi Eye Pad",
            "title": "Gauze Eye Pad",
            "description": "Specialized dressing for eye protection and wound care.",
            "features": [
                "Soft and comfortable for sensitive eye area",
                "Sterile packaging",
                "Standard Size: Eye-specific dimensions"
            ],
            "sizes": "Available in all sizes as per customer demand",
            "image": EyePad,
            "usage": [
                "Specialized dressing for eye protection and wound care",
                "Used to protect the eye after surgery or injury",
                "Helps in applying medication to the eye area",
                "Shields the eye from light and foreign particles",
                "Soft and comfortable for the sensitive eye area"
            ]

        },
        {
            "id": 19,
            "name": "Povee-Tulle",
            "title": "Povidone-Iodine Gauze",
            "description": "Antiseptic dressing with Povidone-Iodine 10% for infected wound management.",
            "features": [
                "Topical Antiseptic Tulle Dressing",
                "Prevents wound maceration",
                "Standard Size: 10cm x 10cm, 15cm x 20cm, 15cm x 150cm"
            ],
            "sizes": "Available in all sizes as per customer demand",
            "image": PoveeTulle,
            "usage": [
                "Antiseptic dressing with Povidone-Iodine 10% for infected wound management",
                "Prevents infection in wounds and helps manage existing infections",
                "Prevents wound maceration while maintaining appropriate moisture balance",
                "Indicated for surgical wounds, traumatic wounds, and infected wounds"
            ]

        },
        {
            "id": 20,
            "name": "Silva Tulle",
            "title": "Silver Sulfadiazine Gauze",
            "description": "Antibacterial dressing with Silver Sulfadiazine 1% for burn and wound care.",
            "features": [
                "Topical Antibacterial Tulle Dressing",
                "Prevents infection in burn wounds",
                "Standard Size: 10cm x 10cm, 15cm x 20cm, 15cm x 150cm"
            ],
            "sizes": "Available in all sizes as per customer demand",
            "image": SilvaTulle,
            "usage": [
                "Antibacterial dressing with Silver Sulfadiazine 1% for burn and wound care",
                "Prevents infection in burn wounds and promotes healing",
                "Used as a primary wound contact layer for burns, ulcers, and other wounds requiring antimicrobial protection",
                "Provides broad-spectrum antibacterial activity through Silver Sulfadiazine"
            ]

        },
        {
            "id": 21,
            "name": "Surgi Grip",
            "title": "Surgical Adhesive Paper Tape",
            "description": "Medical-grade adhesive tape for securing dressings and devices.",
            "features": [
                "Painless removal without irritation",
                "Allows airflow while keeping skin dry",
                "Standard Size: Width: 0.5-5 inch, Length: 3-9 Yard"
            ],
            "sizes": "Available in all sizes as per customer demand",
            "image": Surgigrip,
            "usage": [
                "Used for securing dressings, bandages, and medical devices to the skin",
                "Provides secure adhesion while allowing airflow to keep skin dry",
                "Painless removal minimizes skin irritation and damage",
                "Suitable for long-term use and sensitive skin"
            ]

        },
        {
            "id": 22,
            "name": "Alco Swab",
            "title": "Alcohol Swab",
            "description": "70% Isopropyl Alcohol swabs for disinfection and skin preparation.",
            "features": [
                "Individually packaged for hygiene",
                "Dries fast with no residue",
                "Standard Size: 3cmx3cm, 6cmx6cm, 10cm x 10cm"
            ],
            "sizes": "Available in all sizes as per customer demand",
            "image": AlcoSwab,
            "usage": [
                "Used for disinfection of skin before injections, blood sampling, and other medical procedures",
                "For cleaning small wounds and abrasions",
                "For preparation of skin before surgical procedures",
                "Individually packaged for single-use hygiene",
                "70% Isopropyl Alcohol provides effective antimicrobial activity"
            ]

        },
        {
            "id": 23,
            "name": "Medicare Drape Kit",
            "title": "Surgical Drape Kit Set",
            "description": "Complete sterile drape kits for various surgical procedures.",
            "features": [
                "Non-woven fabric for durability",
                "Full coverage for sterile conditions",
                "Types: C-Section, Ortho, Universal, Laparoscopic, PCNL, Knee Replacement"
            ],
            "sizes": "Available in all configurations as per customer demand",
            "image": Drape,
            "usage": [
                "Used to create and maintain a sterile field during surgical procedures",
                "Provides barrier protection against microbial migration and fluid penetration",
                "Different configurations available for specific surgical specialties including C-Section, Orthopedic, Universal, Laparoscopic, PCNL, and Knee Replacement surgeries",
                "Non-woven fabric provides durability and effective barrier properties"
            ]

        },
        {
            "id": 24,
            "name": "Medicare Gown",
            "title": "Surgical Gown",
            "description": "Protective gowns for medical professionals with fluid-resistant properties.",
            "features": [
                "SMS/SMMS non-woven fabric",
                "Breathable yet fluid-resistant",
                "Available in Medium, Large, XL, XXL",
                "Options: Surgical Gown, Reinforced Gown, Isolation Gown"
            ],
            "sizes": "Available in all sizes as per customer demand",
            "image": Gown,
            "usage": [
                "Used by medical professionals during surgical procedures and patient care activities",
                "Provides protection against fluid penetration and microbial contamination",
                "SMS/SMMS non-woven fabric offers breathability while maintaining fluid resistance",
                "Available in different types including standard Surgical Gowns, Reinforced Gowns for high-fluid procedures, and Isolation Gowns for infection control",
                "Various sizes ensure proper fit and protection for all healthcare workers"
            ]

        }
    ];

    return (
        <div className="products-container">
            {/* Heading Section */}
            <div className="products-heading">
                <h1>Our Medical Products</h1>
                <p>High-quality medical supplies and dressings meeting international standards for healthcare professionals</p>
            </div>

            {/* Existing Product Grid */}
            <div className="product-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        {/* <img src={`/images/${product.image}`} alt={product.name} /> */}
                        <img src={product.image} alt={product.name} />
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