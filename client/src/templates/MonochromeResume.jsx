import React from 'react';
import classes from './MonochromeResume.module.css';
import { useSelector } from 'react-redux';
import { FaCircle, FaEnvelope, FaGithub, FaLinkedin, FaPhone } from 'react-icons/fa';

const MonochromeResume = () => {
    const resume = useSelector(state => state.resume) || {};
    const darkMode = useSelector(state => state?.theme?.darkMode);

    const fallback = {
        name: "John Doe",
        email: "johndoe@gmail.com",
        phone: "1234567890",
        address: "123 Main St, City",
        linkedin: "linkedin.com/in/johndoe",
        github: "github.com/johndoe"
    };

    const {
        personalInfo = {},
        summary = '',
        experience = [],
        education = [],
        skills = [],
        projects = [],
        certification = []
    } = resume;



    const jobTitle = experience[0]?.jobTitle;

    return (
        <div className={`${classes.resume} ${darkMode === "dark" ? classes.dark : classes.light}`}>
            <header className={classes.header}>
                <h1>{personalInfo.name || fallback.name}</h1>
                <p>{jobTitle || "Job Profession"}</p>
                <ul className={classes.personalList}>
                    <li className={classes.personalItem}>
                        <FaEnvelope /><span>{personalInfo.email || fallback.email}</span>
                    </li>
                    <li className={classes.personalItem}>
                        <FaPhone /><span>{personalInfo.phone || fallback.phone}</span>
                    </li>
                    <li className={classes.personalItem}>
                        <FaLinkedin /><span>{personalInfo.linkedin || fallback.linkedin}</span>
                    </li>
                    <li className={classes.personalItem}>
                        <FaGithub /><span>{personalInfo.github || fallback.github}</span>
                    </li>
                </ul>
            </header>
            <main className={classes.mainContent}>
                <div className={classes.leftSection}>
                    {
                        // Summary
                        summary && (
                            <section className={classes.summary}>
                                <h2>Summary</h2>
                                <p>{summary}</p>
                            </section>
                        )
                    }

                    {
                        // Skills
                        skills?.length > 0 && (
                            <section className={classes.skills}>
                                <h2>Skills</h2>
                                <ul className={classes.skillList}>
                                    {
                                        skills.map((skill, index) => (
                                            <li className={classes.skillItem} key={index}>
                                                <FaCircle />{skill}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </section>
                        )
                    }

                    {
                        // Certification
                        certification?.length > 0 && (
                            <section className={classes.certification}>
                                <h2>Certification</h2>
                                <ul className={classes.certificationList}>
                                    {
                                        certification.map((certi, index) => (
                                            <li className={classes.certificationItem} key={index}>
                                                <div className={classes.certificationInfo}>
                                                    <h3>{certi.title || "Title"} - {certi.issuer || "Name of the issuer"}</h3>
                                                    <p>{certi.date || "Issue Date"}</p>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </section>
                        )
                    }
                </div>
                <div className={classes.rightSection}>
                    {
                        //Experience
                        experience?.length > 0 && (
                            <section className={classes.experience}>
                                <h2>Experience</h2>
                                <ul className={classes.experienceList}>
                                    {
                                        experience.map((exp, index) => (
                                            <li className={classes.experienceItem} key={index}>
                                                <div className={classes.experienceInfo}>
                                                    <h3>{exp.jobTitle || "Role"}</h3>
                                                    <p>
                                                        {exp.company || "Company"} | {exp.location || "Location"} | {exp.startDate || "(XXXX)"} - {exp.endDate || "Present"}
                                                    </p>

                                                    {
                                                        exp.responsibilities?.length > 0 && (
                                                            <section className={classes.experienceRespSection}>
                                                                <h3>Responsibilities/Achievements</h3>
                                                                <ul className={classes.experienceRespList}>
                                                                    {
                                                                        exp.responsibilities.map((resp, index) => (
                                                                            <li className={classes.experienceRespItem} key={index}>
                                                                                - {resp}
                                                                            </li>
                                                                        ))
                                                                    }
                                                                </ul>
                                                            </section>
                                                        )
                                                    }
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </section>
                        )
                    }

                    {
                        // Education
                        education?.length > 0 && (
                            <section className={classes.education}>
                                <h2>Education</h2>
                                <ul className={classes.educationList}>
                                    {
                                        education.map((edu, index) => (
                                            <li className={classes.educationItem} key={index}>
                                                <div className={classes.educationInfo}>
                                                    <h3>{edu.degree || "Degree"} - {edu.institution || " Institution"}</h3>
                                                    <p>{edu.startDate || "(XXXX)"} - {edu.endDate || "Present"}</p>

                                                    {
                                                        edu.descriptions?.length > 0 && (
                                                            <section className={classes.educationDescSection}>
                                                                <h4>Descriptions:-</h4>
                                                                <ul className={classes.educationDescList}>
                                                                    {
                                                                        edu.descriptions.map((desc, index) => (
                                                                            <li className={classes.educationDescItem} key={index}>
                                                                                - {desc}
                                                                            </li>
                                                                        ))
                                                                    }
                                                                </ul>
                                                            </section>
                                                        )
                                                    }
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </section>
                        )
                    }

                    {
                        // Projects
                        projects?.length > 0 && (
                            <section className={classes.projects}>
                                <h2>Projects</h2>
                                <ul className={classes.projectList}>
                                    {
                                        projects.map((proj, index) => (
                                            <li className={classes.projectItem} key={index}>
                                                <div className={classes.projectInfo}>
                                                    <h3>{proj.projectTitle || "Title"}</h3>
                                                    <p><strong>Technologies used: </strong>{proj.technologies}</p>

                                                    {
                                                        proj.descriptions?.length > 0 && (
                                                            <section className={classes.projectDescSection}>
                                                                <h4>Description</h4>
                                                                <ul className={classes.projectDescList}>
                                                                    {
                                                                        proj.descriptions.map((desc, index) => (
                                                                            <li className={classes.projectDescItem} key={index}>
                                                                                - {desc}
                                                                            </li>
                                                                        ))
                                                                    }
                                                                </ul>
                                                            </section>
                                                        )
                                                    }

                                                    <p><a href={proj.url} target='_blank' rel='noopener noreferrer'>{proj.url || "Project link"}</a></p>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </section>
                        )
                    }
                </div>
            </main>
        </div>
    );
};

export default MonochromeResume;