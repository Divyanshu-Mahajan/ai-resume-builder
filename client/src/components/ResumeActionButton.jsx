import React from 'react'
import classes from './ResumeActionButton.module.css';
import { useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import { useSelector } from 'react-redux';

const ResumeActionButton = ({ resumeRef }) => {

    const navigate = useNavigate();
    const selectedTemplate = useSelector(state => state?.resume?.selectedTemplate);

    const editButtonHandler = () => {
        navigate('/resume-form');
    }

    const downloadButtonHandler = () => {
        console.log(selectedTemplate)
        if (resumeRef?.current) {
            const options = {
                margin: 10, // in mm
                filename: `${selectedTemplate || "resume"}.pdf`,
                image: { type: "jpeg", quality: 1 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            };
            html2pdf().set(options).from(resumeRef.current).save();
        }
        navigate("/dashboard");
    }

    return (
        <div className={classes.actions}>
            <button onClick={editButtonHandler}>Edit Resume</button>
            <button onClick={downloadButtonHandler}>Download as pdf</button>
        </div>
    )
}

export default ResumeActionButton
