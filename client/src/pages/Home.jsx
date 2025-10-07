import React, { useState } from 'react';
import classes from './Home.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HeroImage from '../assets/HeroImage.png';
import { FaMagic, FaFileAlt, FaLock, FaChartLine } from 'react-icons/fa';
import Footer from '../components/Footer';

const Home = () => {
    const navigate = useNavigate(null);

    return (
        <div className={classes.home}>
            <header className={classes.header}>
                <div className={classes.navWrapper}>
                    <Navbar />
                    <button onClick={() => navigate('/login')}>Log in</button>
                </div>
            </header>

            <main className={classes.mainContent}>
                <div className={classes.heroContent}>
                    <div className={classes.leftContent}>
                        <h3>Build Your Dream Resume in Seconds with AI</h3>
                        <p>Professional, customizable, and recruiter-approved resumes using our intelligent builder</p>
                        <Link to="/sign-up">Get Started</Link>
                    </div>
                    <div className={classes.rightContent}>
                        <img src={HeroImage} alt="Resume Logo" />
                    </div>
                </div>

                <div className={classes.cardContent}>
                    <div className={classes.card}>
                        <FaMagic className={classes.icon} />
                        <h4>Fast & Smart</h4>
                        <p>AI suggests bullet points based on your experience</p>
                    </div>
                    <div className={classes.card}>
                        <FaFileAlt className={classes.icon} />
                        <h4>Templates</h4>
                        <p>Modern, minimalistic, and creative styles</p>
                    </div>
                    <div className={classes.card}>
                        <FaLock className={classes.icon} />
                        <h4>Private & Secure</h4>
                        <p>Your data stays with you</p>
                    </div>
                    <div className={classes.card}>
                        <FaChartLine className={classes.icon} />
                        <h4>Job Insights</h4>
                        <p>Tailored suggestions based on job roles</p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Home;
