"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthApplicationService_1 = require("../../application/AuthApplicationService");
const UserAdapter_1 = require("../adapter/UserAdapter");
class AuthController {
    static async login(req, res) {
        const { username, password } = req.body;
        const user = await this.userAdapter.getUserByEmail(username);
        if (!user)
            return res.status(401).json({ message: 'Usuario no encontrado' });
        const isMatch = await AuthApplicationService_1.AuthService.comparePasswords(password, user.contrasena_hash);
        if (!isMatch)
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        const token = AuthApplicationService_1.AuthService.generateToken(user);
        res.json({ token });
    }
    static async register(req, res) {
        const { user, password } = req.body;
        const hashed = await AuthApplicationService_1.AuthService.hashPassword(password);
        const newUser = await this.userAdapter.createUser(user, hashed);
        res.status(201).json(newUser);
    }
}
exports.AuthController = AuthController;
AuthController.userAdapter = new UserAdapter_1.UserAdapter();
