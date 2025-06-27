import { Router } from "express";
import { DonacionController } from "../controller/DonacionController";
import { DonacionApplicationService } from "../../application/DonacionApplicationService";
import { DonacionAdapter } from "../adapter/DonacionAdapter";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

const donacionAdapter = new DonacionAdapter();
const donacionApplicationService = new DonacionApplicationService(
  donacionAdapter
);
const donacionController = new DonacionController(donacionApplicationService);

router.post("/", authenticateToken, (req, res) =>
  donacionController.createDonacion(req, res)
);
router.get("/", (req, res) => donacionController.getAllDonaciones(req, res));
router.get("/:id", (req, res) => donacionController.getDonacionById(req, res));
router.put("/:id", authenticateToken, (req, res) =>
  donacionController.updateDonacion(req, res)
);
router.delete("/:id", authenticateToken, (req, res) =>
  donacionController.deleteDonacion(req, res)
);

export default router;
