// Home.js
import React from 'react';
import '../Css/home.css';
import shop from '../components/images/shop.jpg';
import gadget1 from '../components/images/gadget1.jpg';
import gadget2 from '../components/images/gadget3.jpg';
import gadget3 from '../components/images/gadget4.jpg';
import gadget4 from '../components/images/gadget5.jpg';
import lipstick from '../components/images/lipstick.jpg';
const Home = () => {
    return (
        <div className="home">
            <header className="home-header">
                <h1>Welcome to the <span>Math</span> Market</h1>
                <p>Explore listings at your place</p>
                <div className="image-banner">
                    {/* Placeholder for banner image */}
                    <img src={shop} alt="Shopping cart with a tablet" />
                </div>
                <p>Buy & Sell with Us:</p>
            </header>
            <section className="product-list">
                <h2>Technology</h2>
                <div className="category-section">
                    {/* Add images or items dynamically */}
                    <img src={gadget1} alt="Tech item 1" />
                    <img src={gadget3} alt="Tech item 2" />
                    <img src={gadget4} alt="Tech item 2" />
                </div>
                <h2>Beauty</h2>
                <div className="category-section">
                    <img src={gadget2} alt="Beauty item 1" />
                    <img src={lipstick} alt="Beauty item 2" />
                </div>
            </section>
        </div>
    );
};

export default Home;
