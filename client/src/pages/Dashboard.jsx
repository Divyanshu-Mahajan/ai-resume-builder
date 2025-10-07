import React, { useEffect, useState } from 'react';
import classes from './Dashboard.module.css';
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllResume } from '../redux/slice/resumeSlice';
import Spinner from '../UI/Spinner';
import Card from "../UI/Card";

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const darkMode = useSelector(state => state?.theme?.darkMode);
    const { resumes, loading, error } = useSelector(state => state?.resume);
    const { user, isAuthenticated } = useSelector(state => state?.auth);

    //Fallback
    const firstName = user?.firstName || "";
    const lastName = user?.lastName || "";

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchAllResume())
                .unwrap()
                .catch((error) => {
                    console.log(error?.message || "Could not fetch all resume")
                })
        }
    }, [dispatch, isAuthenticated])

    //When the data is loading
    if(loading){
        return <Spinner />;
    }

    //When the error occurs and data is not come correctly
    if(error){
        return(
            <Card>
                {error}
            </Card>
        )
    }

    //Handle resume data before the calculation
    const fetchedResume = resumes || [];

    // Count the draft resume
    const draftResume = fetchedResume.filter((res) => (
        [res.summary, res.education, res.experience, res.skills, res.projects, res.certification].some(
            (field) => !field || Array.isArray(field) && field.length === 0
        )
    )).length

    // Get the last most recent updated resume
    const lastUpdatedResume = fetchedResume.length > 0
        ? new Date(
            Math.max(...fetchedResume.map(res => new Date(res.updatedAt)))
        ).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        })
        : "No resume yet";

    return (
        <div className={classes.heroContent}>
            <header className={classes.header}>
                <h1 className={classes.heading}>
                    Welcome back {firstName} {lastName}
                </h1>
            </header>

            <main className={`${classes.mainContent} ${darkMode ? classes.dark : classes.light}`}>
                <p className={classes.subHeading}>Here’s a quick snapshot of your resumes.</p>

                {/* Quick Stats */}
                <div className={classes.QuickStatsCard}>
                    <section className={classes.QuickStatsCardSection}>
                        <h3>Total Resume</h3>
                        <p>{fetchedResume.length}</p>
                    </section>
                    <section className={classes.QuickStatsCardSection}>
                        <h3>Draft Resume</h3>
                        <p>{draftResume}</p>
                    </section>
                    <section className={classes.QuickStatsCardSection}>
                        <h3>Completed Resume</h3>
                        <p>{fetchedResume.length - draftResume}</p>
                    </section>
                    <section className={classes.QuickStatsCardSection}>
                        <h3>Last Resume update</h3>
                        <p>{lastUpdatedResume}</p>
                    </section>
                </div>

                {/* Recent Resumes */}
                <div className={classes.recentResume}>
                    <h2>Recent Resumes</h2>
                    {
                        fetchedResume.length === 0 ? (
                            <p>There is no resume yet</p>
                        ) : (
                            fetchedResume.slice(0, 3).map((resume) => (
                                <section key={resume._id} className={classes.recentResumeSection}>
                                    <h4>{resume?.personalInfo?.name || "Untitled"}</h4>
                                    <p><strong>Email:</strong> {resume?.personalInfo?.email || "N/A"}</p>
                                    <p><strong>Phone:</strong> {resume?.personalInfo?.phone || "N/A"}</p>
                                    <p><strong>Summary:</strong> {resume?.summary || "No summary added"}</p>
                                </section>
                            ))
                        )
                    }
                </div>

                {/* Add Resume Button */}
                <button onClick={() => navigate("/resume-form")} className={classes.addResumeBtn}>
                    <IoMdAdd /> <span style={{ marginLeft: "0.5rem" }}>Add Resume</span>
                </button>
            </main>
        </div>
    );
};

export default Dashboard;


