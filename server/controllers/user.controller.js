const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/user.model");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { sendEmail } = require("../utils/SendEmailLink");


//Generate AccessToken and RefreshToken

const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        //Find user in the database
        const user = await User.findById(userId);

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return {
            accessToken,
            refreshToken
        }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access token and refresh token");
    }
}



exports.registerUser = async (req, res) => {

    try {
        const { firstName, lastName, email, password } = req.body;


        // Check feilds are not empty
        if (
            [firstName, email, password].some((inputField) => inputField?.trim() === '')
        ) {
            throw new ApiError(400, "Fill all the input field");
        }

        // Validate all fields

        if (!(email.includes("@") && email.includes("."))) {
            throw new ApiError(400, "Email not valid");
        }

        if (password.length < 8) {
            throw new ApiError(400, "Password must contain 8 character");
        }

        const existedUser = await User.findOne({ email });

        // User already existed
        if (existedUser) {
            throw new ApiError(409, "User have already an account");
        }

        //Create a new user

        const user = await User.create({
            firstName,
            lastName,
            email,
            password
        })

        // Check user is created and remove the password and refreshToken field

        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )

        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering new user");
        }


        return res.status(201).json(
            new ApiResponse(200, createdUser, "User created successfully")
        )
    } catch (error) {
        return res.status(error?.statusCode || 500).json(
            new ApiResponse(error?.statusCode || 500, null, error?.message || "User not created due to server error.")
        )
    }
}

exports.loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        //Check user is existed or registered in the DB with the email

        const user = await User.findOne({ email });

        if (!user) {
            throw new ApiError(404, "Invalid Registered user");
        }

        //If user is registered then check the password

        const isPasswordValid = await user.isPasswordCorrected(password);

        if (!isPasswordValid) {
            throw new ApiError(401, "Password is invalid");
        }

        const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);

        const loggedInUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )

        // Set the token in the cookie

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
            .status(201)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    201,
                    {
                        loggedInUser,
                        accessToken
                    }, "User logged In successfully")
            )
    } catch (error) {
        return res.status(error?.statusCode || 500).json(
            new ApiResponse(error?.statusCode || 500, null, error?.message || "Something went wrong while user login")
        )
    }
}


exports.logoutUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    refreshToken: undefined
                }
            },
            {
                new: true
            }
        )

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(
                new ApiResponse(200, {}, "User logged out successfully")
            )
    } catch (error) {
        return res.status(error?.statusCode || 500).json(
            new ApiResponse(error?.statusCode || 500, null, error?.message || "Something went wrong while user logout.")
        )
    }
}

exports.forgotPassword = async (req, res) => {
    let resetToken;
    let user;
    try {
        const { email } = req.body;

        //Find user by email
        user = await User.findOne({ email });

        //If user not found in the database
        if (!user) {
            throw new ApiError(404, "Invalid email, Please enster valid email");
        }

        resetToken = user.resetPassword();
        await user.save({ validateBeforeSave: true });

        // const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/users/reset-password/${resetToken}`;

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`
        const info = await sendEmail({
            to: user.email,
            subject: "Password Reset Link",
            text: `You requested a password reset. Click the link to reset: ${resetUrl}`,
            html: `<p>You requested a password reset.</p>
                   <p>Click the link to reset your password:</p>
                   <a href="${resetUrl}">${resetUrl}</a>`
        })

        console.log(resetUrl);

        res.status(200).json(
            new ApiResponse(
                200,
                info,
                "Password reset link sent to your email"
            )
        )
    } catch (error) {

        // Clear reset token if there was an error
        if (user && resetToken) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpiry = undefined;
            await user.save({ validateBeforeSave: false });
        }


        return res.status(error?.statusCode || 500).json(
            new ApiResponse(
                error.statusCode || 500,
                resetToken,
                error?.message || "Could not send email link"
            )
        )
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password, confirmPassword } = req.body;

        if (!password || !confirmPassword) {
            throw new ApiError(400, "Please all password fields");
        }

        if (password !== confirmPassword) {
            throw new ApiError(400, "Password do not match");
        }

        //Hash the token to compare with DB

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        //Find user with the help of resetPasswordToken

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpiry: { $gt: Date.now() }
        })

        if (!user) {
            throw new ApiError(404, "Invalid or expired link");
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;

        await user.save();

        res.status(201).json(
            new ApiResponse(
                201,
                { email: user.email },
                "Password changed successfully"
            )
        )
    } catch (error) {
        return res.status(error.statusCode || 500).json(
            new ApiResponse(
                error.statusCode || 500,
                {},
                error?.message || "Could not change password"
            )
        )
    }
}

exports.generateNewAccessToken = async (req, res) => {
    try {
        //Get the refreshToken from the cookies
        const incomingRefreshToken = req.cookies.refreshToken;

        if (!incomingRefreshToken) {
            throw new ApiError(401, "Invalid refresh token");
        }

        //Decode this token into raw token

        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        if (!decodedToken) {
            throw new ApiError(401, "Refresh Token has been expired");
        }

        //Find the user by _id beacuse this is send as payload in the refreshToken
        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        //Match the token coming from the user and stored in the database
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token doesn't match");
        }

        const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user?._id);

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken,
                        refreshToken
                    },
                    "New Refresh Token generate successfully"
                )
            )

    } catch (error) {
        return res
            .status(error?.statusCode || 500)
            .json(
                new ApiResponse(
                    error?.statusCode || 500,
                    "",
                    "Could not generate new access and refresh token"
                )
            )
    }
}