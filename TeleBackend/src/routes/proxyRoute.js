import express from "express";
import { handleProxyRequest } from "../controllers/proxyController.js";

const router = express.Router();

router.post("/", handleProxyRequest);

export default router;
