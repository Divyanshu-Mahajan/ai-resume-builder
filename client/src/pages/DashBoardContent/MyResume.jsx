import React, { useEffect, useState } from 'react'
import classes from './MyResume.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteResume, deleteSingleResume, fetchAllResume } from '../../redux/slice/resumeSlice';
import { RxCross2 } from "react-icons/rx";
import { toast } from 'react-toastify';
import Spinner from '../../UI/Spinner';
import Card from '../../UI/Card';

const MyResume = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const darkMode = useSelector(state => state?.theme?.darkMode);
    const { resumes, loading, error } = useSelector(state => state?.resume);
    const { user, isAuthenticated } = useSelector(state => state?.auth);
    const [resumeToDelete, setResumeToDelete] = useState(null); //For the conformation
    const [deleteAllConfirm, setDeleteAllConfirm] = useState(false);


    //Handle the fallback
    const firstName = user?.firstName;

    //Fetch all user resume
    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchAllResume())
                .unwrap()
                .catch((error) => {
                    console.log(error?.message || "Failed to fetch all resume");
                })
        }
    }, [dispatch, isAuthenticated])

    //Data loading
    if (loading) {
        return <Spinner />;
    }

    //When an error occur
    if (error) {
        return (
            <Card>
                {error}
            </Card>
        )
    }

    //All resume before the evaluating the resume
    const fetchedResume = resumes || [];

    //Route to create new resume
    const createResumeHandler = () => {
        navigate("/resume-form");
    }

    //View Single Resume
    const viewResumeHandler = (id) => {
        navigate(`/single-resume/${id}`);
    }

    //Edit user resume
    const editResumeHandler = (id) => {
        navigate(`/resume-form/${id}`);
    }

    //Confirm Delete for the confirmation
    const confirmDelete = (id) => {
        setResumeToDelete(id);
    }
    //Delete selected resume
    const deleteResumeHandler = () => {

        dispatch(deleteSingleResume(resumeToDelete))
            .unwrap()
            .then(result => {
                toast.success(result?.message || "Resume deleted successfully");
                setResumeToDelete(null);
            })
            .catch(error => {
                toast.error(error?.message || "Failed to delete resume");
                setResumeToDelete(null);
            })

    }

    //Delete all user's resumes
    const deleteAllResumeHandler = () => {
        dispatch(deleteResume())
            .unwrap()
            .then(() => {
                toast.success("All resumes deleted successfully");
                setDeleteAllConfirm(false);
            })
            .catch(error => {
                toast.error(error?.message || "Failed to delete all resumes");
                setDeleteAllConfirm(false);
            });
    };

    const cancelDeleteAllHandler = () => {
        setDeleteAllConfirm(false);
    }

    //Cancel delete in the corfirmation modal
    const cancelHandler = () => {
        setResumeToDelete(null);
    }

    //Close the modal when select cancel or delete the resume
    const modalOverlayHandler = (event) => {
        if (event.target.classList.contains(classes.modalOverlay)) {
            setResumeToDelete(null);
        }
    }

    return (
        <div className={`${classes.allResume} ${darkMode ? classes.dark : classes.light}`}>
            <header className={classes.header}>
                <h1 className={classes.heading}>
                    {firstName}, here are your resumes
                </h1>
                <button type='button' className={classes.btn} onClick={createResumeHandler}>+ Create Resume</button>
            </header>
            <main className={classes.mainContent}>
                {
                    fetchedResume.length === 0 ? (
                        <div className={classes.noResume}>
                            <p>No resume</p>
                            <button type='button' className={classes.btn} onClick={createResumeHandler}>+ Create Resume</button>
                        </div>
                    ) : (
                        fetchedResume.map((res, index) => (
                            <div key={res._id || index} className={classes.userResume}>
                                <button
                                    type='button'
                                    className={classes.deleteBtn}
                                    onClick={() => confirmDelete(res._id)}
                                >
                                    <RxCross2 />
                                </button>
                                <h4>{res.personalInfo?.name || "Untitled"}</h4>
                                <p>{res?.summary || "No summary added"}</p>
                                <small className={classes.updatedAt}>
                                    Last Updated: {new Date(res.updatedAt).toLocaleString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                </small>
                                <div className={classes.resumeActions}>
                                    <button type='button' onClick={() => viewResumeHandler(res._id)}>View</button>
                                    <button type='button' onClick={() => editResumeHandler(res._id)}>Edit</button>
                                </div>
                            </div>
                        ))
                    )
                }

            </main>

            {fetchedResume.length > 0 && (
                <button
                    type='button'
                    className={classes.btn}
                    onClick={() => setDeleteAllConfirm(true)}
                    disabled={loading}
                >
                    Delete All Resumes
                </button>
            )}


            {/*Confirmation Model */}
            {
                resumeToDelete && (
                    <div className={classes.modalOverlay} onClick={modalOverlayHandler}>
                        <div className={classes.modal}>
                            <h3>Are you sure?</h3>
                            <p>Do you really want to delete this resume? This action cannot be undone.</p>
                            <div className={classes.modalActions}>
                                <button type='button'
                                    className={classes.cancelBtn}
                                    onClick={cancelHandler}>
                                    Cancel
                                </button>
                                <button
                                    type='button'
                                    className={classes.deleteConfirmBtn}
                                    onClick={deleteResumeHandler}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Delete All Resume Modal */}
            {
                deleteAllConfirm && (
                    <div className={classes.modalOverlay} onClick={modalOverlayHandler}>
                        <div className={classes.modal}>
                            <h3>Delete All Resumes?</h3>
                            <p>This will permanently delete <b>all</b> your resumes. This action cannot be undone.</p>
                            <div className={classes.modalActions}>
                                <button type='button'
                                    className={classes.cancelBtn}
                                    onClick={cancelDeleteAllHandler}>
                                    Cancel
                                </button>
                                <button type='button'
                                    className={classes.deleteConfirmBtn}
                                    onClick={deleteAllResumeHandler}
                                    disabled={loading}>
                                    {loading ? "Deleting..." : "Delete All"}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default MyResume
