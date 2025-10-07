import React from 'react';
import { useSelector } from 'react-redux';
import classes from './SidebarResume.module.css';
import { FaCircle, FaEnvelope, FaGithub, FaLinkedin, FaPhone } from 'react-icons/fa';

const SidebarResume = () => {
    const resume = useSelector(state => state.resume) || {};
    const darkMode = useSelector(state => state?.theme?.darkMode);

    const {
        personalInfo = {},
        summary = '',
        education = [],
        experience = [],
        skills = [],
        projects = [],
        certification = [],
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
            <aside className={classes.leftSidebar}>
                <header className={classes.header}>
                    <h1>{personalInfo.name || fallback.name}</h1>
                    <p>{jobTitle || "Job Profession"}</p>
                </header>
                <section className={classes.contactInfo}>
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
                    //Skills
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
                    // Certifications
                    certification?.length > 0 && (
                        <section className={classes.certification}>
                            <h2>Certification</h2>
                            <ul className={classes.infoList}>
                                {
                                    certification.map((certi, index) => (
                                        <li className={classes.infoItem} key={index}>
                                            <div className={classes.infoDivision}>
                                                <h3>{certi.title || "Title"} {`(${certi.issuer || "Name of the issuer"}, ${certi.date || "XXXX"})`}</h3>
                                                {
                                                    certi.url && (
                                                        <p><a href={certi.url} target='_blank' rel='noopener noreferrer'>{certi.url}</a></p>
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
            </aside>
            <main className={classes.rightSection}>
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
                            <ul className={classes.infoList}>
                                {
                                    experience.map((exp, index) => (
                                        <li className={classes.infoItem} key={index}>
                                            <div className={classes.infoDivision}>
                                                <h3>[{exp.jobTitle || "Role"}] - {exp.company || "Company"} | {exp.startDate || "(XXXX)"} - {exp.endDate || "Present"}</h3>
                                                <p>{exp.location}</p>

                                                {
                                                    exp.responsibilities?.length > 0 && (
                                                        <section className={classes.infoSection}>
                                                            <h4>Resposibilities/Achievements</h4>
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
                                                <h3>[{edu.degree || "Degree"}] - {edu.institution || "Institution"} | {edu.startDate || "XXXX"} - {edu.endDate || "Present"}</h3>
                                                <p>{edu.grade || "grade"}</p>

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
                                                <h3>[{proj.projectTitle || "Title"}] - {proj.technologies || "Technology used"}</h3>

                                                {
                                                    proj.descriptions?.length > 0 && (
                                                        <section className={classes.infoSection}>
                                                            <h4>Feature</h4>
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

                                                {
                                                    proj.url && (
                                                        <p><a href={proj.url} target='_blank' rel='noopener noreferrer'>{proj.url}</a></p>
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

export default SidebarResume;
