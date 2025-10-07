import React from 'react';
import styles from './CleanModernResume.module.css';
import { useSelector } from 'react-redux';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CleanModernResume = () => {
    const navigate = useNavigate();
    const resume = useSelector((state) => state.resume);
    const darkMode = useSelector(state => state?.theme?.darkMode);

    const {
        personalInfo,
        summary,
        education,
        experience,
        projects,
        certification,
    } = resume;

    const fallback = {
        personalInfo: {
            name: "John Doe",
            email: "johndoe@example.com",
            phone: "123-456-7890",
            address: "123 Main St, New York, NY",
            linkedin: "linkedin.com/in/johndoe",
            github: "github.com/johndoe"
        },
        summary:
            "Highly motivated and detail-oriented software developer with experience in building responsive web applications using React, Redux, Node.js, and MongoDB. Passionate about problem-solving and writing clean, efficient code. Seeking opportunities to apply my skills and contribute to impactful projects.",
        education: [
            {
                degree: "Bachelor of Technology in Computer Science",
                institution: "ABC University",
                startDate: "2018",
                endDate: "2022",
                grade: "8.5 CGPA",
                descriptions: [
                    "Completed coursework in Data Structures, Algorithms, and Web Development",
                    "Graduated with First Division honors"
                ]
            }
        ],
        experience: [
            {
                jobTitle: "Frontend Developer Intern",
                company: "XYZ Technologies",
                startDate: "Jan 2023",
                endDate: "Jun 2023",
                location: "Remote",
                responsibilities: [
                    "Developed responsive web interfaces using React and Tailwind CSS",
                    "Collaborated with backend team to integrate REST APIs",
                    "Improved page load performance by 20% through code optimization"
                ]
            }
        ],
        skills: ["JavaScript", "React", "Redux", "HTML", "CSS", "Node.js", "MongoDB"],
        projects: [
            {
                projectTitle: "AI Resume Builder",
                technologies: "React, Redux, Node.js, MongoDB",
                descriptions: [
                    "Developed a resume builder with multiple templates and live preview",
                    "Implemented theme toggle and PDF export functionality"
                ],
                url: "https://github.com/johndoe/ai-resume-builder"
            },
            {
                projectTitle: "E-Commerce Platform",
                technologies: "React, Express, MongoDB",
                descriptions: [
                    "Built a full-stack e-commerce app with authentication and payment gateway",
                    "Implemented product search and filtering features"
                ],
                url: "https://github.com/johndoe/ecommerce"
            }
        ],
        certification: [
            {
                title: "React Developer Certification",
                issuer: "Coursera",
                date: "2023",
                url: "https://coursera.org/cert/johndoe-react"
            },
            {
                title: "JavaScript Algorithms and Data Structures",
                issuer: "freeCodeCamp",
                date: "2022",
                url: "https://freecodecamp.org/cert/johndoe-js"
            }
        ]
    };


    const jobTitle = experience[0]?.jobTitle;


    return (
        <div className={`${styles.resume} ${darkMode === 'dark' ? styles.dark : styles.light}`}>
            {/* Header */}
            <div className={styles.header}>
                <div>
                    <h1 className={styles.name}>{personalInfo.name || fallback.name}</h1>
                    <p className={styles.title}>{jobTitle || "Job Profession"}</p>
                </div>
                <div className={styles.contactInfo}>
                    {personalInfo.email && (
                        <div className={styles.contactItem}>
                            <FaEnvelope className={styles.icon} />
                            <span>{personalInfo.email}</span>
                        </div>
                    )}
                    {personalInfo.phone && (
                        <div className={styles.contactItem}>
                            <FaPhone className={styles.icon} />
                            <span>{personalInfo.phone}</span>
                        </div>
                    )}
                    {personalInfo.address && (
                        <div className={styles.contactItem}>
                            <FaMapMarkerAlt className={styles.icon} />
                            <span>{personalInfo.address}</span>
                        </div>
                    )}
                    {personalInfo.linkedin && (
                        <div className={styles.contactItem}>
                            <FaLinkedin className={styles.icon} />
                            <span>{personalInfo.linkedin}</span>
                        </div>
                    )}
                    {personalInfo.github && (
                        <div className={styles.contactItem}>
                            <FaGithub className={styles.icon} />
                            <span>{personalInfo.github}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Summary */}
            {summary && (
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Professional Summary</h2>
                    <p className={styles.summaryText}>{summary}</p>
                </div>
            )}

            {/* Experience */}
            {experience?.length > 0 && (
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Experience</h2>
                    {experience.map((exp, index) => (
                        <div key={index} className={styles.experienceItem}>
                            <div className={styles.jobHeader}>
                                <h3 className={styles.jobTitle}>{exp.jobTitle || "Role"}</h3>
                                <span className={styles.duration}>
                                    {exp.startDate || "(dd-mm-yyyy)"} - {exp.endDate || "Present"}
                                </span>
                            </div>
                            <p className={styles.company}>{exp.company}</p>
                            <ul className={styles.responsibilities}>
                                {exp.responsibilities?.map((item, i) => (
                                    <li key={i} className={styles.responsibilityItem}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}

            {/* Education */}
            {education?.length > 0 && (
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Education</h2>
                    {education.map((edu, index) => (
                        <div key={index} className={styles.educationItem}>
                            <h3 className={styles.degree}>{edu.degree || 'Degree'}</h3>
                            <p className={styles.university}>{edu.institution || "Institution"}</p>
                            <p className={styles.educationDetails}>
                                {edu.startDate || "(dd-mm-yyyy)"} - {edu.endDate || "Present"}
                            </p>
                            <ul className={styles.responsibilities}>
                                {edu.descriptions?.map((desc, i) => (
                                    <li key={i} className={styles.responsibilityItem}>
                                        {desc}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}

            {/* Projects */}
            {projects?.length > 0 && (
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Projects</h2>
                    {projects.map((project, index) => (
                        <div key={index} className={styles.projectItem}>
                            <div className={styles.projectHeader}>
                                <h3 className={styles.projectTitle}>{project.projectTitle || "Project Name"}</h3>
                            </div>
                            <p className={styles.techStack}>{project.technologies}</p>
                            <ul className={styles.responsibilities}>
                                {project.descriptions?.map((desc, i) => (
                                    <li key={i} className={styles.responsibilityItem}>
                                        {desc}
                                    </li>
                                ))}
                            </ul>
                            <p><a href={project.url} target='_blank' rel='noopener noreferrer'>{project.url || "project link"}</a></p>
                        </div>
                    ))}
                </div>
            )}

            {/* Certifications */}
            {certification?.length > 0 && (
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Certifications</h2>
                    {certification.map((cert, index) => (
                        <div key={index} className={styles.educationItem}>
                            <h3 className={styles.degree}>{cert.title || "Title"}</h3>
                            <p className={styles.university}>{cert.issuer || "Name of the issuer"}</p>
                            <p className={styles.educationDetails}>{cert.date || "Issue Date"}</p>
                            <p><a href={cert.url} target='_blank' rel='noopener noreferrer'>{cert.url || "certificate link"}</a></p>
                        </div>
                    ))}
                </div>
            )}
        </div>

    );
};

export default CleanModernResume;
