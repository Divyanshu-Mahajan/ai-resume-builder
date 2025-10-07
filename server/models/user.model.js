const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    refreshToken: {
        type: String
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpiry : {
        type : Date
    }
}, { timestamps: true })


userSchema.pre("save", async function (next) { // This middleware run just before storing the data in the DB.

    // Check if the password is not modified or same
    if (!this.isModified("password")) return next();

    // Hashing Password
    this.password = await bcrypt.hash(this.password, 12); // encrypted password
    next(); // run next middleware
})

userSchema.methods.isPasswordCorrected = async function (password) {

    // Compare method compare the user entered password and password stored in the database.
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.resetPassword = function () {

    //Generate token 
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex")

    this.resetPasswordExpiry = Date.now() + 10 * 60 * 1000;

    return resetToken; // plain text (to send in email)
}

module.exports = mongoose.model("User", userSchema);