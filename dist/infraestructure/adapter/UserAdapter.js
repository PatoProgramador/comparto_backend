"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAdapter = void 0;
const User_1 = require("../entities/User");
const data_base_1 = require("../config/data-base");
class UserAdapter {
    constructor() {
        this.userRepository = data_base_1.AppDataSource.getRepository(User_1.User);
    }
    toDomain(user) {
        return {
            id_usuario: user.id_usuario,
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            telefono: user.telefono,
            direccion: user.direccion,
            ciudad: user.ciudad,
            departamento: user.departamento,
            tipo_usuario: user.tipo_usuario,
            fecha_registro: user.fecha_registro,
            activo: user.activo
        };
    }
    toEntity(user, contrasena) {
        const userEntity = new User_1.User();
        userEntity.nombre = user.nombre;
        userEntity.apellido = user.apellido;
        userEntity.email = user.email;
        userEntity.contrasena_hash = contrasena;
        userEntity.telefono = user.telefono;
        userEntity.direccion = user.direccion;
        userEntity.ciudad = user.ciudad;
        userEntity.departamento = user.departamento;
        userEntity.tipo_usuario = user.tipo_usuario;
        userEntity.fecha_registro = new Date();
        userEntity.activo = user.activo;
        return userEntity;
    }
    async createUser(user, contrasena) {
        try {
            const newUser = this.toEntity(user, contrasena);
            const savedUser = await this.userRepository.save(newUser);
            return savedUser.id_usuario;
        }
        catch (error) {
            console.error("Error creating user", error);
            throw new Error("Error creating user");
        }
    }
    async updateUser(id, user) {
        try {
            const existingUser = await this.userRepository.findOne({
                where: { id_usuario: id },
            });
            if (!existingUser)
                return false;
            if (user.nombre !== undefined)
                existingUser.nombre = user.nombre;
            if (user.apellido !== undefined)
                existingUser.apellido = user.apellido;
            if (user.email !== undefined)
                existingUser.email = user.email;
            if (user.telefono !== undefined)
                existingUser.telefono = user.telefono;
            if (user.direccion !== undefined)
                existingUser.direccion = user.direccion;
            if (user.ciudad !== undefined)
                existingUser.ciudad = user.ciudad;
            if (user.departamento !== undefined)
                existingUser.departamento = user.departamento;
            if (user.tipo_usuario !== undefined)
                existingUser.tipo_usuario = user.tipo_usuario;
            if (user.fecha_registro !== undefined)
                existingUser.fecha_registro = user.fecha_registro;
            if (user.activo !== undefined)
                existingUser.activo = user.activo;
            await this.userRepository.save(existingUser);
            return true;
        }
        catch (error) {
            console.error("Error updating user:", error);
            throw new Error("Error updating user");
        }
    }
    async deleteUser(id) {
        try {
            const existingUser = await this.userRepository.findOne({
                where: { id_usuario: id },
            });
            if (!existingUser)
                throw new Error("User not found");
            existingUser.activo = false;
            await this.userRepository.save(existingUser);
            return true;
        }
        catch (error) {
            console.error("Error deleting user:", error);
            throw new Error("Error deleting user");
        }
    }
    async getUserById(id) {
        try {
            const user = await this.userRepository.findOne({
                where: { id_usuario: id },
            });
            return user ? this.toDomain(user) : null;
        }
        catch (error) {
            console.error("Error deleting user:", error);
            throw new Error("Error deleting user");
        }
    }
    async getUserByEmail(email) {
        try {
            const user = await this.userRepository.findOne({ where: { email: email } });
            return user ? user : null;
        }
        catch (error) {
            console.error("Error getting user by email:", error);
            throw new Error("Error getting user by email:");
        }
    }
    async getAllUsers() {
        try {
            const users = await this.userRepository.find();
            return users.map(this.toDomain);
        }
        catch (error) {
            console.error("Error getting all users:", error);
            throw new Error("Error getting all users:");
        }
    }
}
exports.UserAdapter = UserAdapter;
