import dotenv from "dotenv";

dotenv.config();

export const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
export const PORT = process.env.PORT || 4000;
