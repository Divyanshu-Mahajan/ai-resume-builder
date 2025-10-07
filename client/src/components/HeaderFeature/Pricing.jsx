import React from 'react'
import classes from "./Pricing.module.css";
import { FaCheck, FaRocket, FaHeart, FaUsers, FaCrown } from "react-icons/fa";
import { MdCelebration, MdSecurity, MdSupport } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
    const plans = [
        {
            name: "Starter",
            icon: <FaRocket />,
            price: "Free",
            description: "Perfect for students and beginners",
            features: [
                "1 Professional Template",
                "Basic AI Content Generation",
                "PDF Export",
                "3 Resume Saves",
                "Standard Support",
                "Community Access"
            ],
            popular: false,
            color: "#667eea"
        },
        {
            name: "Pro",
            icon: <FaCrown />,
            price: "Free",
            description: "Most popular - full features unlocked",
            features: [
                "All 10+ Professional Templates",
                "Unlimited AI Content Generation",
                "Export as PDF Formats",
                "Unlimited Resume Saves",
                "ATS Optimization",
                "Priority Support",
                "Cover Letter Builder",
                "Resume Analytics"
            ],
            popular: true,
            color: "#764ba2"
        },
        {
            name: "Team",
            icon: <FaUsers />,
            price: "Free",
            description: "Collaborate with your team or class",
            features: [
                "Everything in Pro Plan",
                "Team Collaboration",
                "Shared Templates",
                "Bulk Resume Management",
                "Admin Dashboard",
                "Custom Branding",
                "Dedicated Support"
            ],
            popular: false,
            color: "#f093fb"
        }
    ];
    const navigate = useNavigate();
    const getStartedHandler = () => {
        navigate("/sign-up");
    }

    return (
        <section className={classes.pricing} id="pricing">
            <div className={classes.container}>
                <div className={classes.header}>
                    <h2 className={classes.sectionTitle}>Completely Free</h2>
                    <p className={classes.sectionSubtitle}>
                        This is a practice project - all features are available at no cost! 🎉
                    </p>
                    <div className={classes.freeBadge}>
                        <MdCelebration className={classes.celebrationIcon} />
                        <span>100% Free Forever - No Hidden Costs</span>
                    </div>
                </div>

                <div className={classes.pricingGrid}>
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`${classes.pricingCard} ${plan.popular ? classes.popular : ''}`}
                            style={{ '--accent-color': plan.color }}
                        >
                            {plan.popular && (
                                <div className={classes.popularBadge}>
                                    <FaHeart className={classes.heartIcon} />
                                    Most Popular
                                </div>
                            )}

                            <div className={classes.cardHeader}>
                                <div
                                    className={classes.planIcon}
                                    style={{ backgroundColor: `${plan.color}15` }}
                                >
                                    <span style={{ color: plan.color }}>{plan.icon}</span>
                                </div>
                                <h3 className={classes.planName}>{plan.name}</h3>
                                <div className={classes.price}>
                                    {plan.price}
                                </div>
                                <p className={classes.planDescription}>{plan.description}</p>
                            </div>

                            <ul className={classes.featuresList}>
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className={classes.featureItem}>
                                        <FaCheck className={classes.checkIcon} style={{ color: plan.color }} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={classes.ctaButton}
                                onClick={getStartedHandler}
                                style={{
                                    background: plan.popular
                                        ? `linear-gradient(135deg, ${plan.color}, ${plan.color}dd)`
                                        : `linear-gradient(135deg, ${plan.color}15, ${plan.color}25)`,
                                    color: plan.popular ? 'white' : plan.color
                                }}
                            >
                                Get Started Free 
                            </button>
                        </div>
                    ))}
                </div>

                {/* Additional Free Features */}
                <div className={classes.freeFeatures}>
                    <h3>Why It's Free?</h3>
                    <div className={classes.featuresGrid}>
                        <div className={classes.featureItem}>
                            <MdCelebration className={classes.featureIcon} />
                            <h4>Learning Project</h4>
                            <p>This is built for practice and portfolio showcase</p>
                        </div>
                        <div className={classes.featureItem}>
                            <MdSecurity className={classes.featureIcon} />
                            <h4>Open Source Spirit</h4>
                            <p>Believe in making tools accessible for everyone learning</p>
                        </div>
                        <div className={classes.featureItem}>
                            <MdSupport className={classes.featureIcon} />
                            <h4>Community Driven</h4>
                            <p>Your feedback helps improve this learning project</p>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className={classes.ctaSection}>
                    <h3>Ready to Build Your Resume?</h3>
                    <p>Start creating professional resumes with all features completely free</p>
                    <div className={classes.ctaButtons}>
                        <button className={classes.primaryCta}>
                            <FaRocket />
                            Start Building Now
                        </button>
                        <button className={classes.secondaryCta}>
                            View Demo
                        </button>
                    </div>
                    <p className={classes.note}>
                        No registration required for demo • Instant access
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Pricing