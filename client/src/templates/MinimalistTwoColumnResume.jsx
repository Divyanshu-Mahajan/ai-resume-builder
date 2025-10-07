import React from 'react';
import classes from './MinimalistTwoColumnResume.module.css';
import { useSelector } from 'react-redux';
import { FaEnvelope, FaGithub, FaLinkedin, FaPhone } from 'react-icons/fa';

const MinimalistTwoColumnResume = () => {
    const resume = useSelector(state => state?.resume) || {};
    const darkMode = useSelector(state => state?.theme?.darkMode)

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
                <h1 className={classes.heading}>{personalInfo.name || fallback.name}</h1>
                <p>{jobTitle || "Job Profession"}</p>
            </header>
            <main className={classes.mainContent}>
                {/* Left Section */}
                <div className={classes.leftSection}>
                    <section className={classes.personalData}>
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
                        //Education
                        education?.length > 0 && (
                            <section className={classes.education}>
                                <h2>Education</h2>
                                <ul className={classes.educationList}>
                                    {
                                        education.map((edu, index) => (
                                            <li className={classes.educationItem} key={index}>
                                                <div className={classes.educationInfo}>
                                                    <h3>{edu.degree || "Degree"} - {edu.institution || "institution"}</h3>
                                                    <p>{edu.startDate || "(dd-mm-yyyy)"} - {edu.endDate || "Present"}</p>

                                                    {
                                                        edu.descriptions?.length > 0 && (
                                                            <ul className={classes.educationDescList}>
                                                                {
                                                                    edu.descriptions?.map((desc, index) => (
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
                        //Certification
                        certification?.length > 0 && (
                            <section className={classes.certification}>
                                <ul className={classes.certificationList}>
                                    {
                                        certification.map((certi, index) => (
                                            <li className={classes.certificationItem} key={index}>
                                                <div className={classes.certificationInfo}>
                                                    <h3>{certi.title || "Title"} - {certi.issuer || "Name of the issuer"}</h3>
                                                    <p>{certi.date || "(XXXX)"}</p>
                                                    <p><a href={certi.url} target='_blank' rel='noopener noreferrer'>{certi.url || "certificate link"}</a></p>
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
                        //summary
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
                                                    <h3>{exp.jobTitle || "Role"} - {exp.company || "Company"}</h3>
                                                    <p>{exp.startDate || "(dd-mm-yyyy)"} - {exp.endDate || "Present"}, {exp.location || "Job Location"}</p>

                                                    {
                                                        exp.responsibilities?.length > 0 && (
                                                            <ul className={classes.experienceDescList}>
                                                                {
                                                                    exp.responsibilities.map((desc, index) => (
                                                                        <li className={classes.experienceDescItem} key={index}>
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
                        //Projects
                        projects?.length > 0 && (
                            <section className={classes.projects}>
                                <ul className={classes.projectList}>
                                    {
                                        projects.map((proj, index) => (
                                            <li className={classes.projectItem} key={index}>
                                                <div className={classes.projectInfo}>
                                                    <h3>{proj.projectTitle}</h3>
                                                    <p><strong>Technologies used: </strong>{proj.technologies || "Technologies used"}</p>

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

export default MinimalistTwoColumnResume;