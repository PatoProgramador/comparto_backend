"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserAdapter_1 = require("../adapter/UserAdapter");
const UserApplicationService_1 = require("../../application/UserApplicationService");
const UserController_1 = require("../controller/UserController");
const router = (0, express_1.Router)();
const userAdapter = new UserAdapter_1.UserAdapter();
const userAppServise = new UserApplicationService_1.UserApplicationService(userAdapter);
const userController = new UserController_1.UserController(userAppServise);
router.get("/users", async (req, res) => {
    try {
        await userController.getAllUsers(req, res);
    }
    catch (error) {
        res.status(400).json({
            message: "Error fetching users",
            error
        });
    }
});
router.get("/users/:id", async (req, res) => {
    try {
        await userController.getUserById(req, res);
    }
    catch (error) {
        res.status(400).json({
            message: "Error fetching user by ID",
            error
        });
    }
});
router.patch("/users/:id", async (req, res) => {
    try {
        await userController.updateUser(req, res);
    }
    catch (error) {
        res.status(400).json({
            message: "Error fetching user by ID",
            error
        });
    }
});
router.delete("/user/:id", async (req, res) => {
    try {
        await userController.deleteUser(req, res);
    }
    catch (error) {
        res.status(400).json({
            message: "Error deleting user",
            error
        });
    }
});
exports.default = router;
