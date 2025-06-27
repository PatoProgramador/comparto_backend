"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
class AuthService {
    static generateToken(user) {
        return jsonwebtoken_1.default.sign({ id: user.id_usuario, username: user.email }, JWT_SECRET, {
            expiresIn: '1d',
        });
    }
    static verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    static async comparePasswords(password, hash) {
        return await bcryptjs_1.default.compare(password, hash);
    }
    static async hashPassword(password) {
        return await bcryptjs_1.default.hash(password, 10);
    }
}
exports.AuthService = AuthService;
