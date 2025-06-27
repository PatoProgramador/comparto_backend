import { Router } from "express";
import { UserAdapter } from "../adapter/UserAdapter";
import { UserApplicationService } from "../../application/UserApplicationService";
import { UserController } from "../controller/UserController";
import { authenticateToken } from "../middleware/authMiddleware";
import { NotificacionController } from "../controller/NotificacionController";
import { NotificacionApplicationService } from "../../application/NotificacionApplicationService";
import { NotificacionAdapter } from "../adapter/NotificacionAdapter";

const router = Router();

const userAdapter = new UserAdapter();
const userAppServise = new UserApplicationService(userAdapter);
const userController = new UserController(userAppServise);
const notificacionAdapter = new NotificacionAdapter();
const notificacionApplicationService = new NotificacionApplicationService(
  notificacionAdapter
);
const notificacionController = new NotificacionController(
  notificacionApplicationService
);

router.get("/users", async (req, res) => {
  try {
    await userController.getAllUsers(req, res);
  } catch (error) {
    res.status(400).json({
      message: "Error fetching users",
      error,
    });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    await userController.getUserById(req, res);
  } catch (error) {
    res.status(400).json({
      message: "Error fetching user by ID",
      error,
    });
  }
});

router.get("/:idUsuario/notificaciones", authenticateToken, (req, res) =>
  notificacionController.getNotificacionesByUserId(req, res)
);

router.patch("/users/:id", async (req, res) => {
  try {
    await userController.updateUser(req, res);
  } catch (error) {
    res.status(400).json({
      message: "Error fetching user by ID",
      error,
    });
  }
});

router.delete("/user/:id", async (req, res) => {
  try {
    await userController.deleteUser(req, res);
  } catch (error) {
    res.status(400).json({
      message: "Error deleting user",
      error,
    });
  }
});

export default router;
