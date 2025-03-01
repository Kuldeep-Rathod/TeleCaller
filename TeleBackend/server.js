import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const googleScriptURL = process.env.GOOGLE_SCRIPT_URL;
const port = process.env.PORT || 4000; // Default to 4000 if PORT is not set

// Health check route to test if the server is running
app.get("/", (req, res) => {
    res.send("Backend is running! 🚀");
});

app.post("/proxy", async (req, res) => {
    try {
        console.log("Received request:", req.body);

        const response = await fetch(googleScriptURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body),
        });

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            const text = await response.text();
            console.error("Google Script returned non-JSON response:", text);
            return res.status(500).json({
                success: false,
                error: "Invalid response from Google Script.",
            });
        }

        const data = await response.json();
        console.log("Google Sheet Response:", data);
        res.json(data);
    } catch (error) {
        console.error("Error in proxy:", error);
        res.status(500).json({
            success: false,
            error: "Failed to update Google Sheet.",
        });
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
