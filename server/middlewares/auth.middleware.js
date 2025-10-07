const jwt = require("jsonwebtoken");
const { ApiError } = require("../utils/ApiError");
const User = require("../models/user.model.js");


const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken
            || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401,"Unauthorized token")
        }

        //If token existed then decode with the secret key

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        //DecodedToken exists then we have to find user in DB using id beacuse while creating we have allready pass id in th payload

        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        )//This id comes with payload of token.

        if (!user) {
            throw new ApiError(401, "Invalid access token")
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
}

module.exports = { verifyJWT }