"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = authenticateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token)
        return res.sendStatus(401);
    try {
        const user = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = user;
        next();
    }
    catch (err) {
        return res.sendStatus(403);
    }
}
