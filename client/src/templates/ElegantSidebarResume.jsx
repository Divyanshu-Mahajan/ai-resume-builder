import React from 'react';
import classes from './ElegantSidebarResume.module.css';
import { useSelector } from 'react-redux';
import { FaCircle, FaEnvelope, FaGithub, FaLinkedin, FaPhone } from 'react-icons/fa';
import { BsDash } from "react-icons/bs";

const ElegantSidebarResume = () => {
    const resumeData = useSelector(state => state.resume) || {};
    const darkMode = useSelector(state => state.theme?.darkMode) || 'light';

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
        education = [],
        experience = [],
        skills = [],
        projects = [],
        certification = []
    } = resumeData;

    const jobTitle = experience[0]?.jobTitle;

    return (

        <div className={`${classes.resume} ${darkMode === 'dark' ? classes.dark : classes.light}`}>
            <aside className={classes.sidebar}>
                <header className={classes.header}>
                    <h1>{personalInfo.name || fallback.name}</h1>
                    <p>{jobTitle || "Job Profession"}</p>
                </header>

                {
                    personalInfo.email && (
                        <section className={classes.personalInfo}>
                            <FaEnvelope /><p>{personalInfo.email || fallback.email}</p>
                        </section>
                    )
                }

                {
                    personalInfo.phone && (
                        <section className={classes.personalInfo}>
                            <FaPhone /><p>{personalInfo.phone || fallback.phone}</p>
                        </section>
                    )
                }

                {
                    personalInfo.linkedin && (
                        <section className={classes.personalInfo}>
                            <FaLinkedin /><p>{personalInfo.linkedin || fallback.linkedin}</p>
                        </section>
                    )
                }

                {
                    personalInfo.github && (
                        <section className={classes.personalInfo}>
                            <FaGithub /><p>{personalInfo.github || fallback.github}</p>
                        </section>
                    )
                }

                {
                    // Skills
                    skills.length > 0 && (
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
                    // Certifications
                    certification?.length > 0 && (
                        <section className={classes.certification}>
                            <h2>Certification</h2>
                            <ul className={classes.certificationList}>
                                {
                                    certification.map((certi, index) => (
                                        <li className={classes.certificationItem} key={index}>
                                            <div className={classes.certificationInfo}>
                                                <p>{certi.title || "Title"}</p>
                                                <p>Issuer - {certi.issuer || "Name of the issuer"}</p>
                                                <p>Year - {certi.date || "Issue Date"}</p>
                                                <p><a href={certi.url} target="_blank" rel="noopener noreferrer">{certi.url || "certificate link"}</a></p>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </section>
                    )
                }
            </aside>

            <main className={classes.mainContent}>

                {
                    // summary
                    summary && (
                        <section className={classes.summary}>
                            <h2>Summary</h2>
                            <p>{summary}</p>
                        </section>
                    )
                }

                {
                    // Experience
                    experience?.length > 0 && (
                        <section className={classes.experience}>
                            <h2>Experience</h2>
                            <ul className={classes.experienceList}>
                                {
                                    experience.map((exp, index) => (
                                        <li className={classes.experienceItem} key={index}>
                                            <p><strong>{exp.company || 'Company'}</strong><span style={{ marginLeft: '0.5rem' }}>{exp.jobTitle || "Role"} | {exp.location || "JOb Location"}</span></p>
                                            <p>Year {exp.startDate || "(dd-mm-yyyy)"} - {exp.endDate || 'Present'}</p>

                                            {
                                                exp.responsibilities?.length > 0 && (
                                                    <ul className={classes.experienceRespList}>
                                                        {
                                                            exp.responsibilities.map((resp, index) => (
                                                                <li className={classes.experienceRespItem} key={index}>
                                                                    - {resp}
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                )
                                            }
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
                                                <p><strong>{edu.degree || "Degree"}</strong><span style={{ marginLeft: "0.5rem" }}>{edu.institution || "Institution"}</span></p>
                                                <p>Year {edu.startDate || "(dd-mm-yyyy)"} - {edu.endDate || 'Present'}</p>
                                                <p>CGPA {edu.grade || "grade"}</p>

                                                {
                                                    edu.descriptions?.length > 0 && (
                                                        <ul className={classes.educationDescList}>
                                                            {
                                                                edu.descriptions.map((desc, index) => (
                                                                    <li className={classes.educationDescItem} key={index}>
                                                                        - {desc}
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>
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
                            <h2>Project</h2>
                            <ul className={classes.projectList}>
                                {
                                    projects.map((proj, index) => (
                                        <li className={classes.projectItem} key={index}>
                                            <div className={classes.projectInfo}>
                                                <p><strong>{proj.projectTitle || "Project Name"}</strong></p>
                                                <p><strong><i>Tech. used :- </i></strong>{proj.technologies || "Technology used"}</p>

                                                {
                                                    proj.descriptions?.length > 0 && (
                                                        <ul className={classes.projectDescList}>
                                                            {
                                                                proj.descriptions.map((desc, index) => (
                                                                    <li className={classes.projectDescItem} key={index}>
                                                                        - {desc}
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>
                                                    )
                                                }

                                                <p><a href={proj.url} target='_blank' rel='noopener noreferrer'>{proj.url}</a></p>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </section>
                    )
                }
            </main>
        </div>


    );
};

export default ElegantSidebarResume;