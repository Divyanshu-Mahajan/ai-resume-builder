const mongoose = require("mongoose");


const resumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Every resume belongs to a user
        required: true,
        index: true
    },
    personalInfo: {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
        },
        phone: {
            type: String,
            required: true,
            trim: true,
            match: [/^\+?[0-9]{7,15}$/, "Invalid phone number"]
        },
        address: {
            type: String,
            trim: true
        },
        linkedin: {
            type: String,
            trim: true,
            default: ""
        },
        github: {
            type: String,
            trim: true,
            default: ""
        }
    },

    summary: {
        type: String,
        trim: true
    },

    education: {
        type: [
            {
                degree: {
                    type: String,
                    trim: true
                },
                institution: {
                    type: String,
                    trim: true
                },
                startDate: {
                    type: String,
                    trim: true
                },
                endDate: {
                    type: String,
                    trim: true
                },
                grade: {
                    type: String,
                    trim: true
                },
                descriptions: [
                    {
                        type: String,
                        trim: true
                    }
                ]
            }
        ],
        default: []
    },

    experience: {
        type: [
            {
                jobTitle: {
                    type: String,
                    trim: true
                },
                company: {
                    type: String,
                    trim: true
                },
                startDate: {
                    type: String,
                    trim: true
                },
                endDate: {
                    type: String,
                    trim: true
                },
                location: {
                    type: String,
                    trim: true
                },
                responsibilities: [
                    {
                        type: String,
                        trim: true
                    }
                ]
            }
        ],
        default: []
    },

    skills: {
        type: [String],
        default: []
    },

    projects: {
        type: [
            {
                projectTitle: {
                    type: String,
                    trim: true
                },
                technologies: {
                    type: String,
                    trim: true
                },
                descriptions: [
                    {
                        type: String,
                        trim: true
                    }
                ],
                url: {
                    type: String,
                    trim: true,
                    default: ""
                }
            }
        ],
        default: []
    },

    certification: {
        type: [
            {
                title: {
                    type: String,
                    trim: true
                },
                issuer: {
                    type: String,
                    trim: true
                },
                date: {
                    type: String,
                    trim: true
                },
                url: {
                    type: String,
                    trim: true,
                    default: ""
                }
            }
        ],
        default: []
    },

    selectedTemplate: {
        type: String,
        trim: true
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("Resume", resumeSchema);