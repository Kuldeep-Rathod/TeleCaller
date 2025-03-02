import fetch from "node-fetch";
import { GOOGLE_SCRIPT_URL } from "../config/envConfig.js";

export const updateGoogleSheet = async (requestData) => {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
    });

    if (!response.ok) throw new Error("Failed to update Google Sheet.");

    return await response.json();
};
