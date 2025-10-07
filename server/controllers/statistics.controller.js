const Resume = require("../models/resume.model");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");

exports.getUserStatistics = async (req, res) => {
    try {
        const userId = req.user._id;
        

        // Find resumes belonging to the logged-in user
        const userResume = await Resume.find({ user: userId });

        console.log(userResume);

        if (!userResume.length) {
            throw new ApiError(404, "No resumes found for this user");
        }

        const totalResume = userResume.length;

        // Templates usage
        const templateUsage = {};
        userResume.forEach(resume => {
            const template = resume?.selectedTemplate || "Unknown";
            templateUsage[template] = (templateUsage[template] || 0) + 1;
        });

        // Section coverage
        const sectionCoverage = {
            summary: 0,
            education: 0,
            experience: 0,
            skills: 0,
            projects: 0,
            certification: 0,
        };

        userResume.forEach(resume => {
            if (resume?.summary?.length) sectionCoverage.summary++;
            if (resume?.education?.length) sectionCoverage.education++;
            if (resume?.experience?.length) sectionCoverage.experience++;
            if (resume?.skills?.length) sectionCoverage.skills++;
            if (resume?.projects?.length) sectionCoverage.projects++;
            if (resume?.certification?.length) sectionCoverage.certification++;
        });

        // Skills distribution
        let allSkills = [];
        userResume.forEach(resume => {
            if (resume?.skills?.length) {
                allSkills = [...allSkills, ...resume.skills];
            }
        });

        const uniqueSkills = [...new Set(allSkills)];

        // Activity timeline
        const activity = userResume.map(resume => ({
            id: resume._id,
            createdAt: resume.createdAt,
            updatedAt: resume.updatedAt,
        }));

        res.status(200).json(
            new ApiResponse(
                200,
                {
                    totalResume,
                    templateUsage,
                    sectionCoverage,
                    uniqueSkills: uniqueSkills.length,
                    allSkills,
                    activity,
                },
                "User data evaluated successfully"
            )
        );
    } catch (error) {
        return res.status(error?.statusCode || 500).json(
            new ApiResponse(
                error?.statusCode || 500,
                "",
                error?.message || "Could not evaluate the user resume data"
            )
        );
    }
};