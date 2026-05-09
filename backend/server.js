const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const compression = require('compression');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(compression()); // Gzip compression

// Global Cache-Control for static assets and API
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    if (req.method === 'GET') {
        res.set('Cache-Control', 'public, max-age=3600'); // 1 hour cache
    }
    next();
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/leads", require("./routes/leadRoutes"));
app.use("/api/content", require("./routes/contentRoutes"));
app.use("/api/recruit", require("./routes/applicationRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));



app.get("/", (req, res) => {
    res.send("Prime Impact Professional API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
