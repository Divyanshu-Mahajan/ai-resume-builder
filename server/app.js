const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/index.js");
dotenv.config({
    path: "./.env"
})

const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const userRoutes = require("./routes/user.routes.js");
const resumeRoutes = require("./routes/resume.routes.js");
const aiRoutes = require("./routes/ai.routes.js");
const statisticsRoutes = require("./routes/statistics.routes.js");
const suggestionsRoutes = require("./routes/suggestions.routes.js");

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/resumes", resumeRoutes);
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/statistics", statisticsRoutes);
app.use("/api/v1/suggestions", suggestionsRoutes);


const PORT = process.env.PORT || 8080;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}).catch(err => {
    console.log("Server connection error", err);
})


