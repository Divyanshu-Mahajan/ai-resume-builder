import React from 'react';
import classes from './ElegantTimelineResume.module.css';
import { useSelector } from 'react-redux';
import { FaCircle, FaEnvelope, FaGithub, FaLinkedin, FaPhone } from 'react-icons/fa';
import { BsDash } from 'react-icons/bs';

const ElegantTimelineResume = () => {
    const resume = useSelector(state => state.resume) || {};
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
        experience = [],
        education = [],
        skills = [],
        projects = [],
        certification = []
    } = resume;


    const jobTitle = experience[0]?.jobTitle;

    return (
        <div className={`${classes.resume} ${darkMode === 'dark' ? classes.dark : classes.light}`}>
            <header className={classes.header}>
                <h1>{personalInfo.name || fallback.name}</h1>
                <p>{jobTitle || "Job Profession"}</p>
                <ul className={classes.personalInfoList}>
                    <li className={classes.personalInfoItem}>
                        <FaEnvelope /><span>{personalInfo.email || fallback.email}</span>
                    </li>
                    <li className={classes.personalInfoItem}>
                        <FaPhone /><span>{personalInfo.phone || fallback.phone}</span>
                    </li>
                    <li className={classes.personalInfoItem}>
                        <FaLinkedin /><span>{personalInfo.linkedin || fallback.linkedin}</span>
                    </li>
                    <li className={classes.personalInfoItem}>
                        <FaGithub /><span>{personalInfo.github || fallback.github}</span>
                    </li>
                </ul>
            </header>

            <main className={classes.mainContent}>

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
                    // Experience
                    experience?.length > 0 && (
                        <section className={classes.experience}>
                            <h2>Experience</h2>
                            <ul className={classes.experienceList}>
                                {
                                    experience.map((exp, index) => (
                                        <li className={classes.experienceItem} key={index}>
                                            <div className={classes.experienceInfo}>
                                                <h3>{exp.jobTitle || "Role"} @ {exp.company || "Company"}</h3>
                                                <p className={classes.experienceMeta}>
                                                    {exp.startDate || "(dd-mm-yyyy)"} - {exp.endDate || "Present"} | {exp.location || "Job Location"}
                                                </p>

                                                {
                                                    exp.responsibilities?.length > 0 && (
                                                        <ul className={classes.experienceRespList}>
                                                            {
                                                                exp.responsibilities.map((resp, index) => (
                                                                    <li className={classes.experienceRespItem} key={index}>
                                                                        {resp}
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
                    // Education
                    education?.length > 0 && (
                        <section className={classes.education}>
                            <h2>Education</h2>
                            <ul className={classes.educationList}>
                                {
                                    education.map((edu, index) => (
                                        <li className={classes.educationItem}>
                                            <div className={classes.educationInfo}>
                                                <h3>{edu.degree || "Degree"} - {edu.institution || "Institution"}</h3>
                                                <p className={classes.educationMeta}>
                                                    {edu.startDate || "(dd-mm-yyyy)"} - {edu.endDate || "Present"}
                                                </p>
                                                <p>CGPA: {edu.grade || "grade"}</p>

                                                {
                                                    edu.descriptions?.length > 0 && (
                                                        <ul className={classes.educationDescList}>
                                                            {
                                                                edu.descriptions.map((desc, index) => (
                                                                    <li className={classes.educationDescItem} key={index}>
                                                                        {desc}
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
                        <section className={classes.project}>
                            <h2>Projects</h2>
                            <ul className={classes.projectList}>
                                {
                                    projects.map((proj, index) => (
                                        <li className={classes.projectItem} key={index}>
                                            <div className={classes.projectInfo}>
                                                <h3>{proj.projectTitle}</h3>
                                                <p><strong>Technologies:</strong> {proj.technologies || "Technology used"}</p>

                                                {
                                                    proj.descriptions?.length > 0 && (
                                                        <ul className={classes.projectDescList}>
                                                            {
                                                                proj.descriptions.map((desc, index) => (
                                                                    <li className={classes.projectDescItem} key={index}>
                                                                        {desc}
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>
                                                    )
                                                }

                                                <p><a href={proj.url} target='_blank' rel='noopener noreferrer'>{proj.url || "project link"}</a></p>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </section>
                    )
                }

                {
                    //Skill
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
                    //Certification
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
                                                <p><a href={certi.url} target='_blank' rel='noopener noreferrer'>{certi.url || "certificate link"}</a></p>
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

export default ElegantTimelineResume;