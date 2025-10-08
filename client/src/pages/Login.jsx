import React, { useReducer, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import LoginImage from '../assets/Login.png';
import classes from './Login.module.css';
import { FcGoogle } from 'react-icons/fc';
import { FaSun, FaMoon } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/auth/authSlice';

const loginEmailReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT': return {
            ...state,
            value: action.payload,
            isValid: action.payload.includes('@') && action.payload.includes('.')
        }
        case 'BLUR': return {
            ...state,
            isTouched: true
        }
        case 'RESET': return {
            value: "",
            isValid: null,
            isTouched: false
        }

        default: return state
    }
}

const loginPasswordReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT': return {
            ...state,
            value: action.payload,
            isValid: action.payload.length >= 8
        }
        case 'BLUR': return {
            ...state,
            isTouched: true
        }
        case 'RESET': return {
            value: "",
            isValid: null,
            isTouched: false
        }
        default: return state
    }
}
const Login = () => {

    const navigate = useNavigate();
    const dispatchRedux = useDispatch();
    const { loading, isAuthenticated } = useSelector(state => state?.auth);

    const [loginEmailState, dispatchLoginEmail] = useReducer(loginEmailReducer, {
        value: '',
        isValid: null,
        isTouched: false
    })

    const [loginPasswordState, dispatchLoginPassword] = useReducer(loginPasswordReducer, {
        value: '',
        isValid: null,
        isTouched: false
    })

    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleThemeHandler = () => {
        setIsDarkMode(prev => !prev);
    };


    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard', { replace: true });
        }
    }, [isAuthenticated, navigate]);


    const loginFormHandler = async (event) => {
        event.preventDefault();

        if (!loginEmailState.isValid || !loginPasswordState.isValid) {
            toast.error("Please enter valid credentials.");
            return;
        }

        try {
            await dispatchRedux(
                loginUser({
                    email: loginEmailState.value,
                    password: loginPasswordState.value
                })
            ).unwrap();
            toast.success("Logged in successfully");
            console.log(loginEmailState.value, loginPasswordState.value)
            navigate("/dashboard")
            dispatchLoginEmail({ type: "RESET" });
            dispatchLoginPassword({ type: "RESET" });
        } catch (err) {
            toast.error(err?.message);
        }
    }

    const emailChangeHandler = (event) => {
        dispatchLoginEmail({
            type: 'INPUT',
            payload: event.target.value
        })
    }

    const emailBlurHandler = () => {
        dispatchLoginEmail({
            type: 'BLUR'
        })
    }

    const passwordChangeHandler = (event) => {
        dispatchLoginPassword({
            type: 'INPUT',
            payload: event.target.value
        })
    }

    const passwordBlurHandler = () => {
        dispatchLoginPassword({
            type: 'BLUR'
        })
    }

    //Reset the login value
    useEffect(() => {
        dispatchLoginEmail({ type: 'RESET' });
        dispatchLoginPassword({ type: 'RESET' });
    }, []);

    return (
        <div className={classes.heroContent}>
            <button onClick={toggleThemeHandler} className={classes.themeToggle}>
                {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
            <div className={classes.leftContent}>
                <img src={LoginImage} alt='Login Image' height={'400px'} width={'400px'} />
            </div>
            <div className={classes.rightContent}>
                <form className={classes.form} onSubmit={loginFormHandler}>
                    <h2 className={classes.title}>Build Your Future with AI Resume Builder</h2>

                    <label className={classes.label} htmlFor='email'>Email</label>
                    <input
                        className={classes.input}
                        type='email'
                        id='email'
                        value={loginEmailState.value}
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                        autoComplete='off' />

                    {!loginEmailState.isValid && loginEmailState.isTouched && (
                        <p className={classes.error}>Please enter a valid email</p>
                    )}

                    <label className={classes.label} htmlFor='password'>Password</label>
                    <input
                        className={classes.input}
                        type='password'
                        id='password'
                        value={loginPasswordState.value}
                        onChange={passwordChangeHandler}
                        onBlur={passwordBlurHandler}
                        autoComplete='new-password' />

                    {!loginPasswordState.isValid && loginPasswordState.isTouched && (
                        <p className={classes.error}>Password must be at least 8 characters</p>
                    )}

                    <Link to="/forgot-password" className={classes.forgotPassword}>Forgot Password</Link>

                    <div className={classes.remeber}>
                        <input type='checkbox' id='remember' />
                        <label htmlFor='remember'>Remember me</label>
                    </div>

                    <button type='submit'>Log in</button>
                </form>



                <button className={classes.googleButton}>
                    <FcGoogle style={{ fontSize: '1.5rem', marginRight: '0.5rem' }} />
                    Login with Google
                </button>

                <div className={classes.noAccount}>
                    <p>Don't have an account?</p>
                    <Link to="/register" className={classes.signupLink}>sign up</Link>
                </div>

            </div>
        </div>
    )
}

export default Login
