import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import classes from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footerContent}>
        <div className={classes.section}>
          <h4>AI Resume</h4>
          <p>Empowering professionals to build stunning resumes powered by AI.</p>
        </div>
        <div className={classes.section}>
          <h5>Explore</h5>
          <ul>
            <li><Link to="/features">Features</Link></li>
            <li><Link to="/how-it-works">How It Works</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/testimonial">Testimonials</Link></li>
          </ul>
        </div>
        <div className={classes.section}>
          <h5>Connect</h5>
          <div className={classes.socials}>
            <a
              href="https://github.com/Divyanshu-Mahajan/your-repo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
      <div className={classes.footerBottom}>
        &copy; {new Date().getFullYear()} Ziion Technology. Developed by Divyanshu Mahajan — MERN Stack & AI Enthusiast.


      </div>
    </footer>
  );
};

export default Footer;
