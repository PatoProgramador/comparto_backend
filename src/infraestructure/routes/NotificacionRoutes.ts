import { Router } from "express";
import { NotificacionController } from "../controller/NotificacionController";
import { NotificacionApplicationService } from "../../application/NotificacionApplicationService";
import { NotificacionAdapter } from "../adapter/NotificacionAdapter";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

const notificacionAdapter = new NotificacionAdapter();
const notificacionApplicationService = new NotificacionApplicationService(
  notificacionAdapter
);
const notificacionController = new NotificacionController(
  notificacionApplicationService
);

router.post("/", authenticateToken, (req, res) =>
  notificacionController.createNotificacion(req, res)
);
router.get("/:id", authenticateToken, (req, res) =>
  notificacionController.getNotificacionById(req, res)
);
router.put("/:id", authenticateToken, (req, res) =>
  notificacionController.updateNotificacion(req, res)
);
router.delete("/:id", authenticateToken, (req, res) =>
  notificacionController.deleteNotificacion(req, res)
);

export default router;
