import React from 'react';
import styles from './NotFound.module.css';
import NotFoundImage from '../assets/NotFound.svg'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NotFound = () => {
    const darkMode = useSelector((state) => state.theme.darkMode);
    const { isAuthenticated } = useSelector(state => state.auth);

    return (
        <div className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}>
            <div className={styles.imageContainer}>
                <img
                    src={NotFoundImage}
                    alt="404 Illustration"
                    className={styles.image}
                />
            </div>
            <h1 className={styles.code}>404</h1>
            <p className={styles.message}>Oops! The page you're looking for doesn't exist.</p>
            {
                isAuthenticated && (
                  <Link to="/dashboard" className={styles.homeBtn}>Go back home</Link>
                )
            }
            {
                !isAuthenticated && (
                    <Link to="/" className={styles.homeBtn}>Go back home</Link>
                )
            }
        </div>
    );
};

export default NotFound;
