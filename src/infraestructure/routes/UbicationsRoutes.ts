import { Router } from "express";
import { UbicationsAdapter } from "../adapter/UbicationsAdapter";
import { UbicationsApplicationService } from "../../application/UbicationsApplicationService";
import { UbicationsController } from "../controller/UbicationsController";


const router = Router();

const ubicationsAdapter = new UbicationsAdapter();
const ubicationsAppService = new UbicationsApplicationService(ubicationsAdapter);
const ubicationsController = new UbicationsController(ubicationsAppService);

router.post("/" , async (req, res) => {
    try {
        await ubicationsController.createUbication(req, res);
    } catch (error) {
        res.status(400).json({
            message: "Error creating ubication",
            error
        });
    }
});
router.get("/:id", async (req, res) => {
    try {
        await ubicationsController.getUbicationById(req, res);
    } catch (error) {
        res.status(400).json({
            message: "Error fetching ubication by ID",
            error
        });
    }
});
router.get("/name/:nombre", async (req, res) => {
    try {
        await ubicationsController.getUbicationByName(req, res);
    } catch (error) {
        res.status(400).json({
            message: "Error fetching ubication by name",
            error
        });
    }
});
router.get("/", async (req, res) => {
    try {
        await ubicationsController.getAllUbications(req, res);
    } catch (error) {
        res.status(400).json({
            message: "Error fetching all ubications",
            error
        });
    }
});
router.patch("/:id", async (req, res) => {
    try {
        await ubicationsController.updateUbication(req, res);
    } catch (error) {
        res.status(400).json({
            message: "Error updating ubication",
            error
        });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        await ubicationsController.deleteUbication(req, res);
    } catch (error) {
        res.status(400).json({
            message: "Error deleting ubication",
            error
        });
    }
});

export default router;