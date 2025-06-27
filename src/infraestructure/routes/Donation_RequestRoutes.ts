import {Router} from "express";
import { Donation_RequestAdapter } from "../adapter/Donation_RequestAdapter";
import {Donation_RequestController} from "../controller/Donation_RequestController";
import { DonationRequestApplicationService } from "../../application/Donation_RequestAplicationService";


const router = Router();

const donationrequestAdapter = new Donation_RequestAdapter();
const donationappService = new DonationRequestApplicationService(donationrequestAdapter);
const donationrequestController = new Donation_RequestController(donationappService);

router.get("/", async (req, res ) =>{
    try{
        await donationrequestController.getAllDonationRequests(req, res);
    }catch(error){
        res.status(400).json({
            message: "Error fetching donations requests",
            error
        });
    }
});

router.get("/id", async (req, res ) =>{
    try{
        await donationrequestController.getDonationRequestById(req, res);
    }catch(error){
        res.status(400).json({
            message: "Error fetching donations requests",
            error
        });
    }
});
router.get("/donador/:id_donacion", async (req, res ) =>{
    try{
        await donationrequestController.getDonationRequestsByDonorId(req, res);
    }catch(error){
        res.status(400).json({
            message: "Error fetching donations requests",
            error
        });
    }
});
router.get("/receptor/:id_receptor", async (req, res ) =>{
    try{
        await donationrequestController.getDonationRequestsByReceiverId(req, res);
    }catch(error){
        res.status(400).json({
            message: "Error fetching donations requests",
            error
        });
    }
});

router.patch("/:id_solicitud", async(req,res) =>{
  try{
    await donationrequestController.updateDonationRequest(req,res);
  } catch (error) {
    res.status(400).json({
      message: "Error fetching donation by ID",
      error
    });
  }
});
router.post("/", async(req, res) =>{
  try {
    await donationrequestController.createDonationRequest(req, res);
  } catch (error) {
    res.status(400).json({
      message: "Error creating donation request",
      error
    });
  }
});

router.delete("/:id_solicitud", async(req, res) =>{
  try {
    await donationrequestController.deleteDonationRequest(req, res);
  } catch (error) {
    res.status(400).json({
      message: "Error deleting user",
      error
    });
  }
});

export default router;
