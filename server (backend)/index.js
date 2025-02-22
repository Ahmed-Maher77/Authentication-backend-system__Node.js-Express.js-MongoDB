const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const connectDB = require('./config/dbConnect');
const corsOptions = require('./config/corsConfig');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3002;
console.log('mode: ' + process.env.NODE_ENV);

// Middleware
app.use(cors(corsOptions)); // Apply CORS
app.use(cookieParser()); // Parse cookies
app.use(express.json());  // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded data



// ============================= Route Handlers =============================
// Static Files
app.use("/", express.static(path.join(__dirname, "public")));
// Routes
app.use("/", require("./routes/root"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/users", require("./routes/userRoutes"));
// Not Found
app.all("*", (req, res)=> {
    res.status(404);
    if (req.accepts("json")) {
        res.json({ message: "404 Not Found" });
    } else {
        res.type("text/plain").send("404 Not Found");
    }
})



// Connect to Database and Start Server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`✅ Server is running on port => ${PORT}`);
    });
}).catch(err => console.error("❌ Database connection failed:", err));