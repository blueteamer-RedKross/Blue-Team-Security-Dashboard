import express from "express";
import UserActivity from "../models/UserActivity.js";

const router = express.Router();

// Get all user activities
router.get("/activities", async (req, res) => {
    try {
        const activities = await UserActivity.find()
            .sort({ createdAt: -1 });

        res.json(activities);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error fetching activities"
        });
    }
});

export default router;