import React from 'react';
import { useSelector } from 'react-redux';
import classes from './CompactGridResume.module.css';
import { FaBrain, FaBriefcase, FaEnvelope, FaGithub, FaLinkedin, FaPhone, FaUser, FaCircle } from 'react-icons/fa6';
import { FaGraduationCap, FaProjectDiagram, FaTools } from "react-icons/fa";


const CompactGridResume = () => {
    const resume = useSelector(state => state.resume) || {};
    const darkMode = useSelector(state => state.theme?.darkMode) || 'light';

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
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        address: '123 Main St, City',
        linkedin: 'linkedin.com/in/johndoe',
        github: 'github.com/johndoe'
    };

    const jobTitle = experience[0]?.jobTitle;

    return (
        <div className={`${classes.resumeContainer} ${darkMode === 'dark' ? classes.dark : classes.light}`}>
            <header className={classes.headerContainer}>
                <h1>{personalInfo.name || fallback.name}</h1>
                <p>{jobTitle || 'Job Profession'}</p>
            </header>


            <main className={classes.mainContainer}>
                <div className={classes.leftSection}>
                    <section className={classes.personalData}>
                        <p><FaEnvelope /><span>{personalInfo.email || fallback.email}</span></p>
                        <p><FaPhone /><span>{personalInfo.phone || fallback.phone}</span></p>
                        <p><FaLinkedin /><span>{personalInfo.linkedin || fallback.linkedin}</span></p>
                        <p><FaGithub /><span>{personalInfo.github || fallback.github}</span></p>
                    </section>

                    {
                        // Skills
                        skills && (
                            <section className={classes.skils}>
                                <h2><FaTools /><span>Skills</span></h2>
                                <ul className={classes.skillList}>
                                    {
                                        skills.map((skill, index) => (
                                            <li className={classes.SkillItem} key={index}>
                                                <FaCircle /><span>{skill}</span>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </section>
                        )
                    }

                    {
                        // certification
                        certification?.length > 0 && (
                            <section className={classes.certification}>
                                <h2><FaBrain /><span>Certification</span></h2>
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
                </div>
                <div className={classes.rightSection}>
                    {
                        // Summary
                        summary && (
                            <section className={classes.summary}>
                                <h2><FaUser /><span>Summary</span></h2>
                                <p>{summary}</p>
                            </section>
                        )
                    }

                    {
                        // Experience
                        experience?.length > 0 && (
                            <section className={classes.experience}>
                                <h2><FaBriefcase /><span>Experience</span></h2>
                                <ul className={classes.experienceList}>
                                    {
                                        experience.map((exp, index) => (
                                            <li className={classes.experienceItem} key={index}>
                                                <p><strong>{exp.company}</strong><span>{exp.jobTitle || "Role"} | {exp.location || "Job Location"}</span></p>
                                                <p>Year {exp.startDate || "(dd-mm-yyyy)"} - {exp.endDate || 'Present'}</p>

                                                {
                                                    exp.responsibilities?.length > 0 && (
                                                        <ul className={classes.experienceRespList}>
                                                            {exp.responsibilities.map((resp, index) => (
                                                                <li className={classes.ExperienceRespItem} key={index}>
                                                                    <FaCircle /><span>{resp}</span>
                                                                </li>
                                                            ))}
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
                                <h2><FaGraduationCap /><span>Education</span></h2>

                                <ul className={classes.educationList}>
                                    {education.map((edu, index) => (
                                        <li className={classes.educationItem} key={index}>
                                            <div className={classes.educationInfo}>
                                                <p><strong>{edu.degree || "Degree"}</strong><span>{edu.institution || "Institution"}</span></p>
                                                <p>Year {edu.startDate || "(dd-mm-yyyy)"} - {edu.endDate || 'Till'}</p>
                                                <p>CGPA {edu.grade || "grade"}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )
                    }

                    {
                        // Projects
                        projects?.length > 0 && (
                            <section className={classes.projects}>
                                <h2><FaProjectDiagram /><span>Projects</span></h2>
                                <ul className={classes.projectList}>
                                    {
                                        projects.map((proj, index) => (
                                            <li className={classes.projectItem} key={index}>
                                                <div className={classes.projectInfo}>
                                                    <p><strong>{proj.projectTitle || "Project Name"}</strong></p>
                                                    <p><strong><i>Tech. used :- </i></strong>{proj.technologies || "Technology used"}</p>

                                                    {
                                                        proj.descriptions.length > 0 && (
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

                                                    <p><a href={proj.url} target='_blank' rel='noopener noreferrer'>{proj.url}</a></p>
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

export default CompactGridResume;