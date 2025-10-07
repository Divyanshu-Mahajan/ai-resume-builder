import React, { useReducer, useState, useEffect } from 'react'
import classes from './Register.module.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import signupImage from '../assets/signup.png';
import { FaSun, FaMoon } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/auth/authSlice';



const emailReducer = (state, action) => {
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

const passwordReducer = (state, action) => {
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
const Register = () => {
    const navigate = useNavigate();
    const dispatchRedux = useDispatch();
    const { loading } = useSelector(state => state?.auth);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: '',
        isValid: null,
        isTouched: false
    })

    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
        value: '',
        isValid: null,
        isTouched: false
    })

    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });


    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleThemeHandler = () => {
        setIsDarkMode(prev => !prev);
    };

    const formsubmitHandler = async (event) => {
        event.preventDefault();
        if (
            firstName.trim() === '' ||
            lastName.trim() === '' ||
            emailState.value.trim() === '' ||
            passwordState.value.trim() === '' ||
            confirmPassword.trim() === ''
        ) {
            alert('Please fill in all fields.');
            return;
        }

        if (!emailState.isValid) {
            alert('Please enter a valid email.');
            return;
        }

        // Check if password is valid
        if (!passwordState.isValid) {
            alert('Password must be at least 8 characters.');
            return;
        }

        // Check if passwords match
        if (passwordState.value !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        try {
            await dispatchRedux(
                registerUser({
                    firstName,
                    lastName,
                    email: emailState.value,
                    password: passwordState.value,
                })
            ).unwrap();

            toast.success("Registration successful! Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000);

            setFirstName("");
            setLastName("");
            dispatchEmail({ type: "RESET" });
            dispatchPassword({ type: "RESET" });
            setConfirmPassword("");
        } catch (err) {
            toast.error(err?.message);
            console.log(err);
        }

    }
    const firstNameChangeHandler = (event) => {
        setFirstName(event.target.value);
    }

    const lastNameChangeHandler = (event) => {
        setLastName(event.target.value);
    }

    const emailChangeHandler = (event) => {
        dispatchEmail({
            type: 'INPUT',
            payload: event.target.value
        })
    }

    const passwordChangeHandler = (event) => {
        dispatchPassword({
            type: 'INPUT',
            payload: event.target.value
        })
    }

    const confirmPasswordChangeHandler = (event) => {
        const value = event.target.value;
        setConfirmPassword(value);

    }
    return (
        <div className={classes.container}>
            <button onClick={toggleThemeHandler} className={classes.themeToggle}>
                {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
            <div className={classes.leftPanel}>
                <h1 className={classes.heroTitle}>Join the Future</h1>
                <img
                    src={signupImage}
                    alt="AI illustration"
                    className={classes.leftImage} />
                <p className={classes.heroSubtitle}>Build smart AI-powered resumes in minutes.</p>
            </div>

            <div className={classes.rightPanel}>
                <form className={classes.form} onSubmit={formsubmitHandler}>
                    <h2 className={classes.title}>Sign Up</h2>

                    <label className={classes.label} htmlFor='firstName'>First Name</label>
                    <input
                        className={classes.input}
                        type='text'
                        id='firstName'
                        value={firstName}
                        onChange={firstNameChangeHandler} />

                    <label className={classes.label} htmlFor='lastName'>Last Name</label>
                    <input
                        className={classes.input}
                        type='text' id='lastName'
                        value={lastName}
                        onChange={lastNameChangeHandler} />

                    <label className={classes.label} htmlFor='email'>Email</label>
                    <input
                        className={classes.input}
                        type='email' id='email'
                        value={emailState.value}
                        onChange={emailChangeHandler}
                        onBlur={() => { dispatchEmail({ type: 'BLUR' }) }} />

                    {!emailState.isValid && emailState.isTouched && (
                        <p className={classes.error}>Please enter a valid email</p>
                    )}


                    <label className={classes.label} htmlFor='password'>Password</label>
                    <input
                        className={classes.input}
                        type='password'
                        id='password'
                        value={passwordState.value}
                        onChange={passwordChangeHandler}
                        onBlur={() => { dispatchPassword({ type: 'BLUR' }) }} />



                    {!passwordState.isValid && emailState.isTouched && (
                        <p className={classes.error}>Password must be at least 8 characters</p>
                    )}

                    <label className={classes.label} htmlFor='confirmPassword'>Confirm Password</label>
                    <input
                        className={classes.input}
                        type='password'
                        id='confirmPassword'
                        value={confirmPassword}
                        onChange={confirmPasswordChangeHandler} />

                    {confirmPassword && confirmPassword !== passwordState.value && (
                        <p className={classes.error}>Passwords do not match</p>
                    )}

                    <button className={classes.button} type='submit'>Sign up</button>


                </form>
            </div>
        </div>
    )
}

export default Register
