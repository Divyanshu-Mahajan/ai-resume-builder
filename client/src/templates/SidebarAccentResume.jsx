import React from 'react';
import { useSelector } from 'react-redux';
import classes from './SidebarAccentResume.module.css';
import { FaCircle, FaEnvelope, FaGithub, FaLinkedin, FaPhone } from 'react-icons/fa';

const SidebarAccentResume = () => {
    const resume = useSelector(state => state.resume) || {};
    const darkMode = useSelector(state => state?.theme?.darkMode);

    const {
        personalInfo = {},
        summary = '',
        education = [],
        experience = [],
        skills = [],
        projects = [],
        certification = []
    } = resume;

    const fallback = {
        name: "John Doe",
        email: "johndoe@gmail.com",
        phone: "1234567890",
        address: "123 Main St, City",
        linkedin: "linkedin.com/in/johndoe",
        github: "github.com/johndoe"
    };

    const jobTitle = experience[0]?.jobTitle;

    return (
        <div className={`${classes.resume} ${darkMode === 'dark' ? classes.dark : classes.light}`}>
            <div className={classes.leftSection}>
                <header className={classes.header}>
                    <h1>{personalInfo.name || fallback.name}</h1>
                    <p>{jobTitle || "Job Profession"}</p>
                </header>

                <section className={classes.contactInfo}>
                    <h2>Contact Info</h2>
                    <section className={classes.personalInfo}>
                        <FaEnvelope /><span>{personalInfo.email || fallback.email}</span>
                    </section>
                    <section className={classes.personalInfo}>
                        <FaPhone /><span>{personalInfo.phone || fallback.phone}</span>
                    </section>

                    <section className={classes.personalInfo}>
                        <FaLinkedin /><span>{personalInfo.linkedin || fallback.linkedin}</span>
                    </section>

                    <section className={classes.personalInfo}>
                        <FaGithub /><span>{personalInfo.github || fallback.github}</span>
                    </section>
                </section>

                {
                    // SKills
                    skills?.length > 0 && (
                        <section className={classes.skills}>
                            <h2>Skills</h2>
                            <ul className={classes.infoList}>
                                {
                                    skills.map((skill, index) => (
                                        <li className={classes.infoItem} key={index}>
                                            <FaCircle /><span>{skill}</span>
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
                            <ul className={classes.infoList}>
                                {
                                    certification.map((certi, index) => (
                                        <li className={classes.infoItem} key={index}>
                                            <FaCircle /><span>{certi.title || "Title"}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </section>
                    )
                }

            </div>
            <main className={classes.rightSection}>

                {
                    //Experience
                    experience?.length > 0 && (
                        <section className={classes.experience}>
                            <h2>Experience</h2>
                            <ul className={classes.infoItem}>
                                {
                                    experience.map((exp, index) => (
                                        <li className={classes.infoItem} key={index}>
                                            <div className={classes.infoDivision}>
                                                <h3>{exp.jobTitle || "Role"} - {exp.company || "Company"} {` (${exp.startDate || '(XXXX)'} - ${exp.endDate || "Present"})`}</h3>

                                                {
                                                    exp.responsibilities?.length > 0 && (
                                                        <section className={classes.infoSection}>
                                                            <h4>Responsibilities/Achievements</h4>

                                                            <ul className={classes.descList}>
                                                                {
                                                                    exp.responsibilities.map((resp, index) => (
                                                                        <li className={classes.descItem} key={index}>
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
                            <ul className={classes.infoList}>
                                {
                                    education.map((edu, index) => (
                                        <li className={classes.infoItem} key={index}>
                                            <div className={classes.infoDivision}>
                                                <h3>{edu.degree || "Degree"} - {edu.institution || "institution"} {`(${edu.startDate || "(XXXX)"} - ${edu.endDate || "Present"})`}</h3>

                                                {
                                                    edu.descriptions?.length > 0 && (
                                                        <section className={classes.infoSection}>
                                                            <h4>Description</h4>
                                                            <ul className={classes.descList}>
                                                                {
                                                                    edu.descriptions.map((desc, index) => (
                                                                        <li className={classes.descItem} key={index}>
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
                            <ul className={classes.infoList}>
                                {
                                    projects.map((proj, index) => (
                                        <li className={classes.infoItem} key={index}>
                                            <div className={classes.infoDivision}>
                                                <h3>{proj.projectTitle || "Title"} - {proj.technologies || "Technologies used"}</h3>

                                                {
                                                    proj.descriptions?.length > 0 && (
                                                        <section className={classes.infoSection}>
                                                            <h4>Description</h4>
                                                            <ul className={classes.descList}>
                                                                {
                                                                    proj.descriptions.map((desc, index) => (
                                                                        <li className={classes.descItem} key={index}>
                                                                            - {desc}
                                                                        </li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </section>
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
            </main>
        </div>
    );
};

export default SidebarAccentResume;
