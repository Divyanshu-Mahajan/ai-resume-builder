import React, { useState } from 'react'
import classes from "./Testimonials.module.css";
import { FaQuoteLeft, FaStar, FaLinkedin, FaGithub, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdWork, MdSchool, MdBusinessCenter } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Testimonials = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const testimonials = [
        {
            name: "Sarah Chen",
            role: "Senior Developer",
            company: "Microsoft",
            image: "👩‍💻",
            rating: 5,
            text: "The AI-generated project descriptions helped me land interviews at Google and Amazon. My response rate increased by 300%! The templates are professional and ATS-friendly.",
            category: "tech",
            linkedin: "#",
            achievement: "3 job offers in 2 weeks"
        },
        {
            name: "Michael Rodriguez",
            role: "Business Analyst",
            company: "TechCorp",
            image: "👨‍💼",
            rating: 5,
            text: "As a recent graduate with limited experience, the AI helped me frame my projects and coursework professionally. Got my first job within a month of using this builder!",
            category: "graduate",
            linkedin: "#",
            achievement: "First job secured"
        },
        {
            name: "Jessica Williams",
            role: "Product Manager",
            company: "StartUp Inc",
            image: "👩‍💼",
            rating: 5,
            text: "Transitioning from marketing to product management seemed impossible. The AI rewrote my experience to highlight transferable skills perfectly. Life-changing tool!",
            category: "career-change",
            linkedin: "#",
            achievement: "Career transition success"
        },
        {
            name: "David Thompson",
            role: "Chief Operating Officer",
            company: "Enterprise Solutions",
            image: "👨‍💻",
            rating: 5,
            text: "The executive templates and strategic wording helped me stand out in C-level applications. The AI suggestions for leadership accomplishments were spot on.",
            category: "executive",
            linkedin: "#",
            achievement: "Executive role landed"
        },
        {
            name: "Emily Parker",
            role: "UX Designer",
            company: "Design Studio",
            image: "👩‍🎨",
            rating: 5,
            text: "Finally a resume builder that understands creative professionals! The templates showcase my portfolio beautifully and the AI helped me articulate design impact.",
            category: "creative",
            linkedin: "#",
            achievement: "Portfolio featured"
        },
        {
            name: "Alex Kumar",
            role: "Data Scientist",
            company: "AI Research Lab",
            image: "👨‍🔬",
            rating: 5,
            text: "The technical templates and AI-powered content made my complex projects understandable to non-technical recruiters. Interview calls tripled!",
            category: "tech",
            linkedin: "#",
            achievement: "Research position secured"
        }
    ];

    const stats = [
        { number: "89%", label: "Get More Interviews" },
        { number: "3+ hrs", label: "Time Saved" },
        { number: "95%", label: "ATS Compatibility" },
        { number: "4.8/5", label: "User Rating" }
    ];

    const companies = ["Google", "Amazon", "Microsoft", "Apple", "Meta", "Netflix"];

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) =>
            prev === testimonials.length - 1 ? 0 : prev + 1
        );
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) =>
            prev === 0 ? testimonials.length - 1 : prev - 1
        );
    };

    const goToTestimonial = (index) => {
        setCurrentTestimonial(index);
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'tech': return <MdBusinessCenter />;
            case 'graduate': return <MdSchool />;
            case 'career-change': return <MdWork />;
            default: return <MdBusinessCenter />;
        }
    };

    const navigate = useNavigate();
    const getStartedHandler = () => {
        navigate("/register")
    }
    return (
        <section className={classes.testimonials} id="testimonials">
            <div className={classes.container}>
                {/* Header Section */}
                <div className={classes.header}>
                    <h2 className={classes.sectionTitle}>Success Stories</h2>
                    <p className={classes.sectionSubtitle}>
                        Join thousands of professionals who transformed their careers with our AI Resume Builder
                    </p>
                </div>

                {/* Stats Section */}
                <div className={classes.statsGrid}>
                    {stats.map((stat, index) => (
                        <div key={index} className={classes.statItem}>
                            <div className={classes.statNumber}>{stat.number}</div>
                            <div className={classes.statLabel}>{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Main Testimonial Carousel */}
                <div className={classes.carousel}>
                    <div className={classes.carouselContainer}>
                        <button
                            className={classes.carouselButton}
                            onClick={prevTestimonial}
                            aria-label="Previous testimonial"
                        >
                            <FaArrowLeft />
                        </button>

                        <div className={classes.testimonialActive}>
                            <div className={classes.quoteIcon}>
                                <FaQuoteLeft />
                            </div>

                            <div className={classes.testimonialContent}>
                                <div className={classes.rating}>
                                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                        <FaStar key={i} className={classes.star} />
                                    ))}
                                </div>

                                <blockquote className={classes.quote}>
                                    "{testimonials[currentTestimonial].text}"
                                </blockquote>

                                <div className={classes.author}>
                                    <div className={classes.authorImage}>
                                        {testimonials[currentTestimonial].image}
                                    </div>
                                    <div className={classes.authorInfo}>
                                        <h4 className={classes.authorName}>
                                            {testimonials[currentTestimonial].name}
                                        </h4>
                                        <p className={classes.authorRole}>
                                            {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                                        </p>
                                        <div className={classes.achievement}>
                                            {getCategoryIcon(testimonials[currentTestimonial].category)}
                                            <span>{testimonials[currentTestimonial].achievement}</span>
                                        </div>
                                    </div>
                                    <a
                                        href={testimonials[currentTestimonial].linkedin}
                                        className={classes.linkedinLink}
                                        aria-label={`Connect with ${testimonials[currentTestimonial].name} on LinkedIn`}
                                    >
                                        <FaLinkedin />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <button
                            className={classes.carouselButton}
                            onClick={nextTestimonial}
                            aria-label="Next testimonial"
                        >
                            <FaArrowRight />
                        </button>
                    </div>

                    {/* Carousel Indicators */}
                    <div className={classes.carouselIndicators}>
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                className={`${classes.indicator} ${index === currentTestimonial ? classes.active : ''}`}
                                onClick={() => goToTestimonial(index)}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Additional Testimonials Grid */}
                <div className={classes.testimonialsGrid}>
                    <h3 className={classes.gridTitle}>More Success Stories</h3>
                    <div className={classes.grid}>
                        {testimonials.slice(0, 3).map((testimonial, index) => (
                            <div key={index} className={classes.testimonialCard}>
                                <div className={classes.cardHeader}>
                                    <div className={classes.cardImage}>
                                        {testimonial.image}
                                    </div>
                                    <div>
                                        <h4 className={classes.cardName}>{testimonial.name}</h4>
                                        <p className={classes.cardRole}>{testimonial.role}</p>
                                    </div>
                                </div>
                                <div className={classes.cardRating}>
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <FaStar key={i} className={classes.star} />
                                    ))}
                                </div>
                                <p className={classes.cardText}>"{testimonial.text.substring(0, 120)}..."</p>
                                <div className={classes.cardAchievement}>
                                    {getCategoryIcon(testimonial.category)}
                                    <span>{testimonial.achievement}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trusted By Section */}
                <div className={classes.trustedBy}>
                    <h3 className={classes.trustedTitle}>Trusted by Professionals At</h3>
                    <div className={classes.companiesGrid}>
                        {companies.map((company, index) => (
                            <div key={index} className={classes.companyLogo}>
                                {company}
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className={classes.ctaSection}>
                    <h3>Ready to Write Your Success Story?</h3>
                    <p>Join thousands of professionals who landed their dream jobs with our AI Resume Builder</p>
                    <button className={classes.ctaButton} onClick={getStartedHandler}>
                        Start Building Your Resume
                    </button>
                    <p className={classes.ctaNote}>Free forever • No credit card required</p>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;