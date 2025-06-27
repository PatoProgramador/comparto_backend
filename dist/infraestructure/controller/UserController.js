"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    constructor(app) {
        this.app = app;
    }
    async getUserById(req, res) {
        try {
            const id = req.params.id;
            if (!id)
                return res.status(400).json({ message: "El id debe ser un numero invalido" });
            const user = await this.app.getUserById(id);
            if (!user)
                return res.status(404).json({ message: "User not found" });
            return res.status(200).json(user);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: "Error interno del Servidor",
                    details: error.message,
                });
            }
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async getAllUsers(req, res) {
        try {
            const users = await this.app.getAllUsers();
            return res.status(200).json(users);
        }
        catch (error) {
            return res.status(500)
                .json({ message: "Internal Server Error" });
        }
    }
    async deleteUser(req, res) {
        try {
            const id = req.params.id;
            if (!id)
                return res.status(400)
                    .json({ message: "El id debe ser un numero invalido" });
            const deleted = await this.app.deleteUser(id);
            if (!deleted) {
                return res.status(404)
                    .json({ message: "User not found" });
            }
            return res.status(200).json({ message: "User deleted successfully" });
        }
        catch (error) {
            return res.status(500)
                .json({ message: "Error al dar de baja el usuario", });
        }
    }
    async updateUser(req, res) {
        try {
            const id = req.params.id;
            if (!id)
                return res.status(400).json({ message: "El id es obligatorio." });
            const { nombre, apellido, email, telefono, direccion, ciudad, departamento, tipo_usuario, fecha_registro, activo, } = req.body;
            if (nombre && !/^[a-zA-Z\s]{3,}$/.test(nombre.trim()))
                return res.status(400).json({ error: "Formato de nombre inválido" });
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
                return res.status(400).json({ error: "Formato de email inválido" });
            if (telefono && !/^[\d+()\s-]{7,}$/.test(telefono.trim()))
                return res.status(400).json({ error: "Formato de teléfono inválido" });
            const updatedUser = {
                nombre,
                apellido,
                email,
                telefono,
                direccion,
                ciudad,
                departamento,
                tipo_usuario,
                fecha_registro: fecha_registro ? new Date(fecha_registro) : undefined,
                activo,
            };
            const updated = await this.app.updateUser(id, updatedUser);
            if (!updated)
                return res.status(404).json({ message: "Usuario no encontrado" });
            return res.status(200).json({ message: "Usuario actualizado correctamente" });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({
                    error: "Error interno del servidor",
                    details: error.message,
                });
            }
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }
}
exports.UserController = UserController;
