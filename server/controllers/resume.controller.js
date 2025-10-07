const User = require("../models/user.model");
const Resume = require("../models/resume.model");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");

exports.createResume = async (req, res) => {
    try {
        const resume = new Resume({
            user: req.user._id,
            ...req.body
        })

        const savedResume = await resume.save();

        res.status(201).json(
            new ApiResponse(201, savedResume, "Resume saved successfully")
        )
    } catch (error) {
        return res.status(error?.statusCode || 500).json(
            new ApiResponse(
                error?.statusCode || 500,
                {},
                error?.message || "Something went wrong during creating new resume."
            )
        )
    }
}

exports.getAllResumes = async (req, res) => {
    try {
        const allResumes = await Resume.find({ user: req.user._id }).sort({ createdAt: -1 });

        res.status(200).json(
            new ApiResponse(
                200,
                allResumes,
                allResumes.length ? "Fetched all resumes successfully" : "No resume found"
            )
        )

    } catch (error) {
        return res.status(error?.statusCode || 500).json(
            new ApiResponse(
                error?.statusCode || 500,
                {},
                error?.message || "Could not fetch all resumes"
            )
        )
    }
}

exports.getSingleResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            user: req.user._id
        })

        if (!resume) {
            throw new ApiError(404, "Resume not found");
        }

        res.status(200).json(
            new ApiResponse(
                200,
                resume,
                "Resume fetched successfully"
            )
        )

    } catch (error) {
        return res.status(error?.statusCode || 500).json(
            new ApiResponse(
                error?.statusCode || 500,
                {},
                error?.message || "Something went wrong, could not fetch resume"
            )
        )
    }
}

exports.updateResume = async (req, res) => {
    try {
        const updatedResume = await Resume.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user._id
            },
            {
                $set: req.body
            },
            {
                new: true
            }
        )

        if (!updatedResume) {
            throw new ApiError(404, "Resume not found")
        }

        res.status(200).json(
            new ApiResponse(
                200,
                updatedResume,
                "Resume updated successfully"
            )
        )
    } catch (error) {
        return res.status(error?.statusCode || 500).json(
            new ApiResponse(
                error?.statusCode || 500,
                {},
                error?.message || "Something went wrong during resume updating"
            )
        )
    }
}

exports.deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findOneAndDelete(
            {
                _id: req.params.id,
                user: req.user._id
            }
        )

        if (!resume) {
            throw new ApiError(404, "Resume not found")
        }

        res.status(200).json(
            new ApiResponse(
                200,
                resume,
                "Resume deleted successfully"
            )
        )
    } catch (error) {
        return res.status(error?.statusCode || 500).json(
            new ApiResponse(
                error?.statusCode || 500,
                {},
                error?.message || "Something went during resume deletion"
            )
        )
    }
}

exports.deleteAllResume = async (req, res) => {
    try {
        const resumes = await Resume.deleteMany({ user: req.user._id })

        if(resumes.deletedCount === 0){
            throw new ApiError(
                404,
                "No resume found to deleted"
            )
        }

        res.status(200).json(
            new ApiResponse(
                200,
                {deletedCount : resumes.deletedCount},
                `${resumes.deletedCount} resume(s) deleted successfully`
            )
        )
    } catch (error) {
        return res.status(error?.statusCode || 500).json(
            new ApiResponse(
                error?.statusCode || 500,
                {},
                error?.message || "Something went wrong during user's all resume deletion"
            )
        )
    }
}