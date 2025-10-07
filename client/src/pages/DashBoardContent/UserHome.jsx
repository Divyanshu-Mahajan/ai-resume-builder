import React, { useEffect, useState } from 'react'
import classes from './UserHome.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { fetchAllResume } from '../../redux/slice/resumeSlice';
import Spinner from '../../UI/Spinner';
import Card from '../../UI/Card';

const UserHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state?.theme?.darkMode);
  const { resumes, loading, error } = useSelector(state => state?.resume);
  const { user, isAuthenticated } = useSelector(state => state?.auth);

  //Fallback the firstname and lastname
  const firstName = user?.firstName;
  const lastName = user?.lastName;

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchAllResume())
        .unwrap()
        .catch((error) => {
          console.log(error?.message || "Failed to fetch all resume");
        })
    }
  }, [dispatch, isAuthenticated])

  //Loading data
  if (loading) {
    return <Spinner />;
  }

  //When the error occur
  if (error) {
    return (
      <Card>
        {error}
      </Card>
    )
  }

  const fetchedResumes = resumes || [];

  //Edit the user info
  const accountSettingHandler = () => {
    navigate("/account-settings")
  }

  //Route to create ne resume
  const addResumeHandler = () => {
    navigate("/resume-form");
  }

  //View the user resume

  const viewResumeHandler = (id) => {
    // Here i handle the single resume
    navigate(`/single-resume/${id}`)
  }

  //View user all resume
  const viewAllResume = () => {
    navigate("/my-resume");
  }

  //Count the draft resume
  const draftResume = fetchedResumes.filter((res) => (
    [res.summary, res.education, res.experience, res.skills, res.projects, res.certification].some(
      (field) => !field || (Array.isArray(field) && field.length === 0)
    )
  )).length;

  //Get the last recent updated resume
  const lastResumeUpdated = fetchedResumes.length > 0
    ? new Date(
      Math.max(...fetchedResumes.map(res => new Date(res.updatedAt)))
    ).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
    : "No resume yet"

  return (
    <div className={`${classes.home} ${darkMode ? classes.dark : classes.light}`}>
      <header className={classes.header}>
        <h1 className={classes.heading}>
          Hello {firstName}
        </h1>
      </header>
      <main className={classes.mainContent}>

        <section className={classes.profileInfo}>
          <h2 className={classes.profileHeading}>Profile Info</h2>
          <div className={classes.avatar}>
            <i className="fas fa-user"></i> {/* Or your current icon */}
          </div>
          <div className={classes.profileText}>
            <p><strong>Name:</strong> {firstName} {lastName}</p>
            <p><strong>Email:</strong> {user?.email}</p>
          </div>
          <button className={classes.profileBtn} onClick={accountSettingHandler}>
            Account Settings
          </button>
        </section>

        <section className={classes.quickAction}>
          <p><strong>Total Resumes </strong>- {fetchedResumes.length}</p>
          <p><strong>Draft Resume </strong>- {draftResume}</p>
          <p><strong>Last Update </strong>{lastResumeUpdated}</p>
        </section>

        <section className={classes.recentResume}>
          <h2>Recent Resumes</h2>
          {
            fetchedResumes.length === 0 ? (
              <div className={classes.noRecentResume}>
                <p>Oh! Sorry there is no resume</p>
                <button type='button' className={classes.btn} onClick={addResumeHandler}>+ Create Resume</button>
              </div>
            ) : (
              fetchedResumes.slice(0, 3).map((res) => (
                <div key={res._id} className={classes.singleResume}>
                  <h4>{res.personalInfo?.name || "Untitled"}</h4>
                  <p>{res.summary || "No summary added"}</p>
                  <button type='button' className={classes.btn} onClick={() => { viewResumeHandler(res._id) }}>View</button>
                </div>
              ))
            )
          }
        </section>
        <button type='button' className={classes.btn} onClick={viewAllResume}>View All Resume</button>
      </main>
    </div>
  )
}

export default UserHome
