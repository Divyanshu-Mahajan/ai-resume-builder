import React, { useState } from 'react'
import classes from './ResetPassword.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { toggleTheme } from '../redux/theme/themeSlice';
import { toast } from 'react-toastify';


const ResetPassword = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector(state => state?.theme?.darkMode);
    const navigate = useNavigate();

    const { token } = useParams();

    const [userPassword, setUserPassword] = useState('');
    const [userConfirmPassword, setUserConfirmPassword] = useState('');
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    const [passwordIsMatched, setPasswordIsMatched] = useState(true);

    const [passwordTouched, setPasswordTouched] = useState(false);
    const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

    const toggleThemeHandler = () => {
        dispatch(toggleTheme());
    }

    const formSubmitHandler = async (event) => {
        event.preventDefault();

        try{
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/users/reset-password/${token}`,{
                method : "PUT",
                headers : {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify({
                    password : userPassword,
                    confirmPassword : userConfirmPassword
                })
            })

            const data = await response.json();

            if(response.ok){
                toast.success("Password reset successfully");
                setUserPassword("");
                setUserConfirmPassword("");
                navigate("/login");
            } else {
                toast.error(data.message || "Something went wrong during password reset")
            }
        } catch(error){
            console.log(error);
            toast.error("Error occurs");
        }

    }

    const passwordChangeHandler = (event) => {
        const value = event.target.value;
        setUserPassword(value.trim());

        setPasswordIsValid(value.length >= 8);

    }

    const passwordBlurHandler = () => {
        setPasswordTouched(true);
    }

    const confirmPasswordChangeHandler = (event) => {
        const value = event.target.value;
        setUserConfirmPassword(value.trim());

        // Check Confirm Password in matching to the password

        if (value !== userPassword) {
            setPasswordIsMatched(false);
        } else {
            setPasswordIsMatched(true);
        }
    }

    const confirmPasswordBlurHandler = () => {
        setConfirmPasswordTouched(true);
    }

    return (
        <div className={`${classes.resetPassword} ${darkMode ? classes.dark : classes.light}`}>
            <button className={classes.toggleButton} onClick={toggleThemeHandler}>
                {darkMode ? <FaMoon /> : <FaSun />}
            </button>
            <form className={classes.mainContent} onSubmit={formSubmitHandler}>
                <h2 className={classes.heading}>Reset Your Password</h2>
                <p className={classes.subText}>Please enter a new password</p>

                <div className={classes.password}>
                    <label htmlFor='password'>Password</label>
                    <input
                        className={`${classes.input} ${passwordTouched && !passwordIsValid ? classes.invalid : ''}`}
                        type='password'
                        id='password'
                        value={userPassword}
                        onChange={passwordChangeHandler}
                        onBlur={passwordBlurHandler}
                        required
                        aria-label='password change'
                        aria-describedby='passwordHelp'
                    />
                    <small id='passwordHelp'>
                        Must be at least 8 characters
                    </small>
                </div>

                <div className={classes.password}>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input
                        className={`${classes.input} ${passwordTouched && !passwordIsValid ? classes.invalid : ''}`}
                        type='password'
                        id='confirmPassword'
                        value={userConfirmPassword}
                        onChange={confirmPasswordChangeHandler}
                        onBlur={confirmPasswordBlurHandler}
                        required
                        aria-label='confirmPassword change'
                        aria-describedby='confirmPasswordHelp'
                    />
                    <small id='confirmPasswordHelp'>
                        Must match the password above
                    </small>
                </div>

                {
                    !passwordIsMatched && confirmPasswordTouched && (
                        <p className={classes.error}>Password doesn't match</p>
                    )
                }

                <button className={classes.button} type='submit' disabled={!passwordIsMatched || !passwordIsValid}>Confirm</button>
            </form>
        </div>
    )
}

export default ResetPassword
