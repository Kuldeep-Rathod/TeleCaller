import { updateGoogleSheet } from "../services/googleSheetService.js";

export const handleProxyRequest = async (req, res) => {
    try {
        console.log("Received request:", req.body);
        const data = await updateGoogleSheet(req.body);
        res.json(data);
    } catch (error) {
        console.error("Error in proxy:", error);
        res.status(500).json({ success: false, error: "Failed to update Google Sheet." });
    }
};
