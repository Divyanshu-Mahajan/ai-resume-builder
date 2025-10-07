import React, { useState, useEffect } from 'react';
import classes from './DashboardLayout.module.css';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
    FaMoon, FaSun, FaUserCircle, FaBars,
    FaTachometerAlt, FaHome, FaFileAlt,
    FaChartBar, FaLightbulb
} from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import useWindowWidth from '../hooks/useWindowWidth';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';

const DashboardLayout = () => {
    const width = useWindowWidth();
    const navigate = useNavigate(null);
    const [searchResume, setSearchResume] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    const resumes = useSelector(state => state.resume?.resumes);
    

    const dispatch = useDispatch();
    const isDarkMode = useSelector(state => state.resume.darkMode);



    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleThemeHandler = () => dispatch(toggleTheme());


    const toggleMenuHandler = () => setMenuOpen(prev => !prev);

    const searchResumeHandler = () => {
        // Optional: Add resume search logic
        const UserSearchedResume = resumes.filter((resume) => {
            resume.personalInfo.name === searchResume
        })
    };

    return (
        <div className={classes.dashboard}>
            {/* Header */}
            <header className={classes.header}>
                <h2 className={classes.heading}>AI Resume</h2>
                <nav className={classes.nav}>
                    <div className={classes.inputWrapper}>
                        <input
                            type="text"
                            placeholder="Search Resume..."
                            value={searchResume}
                            onChange={(e) => setSearchResume(e.target.value)}
                        />
                        <span onClick={searchResumeHandler}><CiSearch /></span>
                    </div>
                    <div className={classes.toggleBtn} onClick={toggleThemeHandler}>
                        {/* {theme ? <FaSun size={20} /> : <FaMoon size={20} />} */}
                        {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
                    </div>
                    <div className={classes.avatar}><FaUserCircle /></div>
                    {width <= 768 && (
                        <div className={classes.menuIcon} onClick={toggleMenuHandler}>
                            <FaBars />
                        </div>
                    )}
                </nav>
            </header>

            {/* Main content layout */}
            <div className={classes.contentArea}>
                {(menuOpen || width > 768) && (
                    <aside className={classes.sidebar}>
                        <ul>
                            <li>
                                <NavLink
                                    end
                                    to="/dashboard"
                                    className={({ isActive }) =>
                                        isActive ? `${classes.link} ${classes.active}` : classes.link
                                    }>
                                    <FaTachometerAlt />
                                    <span>Dashboard</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="home"
                                    className={({ isActive }) =>
                                        isActive ? `${classes.link} ${classes.active}` : classes.link
                                    }>

                                    <FaHome />
                                    <span>Home</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="my-resume"
                                    className={({ isActive }) =>
                                        isActive ? `${classes.link} ${classes.active}` : classes.link
                                    }>
                                    <FaFileAlt />
                                    <span>My Resume</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="statistics"
                                    className={({ isActive }) =>
                                        isActive ? `${classes.link} ${classes.active}` : classes.link
                                    }>
                                    <FaChartBar />
                                    <span>Statistics</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="suggestions"
                                    className={({ isActive }) =>
                                        isActive ? `${classes.link} ${classes.active}` : classes.link
                                    }>
                                    <FaLightbulb />
                                    <span>AI Suggestions</span>
                                </NavLink>
                            </li>
                        </ul>
                    </aside>
                )}

                {/* Main screen content */}
                <main className={classes.mainContent}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
