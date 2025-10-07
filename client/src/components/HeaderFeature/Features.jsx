import React from 'react'
import classes from "./Features.module.css";
import { FaRobot, FaMagic, FaPalette, FaEye, FaFileAlt, FaChartLine, FaShieldAlt, FaSyncAlt } from "react-icons/fa";
import { MdHighQuality, MdAutoAwesome } from "react-icons/md";

const Features = () => {
    const features = [
        {
            icon: <FaRobot />,
            title: "AI-Powered Content Generation",
            description: "Leverage advanced AI to create compelling resume content that stands out",
            features: [
                "Smart Professional Summary Writer",
                "Job Description Enhancer",
                "Project Description Generator",
                "Education Detail Builder"
            ],
            color: "#667eea"
        },
        {
            icon: <FaPalette />,
            title: "Professional Template Library",
            description: "Choose from carefully designed templates that pass ATS and impress recruiters",
            features: [
                "10+ ATS-Friendly Templates",
                "Industry-Specific Designs",
                "One-Click Template Switching",
                "Modern & Creative Styles"
            ],
            color: "#764ba2"
        },
        {
            icon: <FaEye />,
            title: "Real-Time Preview & Editing",
            description: "See your changes instantly with our live preview and intuitive editor",
            features: [
                "Live Preview As You Type",
                "Drag & Drop Sections",
                "Multiple Format Export",
                "Mobile-Optimized Editing"
            ],
            color: "#f093fb"
        },
        {
            icon: <FaChartLine />,
            title: "Smart Analytics & Optimization",
            description: "Get actionable insights to improve your resume's effectiveness",
            features: [
                "Resume Scoring System",
                "Keyword Optimization",
                "ATS Compatibility Check",
                "Achievement Builder"
            ],
            color: "#4facfe"
        },
        {
            icon: <FaFileAlt />,
            title: "Multi-Format Export",
            description: "Download your resume in the perfect format for every application",
            features: [
                "High-Quality PDF Export",
                "Editable Word Documents",
                "Plain Text Version",
                "Custom Naming & Organization"
            ],
            color: "#43e97b"
        },
        {
            icon: <FaShieldAlt />,
            title: "Privacy & Security",
            description: "Your data is protected with enterprise-grade security measures",
            features: [
                "End-to-End Encryption",
                "Data Privacy Compliance",
                "Secure Cloud Storage",
                "Complete Data Control"
            ],
            color: "#fa709a"
        }
    ];

    return (
        <section className={classes.features} id="features">
            <div className={classes.container}>
                <div className={classes.header}>
                    <h2 className={classes.sectionTitle}>Powerful Features</h2>
                    <p className={classes.sectionSubtitle}>
                        Everything you need to create a resume that gets you hired
                    </p>
                </div>

                <div className={classes.featuresGrid}>
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={classes.featureCard}
                            style={{ '--accent-color': feature.color }}
                        >
                            <div className={classes.cardHeader}>
                                <div
                                    className={classes.iconWrapper}
                                    style={{ backgroundColor: `${feature.color}15` }}
                                >
                                    <span
                                        className={classes.icon}
                                        style={{ color: feature.color }}
                                    >
                                        {feature.icon}
                                    </span>
                                </div>
                                <h3 className={classes.featureTitle}>{feature.title}</h3>
                            </div>

                            <p className={classes.featureDescription}>{feature.description}</p>

                            <ul className={classes.featuresList}>
                                {feature.features.map((item, itemIndex) => (
                                    <li key={itemIndex} className={classes.featureItem}>
                                        <span
                                            className={classes.checkIcon}
                                            style={{ color: feature.color }}
                                        >
                                            ✓
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <div
                                className={classes.cardHover}
                                style={{
                                    background: `linear-gradient(135deg, ${feature.color}15, ${feature.color}08)`
                                }}
                            ></div>
                        </div>
                    ))}
                </div>

                {/* Feature Highlights */}
                <div className={classes.highlights}>
                    <div className={classes.highlightItem}>
                        <div className={classes.highlightIcon}>
                            <MdAutoAwesome />
                        </div>
                        <div className={classes.highlightContent}>
                            <h4>AI That Understands Your Career</h4>
                            <p>Our AI analyzes industry trends to create content that resonates with recruiters in your field</p>
                        </div>
                    </div>

                    <div className={classes.highlightItem}>
                        <div className={classes.highlightIcon}>
                            <MdHighQuality />
                        </div>
                        <div className={classes.highlightContent}>
                            <h4>Professional Quality Guaranteed</h4>
                            <p>Every template and suggestion is designed by career experts and hiring managers</p>
                        </div>
                    </div>

                    <div className={classes.highlightItem}>
                        <div className={classes.highlightIcon}>
                            <FaSyncAlt />
                        </div>
                        <div className={classes.highlightContent}>
                            <h4>Always Evolving</h4>
                            <p>Regular updates with new templates and AI improvements based on user success</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features