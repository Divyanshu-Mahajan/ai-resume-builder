import React from "react";
import classes from "./TemplatePage.module.css";
import ResumeWrapper from "./ResumeWrapper";

const TemplatePage = () => {
    return (
        <div className={classes.templatePage}>
            <ResumeWrapper />
        </div>
    );
};

export default TemplatePage;
