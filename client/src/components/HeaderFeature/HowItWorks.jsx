import React from 'react'
import classes from "./HowItWorks.module.css"; // Consider renaming CSS module
import { SiGnuprivacyguard } from "react-icons/si";
import { FaFileWaveform } from "react-icons/fa6";
import { LuLayoutTemplate } from "react-icons/lu";
import { FaCloudDownloadAlt, FaMagic, FaUserEdit } from 'react-icons/fa';
import { MdAutoAwesome } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const HowItWorks = () => {
    const steps = [
        {
            icon: <SiGnuprivacyguard />,
            title: "Create Your Account",
            features: [
                "30-second registration process",
                "Social login with Google/LinkedIn",
                "Start building immediately - no payment required"
            ],
            highlight: "Free forever plan available"
        },
        {
            icon: <FaUserEdit />,
            title: "Fill Your Details",
            features: [
                "Easy-to-fill resume form",
                "Import from LinkedIn (optional)",
                "Structured sections for clarity"
            ],
            highlight: "Auto-save progress"
        },
        {
            icon: <MdAutoAwesome />,
            title: "AI Enhancement",
            features: [
                "Generate professional summaries",
                "Create compelling job responsibilities",
                "Write impactful project descriptions"
            ],
            highlight: "One-click improvements"
        },
        {
            icon: <LuLayoutTemplate />,
            title: "Choose Template",
            features: [
                "10+ professional templates",
                "ATS-friendly formats",
                "Industry-specific designs"
            ],
            highlight: "Instant preview"
        },
        {
            icon: <FaCloudDownloadAlt />,
            title: "Download & Apply",
            features: [
                "Multiple formats (PDF, Word, Text)",
                "Job-specific tailoring",
                "Perfect formatting every time"
            ],
            highlight: "Ready in minutes"
        }
    ];

    const navigate = useNavigate();
    const getStartedHandler = () => {
        navigate("/register");
    }
    return (
        <section className={classes.howItWorks} id="how-it-works">
            <div className={classes.container}>
                <div className={classes.header}>
                    <h2 className={classes.sectionTitle}>How It Works</h2>
                    <p className={classes.sectionSubtitle}>
                        Create a professional resume in 5 simple steps
                    </p>
                </div>

                <div className={classes.stepsGrid}>
                    {steps.map((step, index) => (
                        <div key={index} className={classes.stepCard}>
                            <div className={classes.stepHeader}>
                                <div className={classes.stepNumber}>{index + 1}</div>
                                <div className={classes.stepIcon}>{step.icon}</div>
                            </div>

                            <h3 className={classes.stepTitle}>{step.title}</h3>

                            <ul className={classes.featuresList}>
                                {step.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className={classes.featureItem}>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <div className={classes.highlight}>
                                {step.highlight}
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className={classes.ctaSection}>
                    <h3>Ready to Create Your Perfect Resume?</h3>
                    <p>Join thousands of professionals who landed their dream jobs</p>
                    <button className={classes.ctaButton} onClick={getStartedHandler}>
                        Get Started Free
                    </button>
                    <p className={classes.note}>No credit card required</p>
                </div>
            </div>
        </section>
    )
}

export default HowItWorks