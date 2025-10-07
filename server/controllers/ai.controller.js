const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");


exports.generateSummary = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || !text.trim()) {
            throw new ApiError(
                400,
                "Text is required"
            )
        }

        const response = await fetch("https://api.cohere.ai/v1/chat", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${process.env.COHERE_API_KEY}`
            },
            body: JSON.stringify({
                model: "command-xlarge-nightly",
                message: `Summarize this text for a resume in 2-3 lines:\n\n${text}`
            })
        })

        const data = await response.json();

        const textData = data?.text;
        res.status(200).json(
            new ApiResponse(
                200,
                { textData },
                "AI generate summary successfully"
            )
        )

    } catch (error) {
        res.status(error?.statusCode || 500).json(
            new ApiResponse(
                error?.statusCode || 500,
                "",
                error?.message || "AI summary generation failed"
            )
        )
    }
}

//AI generate Education description for the education section
exports.generateStudentDescription = async (req, res) => {
    try {
        const { degree, institution } = req.body;

        if (!degree || !institution) {
            throw new ApiError(400, "Degree and institution name required")
        }

        const prompt = `Generate 3-4 concise bullet points describing a student's academic experience while pursuing a ${degree} at ${institution}.
        Each bullet should highlight achievements, key coursework, academic projects, or extracurricular activities relevant to the degree.
        Keep the tone professional and suitable for inclusion in a resume.`

        const response = await fetch("https://api.cohere.ai/v1/chat", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${process.env.COHERE_API_KEY}`
            },
            body: JSON.stringify({
                model: "command-xlarge-nightly",
                message: prompt
            })
        })

        const data = await response.json();
        const text = data?.text

        const bullets = text
            .split(/\n|•|-/)
            .filter(line => /^[\*\-•]/.test(line.trim()))
            .map(line => line.replace(/^[\*\-•]+\s*/, "").trim())
            .slice(0, 6);

        res.status(200).json(
            new ApiResponse(
                200,
                bullets,
                "AI generates education description successfully"
            )
        )
    } catch (error) {
        res.status(error.statusCode || 500).json(
            new ApiResponse(
                error.statusCode || 500,
                "",
                error.message || "AI failed to generate education description"
            )
        )
    }
}
exports.generateCompanyResponsibility = async (req, res) => {
    try {
        const { jobTitle, company } = req.body;

        if (!jobTitle || !company) {
            throw new ApiError(400, "Job Title and Company are required");
        }

        const prompt = `
        Generate 5-6 concise and impactful resume bullet points for a ${jobTitle} at ${company}.
        Each bullet point should start with a strong action verb and focus on results, achievements, or technologies used.
        `;

        const response = await fetch("https://api.cohere.ai/v1/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.COHERE_API_KEY}`
            },
            body: JSON.stringify({
                model: "command-xlarge-nightly",
                message: prompt
            })
        });

        const data = await response.json();
        const text = data?.text || "";

        const bullets = text
            .split(/\n|•|-/)
            .filter(line => /^[\*\-•]/.test(line.trim()))
            .map(line => line.replace(/^[\*\-•]+\s*/, "").trim())
            .slice(0, 6); // take only first 5-6 bullets


        res.status(200).json(
            new ApiResponse(
                200,
                bullets,
                "AI generated job responsibilities successfully"
            )
        );

    } catch (error) {
        res.status(error?.statusCode || 500).json(
            new ApiResponse(
                error?.statusCode || 500,
                "",
                error?.message || "AI failed to generate job responsibilities"
            )
        );
    }
}

//AI generate the project description

exports.generateProjectDescription = async (req, res) => {
    try {
        const { projectTitle, technologies } = req.body;

        if (!projectTitle || !technologies) {
            throw new ApiError(400, "Project Title and Technologies are required")
        }

        const prompt = `Generate 4–5 concise and impactful bullet points describing a project titled "${projectTitle}" that uses technologies such as ${technologies}.
        Each bullet point should:
      - Start with a strong action verb.
      - Emphasize contributions, problem-solving, technical implementations, and measurable outcomes.
      - Be professional, suitable for inclusion in a resume.
        Avoid repetition and unnecessary filler words.`

        const response = await fetch("https://api.cohere.ai/v1/chat", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${process.env.COHERE_API_KEY}`
            },
            body: JSON.stringify({
                model: "command-xlarge-nightly",
                message: prompt
            })
        })

        const data = await response.json();
        const text = data?.text || ""
    

        const bullets = text
            .split(/\n|•|-/)
            .filter(line => /^[\*\-•]/.test(line.trim()))
            .map(line => line.replace(/^[\*\-•]+\s*/, "").trim())
            .slice(0, 6)

        res.status(200).json(
            new ApiResponse(
                200,
                bullets,
                "AI generates project description successfully"
            )
        )
    } catch (error) {
        res.status(error.statusCode || 500).json(
            new ApiResponse(
                error.statusCode || 500,
                "",
                error.message || "AI failed to generate the project description"
            )
        )
    }
}