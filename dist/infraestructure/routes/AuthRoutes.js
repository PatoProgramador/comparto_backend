"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controller/AuthController");
const router = (0, express_1.Router)();
router.post("/login", async (requestAnimationFrame, res) => {
    try {
        await AuthController_1.AuthController.login(requestAnimationFrame, res);
    }
    catch (error) {
        res.status(400).json({
            message: "Authentication failed",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
});
router.post('/register', async (requestAnimationFrame, res) => {
    try {
        await AuthController_1.AuthController.register(requestAnimationFrame, res);
    }
    catch (error) {
        res.status(400).json({
            message: "Error creating user",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
});
exports.default = router;
