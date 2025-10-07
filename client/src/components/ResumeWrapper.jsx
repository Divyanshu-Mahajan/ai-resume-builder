import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    CleanModernResume,
    CompactGridResume,
    ElegantSidebarResume,
    ElegantTimelineResume,
    MinimalistResume,
    MinimalistTwoColumnResume,
    MonochromeResume,
    SidebarAccentResume,
    SidebarResume,
    SmartResume,
} from "../templates";
import ResumeActionButton from "../components/ResumeActionButton";
import classes from "./ResumeWrapper.module.css";
import { FaArrowLeft } from "react-icons/fa";

const templates = {
    CleanModernResume,
    CompactGridResume,
    ElegantSidebarResume,
    ElegantTimelineResume,
    MinimalistResume,
    MinimalistTwoColumnResume,
    MonochromeResume,
    SidebarAccentResume,
    SidebarResume,
    SmartResume,
};

const ResumeWrapper = () => {
    const { templateName } = useParams();
    const resumeRef = useRef(null);
    const navigate = useNavigate();

    // ✅ get Redux state
    const resume = useSelector((state) => state?.resume);
    const darkMode = useSelector((state) => state?.theme?.darkMode);
    const selectedTemplateName = useSelector(state => state?.resume?.selectedTemplate);

    // template from the redux or user selected
    const templateKey = selectedTemplateName || templateName;

    const SelectedTemplate = templates[templateKey];

    const backButtonClickHandler = () => {
        if(!selectedTemplateName){
            navigate('/preview');
        } else {
            navigate('/resume-form');
        }
    }

    const chooseTemplateHandler = () => {
        navigate("/preview");
    }

    if (!SelectedTemplate) {
        return <p className={classes.error}>Template not found.</p>;
    }

    return (
        <div className={classes.wrapper}>

            <div className={classes.actions}>
                <button onClick={backButtonClickHandler}><FaArrowLeft /></button>
                <button onClick={chooseTemplateHandler}>Choose another template</button>
            </div>
        
            {/* Resume Preview */}
            <div className={classes.resume} ref={resumeRef}>
                {/* ✅ Pass resume + darkMode to template */}
                <SelectedTemplate resume={resume} darkMode={darkMode} />
            </div>

            {/* Action Buttons */}
            <ResumeActionButton resumeRef={resumeRef} templateName={templateKey} />

        </div>
    );
};

export default ResumeWrapper;
