"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserApplicationService = void 0;
class UserApplicationService {
    constructor(port) {
        this.port = port;
    }
    async createUser(user, contrasena) {
        const existingUser = await this.port.getUserByEmail(user.email);
        if (!existingUser) {
            return this.port.createUser(user, contrasena);
        }
        throw new Error("User already exists");
    }
    async getUserById(id) {
        return await this.port.getUserById(id);
    }
    async getUserByEmail(email) {
        return await this.port.getUserByEmail(email);
    }
    async getAllUsers() {
        return await this.port.getAllUsers();
    }
    async updateUser(id, user) {
        const existingUser = await this.port.getUserById(id);
        if (!existingUser) {
            throw new Error("User not found");
        }
        if (user.email) {
            const emailTaken = await this.port.getUserByEmail(user.email);
            if (emailTaken && emailTaken.id_usuario !== id) {
                throw new Error("Email already taken");
            }
        }
        return await this.port.updateUser(id, user);
    }
    async deleteUser(id) {
        const existingUser = await this.port.getUserById(id);
        if (!existingUser) {
            throw new Error("User not found");
        }
        const deletedUser = await this.port.deleteUser(id);
        return deletedUser !== null;
    }
}
exports.UserApplicationService = UserApplicationService;
