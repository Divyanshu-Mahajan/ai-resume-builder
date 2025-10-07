const Resume = require("../models/resume.model");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");


exports.getUserSuggestions = async (req, res) => {
    try {
        const userId = req.user._id;

        //If user id not exist it means access token expired
        if (!userId) {
            throw new ApiError(401, "Unauthorized Access");
        }

        //Find user resume from the resume collection
        const userResume = await Resume.find({ user: userId });

        if (!userResume) {
            throw new ApiError(404, "No resume found of logged in user");
        }

        //Extract useful info
        const totalResume = userResume.length;

        let allSkills = [];
        userResume.forEach(resume => {
            allSkills = [...allSkills, ...resume.skills];
        })

        const uniqueSkills = [...new Set(allSkills)];

        const sectionCoverage = {
            summary: userResume.filter(resume => resume?.summary?.length).length,
            education: userResume.filter(resume => resume?.education?.length).length,
            experience: userResume.filter(resume => resume?.experience?.length).length,
            projects: userResume.filter(resume => resume?.projects?.length).length,
            certification: userResume.filter(resume => resume?.certification?.length).length
        }

        //Prepare text for AI

        const prompt = `
        You are an expert career coach. Based on this user's resume stats, give personalized improvement suggestions.

        Total resumes : ${totalResume}
        Unique Skills : ${uniqueSkills.length}
        All Skills : ${allSkills.join(", ")}
        Section Coverage : ${JSON.stringify(sectionCoverage, null, 2)}


        Give clear, actionable feedback in 4-6 bullet points.
        `

        //Api call

        const AIResponse = await fetch("https://api.cohere.ai/v1/generate", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${process.env.COHERE_API_KEY}`
            },
            body: JSON.stringify({
                model: "command-xlarge-nightly",
                prompt: prompt,
                max_tokens: 200,
                temperature: 0.7,
            })
        })

        const AIData = await AIResponse.json();
        const aiText = AIData?.generations?.[0]?.text || "No suggestions generated";

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    aiText,
                    "AI Suggestion generted successfully"
                )
            )
    } catch (error) {
        return res
            .status(error?.statusCode || 500)
            .json(
                new ApiResponse(
                    error?.statusCode || 500,
                    "",
                    error?.message || "AI failed to generate suggestion"
                )
            )
    }
}