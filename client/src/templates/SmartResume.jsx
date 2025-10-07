import React from 'react';
import { useSelector } from 'react-redux';
import classes from './SmartResume.module.css';
import { FaEnvelope, FaGithub, FaLinkedin, FaPhone } from 'react-icons/fa';

const SmartResume = () => {
    const resumeData = useSelector(state => state.resume);
    const darkMode = useSelector(state => state?.theme?.darkMode);

    const {
        personalInfo = {},
        summary = '',
        experience = [],
        education = [],
        skills = [],
        projects = [],
        certification = []
    } = resumeData;

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
            <header className={classes.header}>
                <h1>{personalInfo.name || fallback.name}</h1>
                <p>{jobTitle || "Job Profession"}</p>
                <ul className={classes.contactList}>
                    <li className={classes.contactInfo}>
                        <FaEnvelope /><span>{personalInfo.email || fallback.email}</span>
                    </li>
                    <li className={classes.contactInfo}>
                        <FaPhone /><span>{personalInfo.phone || fallback.phone}</span>
                    </li>
                    <li className={classes.contactInfo}>
                        <FaLinkedin /><span>{personalInfo.linkedin || fallback.linkedin}</span>
                    </li>
                    <li className={classes.contactInfo}>
                        <FaGithub /><span>{personalInfo.github || fallback.github}</span>
                    </li>
                </ul>
            </header>

            {
                // Summary
                summary && (
                    <section className={classes.summary}>
                        <h2>Summary</h2>
                        <p>{summary}</p>
                    </section>
                )
            }

            <aside className={classes.leftSection}>
                {
                    // Skills
                    skills?.length > 0 && (
                        <section className={classes.skills}>
                            <h2>Skills</h2>
                            <ul className={classes.skillList}>
                                {
                                    skills.map((skill, index) => (
                                        <li className={classes.skillItem} key={index}>
                                            {skill}
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
                                                <h3>{edu.degree || "Degree"} - {edu.institution || "institution"}</h3>
                                                <p>{`(${edu.startDate || "XXXX"} - ${edu.endDate || "XXXX"})`}</p>

                                                {
                                                    edu.descriptions?.length > 0 && (
                                                        <section className={classes.infoSection}>
                                                            <h4>Description</h4>
                                                            <ul className={classes.descList}>
                                                                {
                                                                    edu.descriptions.map((desc, index) => (
                                                                        <li className={classes.descItem} key={index}>
                                                                            {desc}
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
                    // Certification
                    certification?.length > 0 && (
                        <section className={classes.certification}>
                            <h2>Certification</h2>
                            <ul className={classes.infoList}>
                                {
                                    certification.map((certi, index) => (
                                        <li className={classes.infoItem} key={index}>
                                            <div className={classes.infoDivision}>
                                                <h3>{certi.title || "Title"} - {certi.issuer || "Name of the issuer"}</h3>
                                                <p>{certi.date || "XXXX"}</p>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </section>
                    )
                }
            </aside>
            <main className={classes.rightSection}>
                {
                    // Experience
                    experience?.length > 0 && (
                        <section className={classes.experience}>
                            <h2>Experience</h2>
                            <ul className={classes.infoList}>
                                {
                                    experience.map((exp, index) => (
                                        <li className={classes.infoItem} key={index}>
                                            <div className={classes.infoDivision}>
                                                <h3>{exp.jobTitle || "Role"} - {exp.company || "Company"}</h3>
                                                <p>{exp.startDate || "(mm-dd-yyyy)"} - {exp.endDate || "Present"}</p>

                                                {
                                                    exp.responsibilities?.length > 0 && (
                                                        <section className={classes.infoSection}>
                                                            <h4>Responsibilies/Achievements</h4>
                                                            <ul className={classes.descList}>
                                                                {
                                                                    exp.responsibilities.map((resp, index) => (
                                                                        <li className={classes.descItem} key={index}>
                                                                            {resp}
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
                                                <h3>{proj.projectTitle || "Project Title"}</h3>

                                                {
                                                    proj.descriptions?.length > 0 && (
                                                        <section className={classes.infoSection}>
                                                            <h4>Features</h4>
                                                            <ul className={classes.descList}>
                                                                {
                                                                    proj.descriptions.map((desc, index) => (
                                                                        <li className={classes.descItem} key={index}>
                                                                            {desc}
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
            </main>
        </div>
    );
};

export default SmartResume;