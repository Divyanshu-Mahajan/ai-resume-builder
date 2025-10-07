import React, { useEffect, useState } from 'react'
import classes from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleTheme = () => setIsDarkMode(prev => !prev);
    const toggleMenu = () => setMenuOpen(prev => !prev);
    return (
        <nav className={classes.nav}>
            <div className={classes.menuIcon} onClick={toggleMenu}>
                {menuOpen ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={`${classes.navLinks} ${menuOpen ? classes.active : ''}`}>
                <li>
                    <NavLink to="/features" className={({ isActive }) => isActive ? `${classes.link} ${classes.active}` : classes.link}>Features</NavLink>
                </li>
                <li>
                    <NavLink to="/how-it-works" className={({ isActive }) => isActive ? `${classes.link} ${classes.active}` : classes.link}>How it works</NavLink>
                </li>
                <li>
                    <NavLink to="/pricing" className={({ isActive }) => isActive ? `${classes.link} ${classes.active}` : classes.link}>Pricing</NavLink>
                </li>
                <li>
                    <NavLink to="/testimonial" className={({ isActive }) => isActive ? `${classes.link} ${classes.active}` : classes.link}>Testimonials</NavLink>
                </li>
            </ul>

            <div className={classes.themeToggle} onClick={toggleTheme}>
                {isDarkMode ? <FaSun /> : <FaMoon />}
            </div>
        </nav>
    )
}

export default Navbar
