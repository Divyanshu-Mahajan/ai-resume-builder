import React, { useState } from 'react'
import classes from './ForgotPassword.module.css';
import ForgotPasswordLogo from '../assets/ForgotPassword.png';
import { toggleTheme } from '../redux/theme/themeSlice';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaMoon, FaSun } from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const { token } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const darkMode = useSelector(state => state?.theme?.darkMode);

    const [userEmail, setUserEmail] = useState('');
    const [emailIsValid, setEmailIsValid] = useState(true);
    const [touched, setTouched] = useState(false);


    const themeToggleHandler = () => {
        dispatch(toggleTheme());
    }

    const emailChangeHandler = (event) => {
        const value = event.target.value;
        setUserEmail(value);

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setEmailIsValid(emailRegex.test(value));
    }

    const emailBlurHandler = () => {
        setTouched(true);
    }

    const formSubmitHandler = async (event) => {
        event.preventDefault();
        if (!emailIsValid) return;

        // api logic here
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/users/reset-password`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    email: userEmail
                })
            })

            const data = await response.json();

            if (response.ok) {
                toast.success("Password reset link sent to your email");
                setUserEmail("");
            } else {
                toast.error(data.message || "Something went wrong! Try again later.");
            }
        } catch (error) {
            toast.error(error?.message || "Failed to sent link");
            console.log(error);
        }

    }

    const showError = !emailIsValid && touched;

    return (
        <div className={`${classes.forgotPassword} ${darkMode ? classes.dark : classes.light}`}>
            <div className={classes.leftSection}>
                <img className={classes.logo} src={ForgotPasswordLogo} alt="Forgot Password Illustration" />
            </div>
            <div className={classes.rightSection}>
                <button type="button" className={classes.themeButton} onClick={themeToggleHandler}>
                    {
                        darkMode ? <FaMoon /> : <FaSun />
                    }
                </button>
                <form className={classes.forgotForm} onSubmit={formSubmitHandler}>
                    <h2 className={classes.heading}>Forgot Password ?</h2>
                    <p className={classes.subText}>Don’t worry. Enter your email address and we’ll send you a link to reset your password.</p>

                    <div className={classes.inputSection}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className={`${classes.emailInput} ${showError ? classes.invalidInput : ''}`}
                            id="email"
                            placeholder="Enter registered email"
                            value={userEmail}
                            onChange={emailChangeHandler}
                            onBlur={emailBlurHandler}
                            required
                            aria-label="Email address"
                            aria-describedby="emailHelp"
                        />
                        <small id="emailHelp" className={classes.helperText}>
                            Please enter the email linked with your account.
                        </small>
                    </div>

                    <CSSTransition
                        in={showError}
                        timeout={300}
                        classNames={{
                            enter: classes.errorEnter,
                            enterActive: classes.errorEnterActive,
                            exit: classes.errorExit,
                            exitActive: classes.errorExitActive,
                        }}
                        unmountOnExit
                    >
                        <p role="alert" className={classes.invalidEmail}>
                            Please enter a valid email address
                        </p>
                    </CSSTransition>

                    <button
                        className={classes.button}
                        type='submit'
                        disabled={!emailIsValid || userEmail.trim() === ''}
                        onClick={() => { navigate("/reset-password") }}>
                        Send Link
                    </button>
                    <Link to="/login">
                        <FaArrowLeft /><span>Back to log in</span>
                    </Link>

                    <div className={classes.dontAccount}>
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
