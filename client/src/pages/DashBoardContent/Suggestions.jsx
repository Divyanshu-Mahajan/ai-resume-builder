import React, { useEffect } from 'react'
import classes from './Suggestions.module.css';
import { useDispatch, useSelector } from 'react-redux'
import { getUserSuggestion } from '../../redux/suggest/suggestionSlice';
import Spinner from '../../UI/Spinner';
import Card from '../../UI/Card';

const Suggestions = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector(state => state?.theme?.darkMode);
    const { user, isAuthenticated, token } = useSelector(state => state?.auth);
    const { loading, data, error } = useSelector(state => state?.suggestions);

    //Fallback
    const firstName = user?.firstName;

    //Load the user data
    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getUserSuggestion())
                .unwrap()
                .catch((error) => {
                    console.log(error?.message || "Failed to fetch suggestions");
                })
        }
    }, [dispatch, isAuthenticated])

    //When the data is loading
    if (loading) {
        return <Spinner />;
    }

    //If there are some error occurs
    if (error) {
        return (
            <Card>
                {error}
            </Card>
        )
    }

    // Format AI text into bullet points
    const formattedSuggestions = data
        ? data
            .split(/\n|•|-/) // split on line breaks or bullet symbols
            .map((line) => line.trim())
            .filter((line) => line.length > 0)
        : []

    return (
        <div className={`${classes.suggestions} ${darkMode ? classes.dark : classes.light}`}>
            <header className={classes.header}>
                <h1 className={classes.heading}>
                    AI Suggestions
                </h1>
                <p className={classes.subHeading}>
                    Hi <strong>{firstName}</strong>, here are some personalized resume
                    improvement tips:
                </p>
            </header>

            <Card>
                {formattedSuggestions.length > 0 ? (
                    <ul className={classes.list}>
                        {formattedSuggestions.map((point, idx) => (
                            <li key={idx}>{point}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No suggestions available right now.</p>
                )}
            </Card>
        </div>
    )
}

export default Suggestions
