import { Router } from "express";
import { UserAdapter } from "../adapter/UserAdapter";
import { UserApplicationService } from "../../application/UserApplicationService";
import { UserController } from "../controller/UserController";

const router =Router();

const userAdapter = new UserAdapter();
const userAppServise = new UserApplicationService(userAdapter);
const userController = new UserController(userAppServise);

router.get("/users",async (req, res)=>{
  try {
    await userController.getAllUsers(req,res);
  } catch (error) {
    res.status(400).json({
      message: "Error fetching users",
      error
    });
  }
});

router.get("/users/:id", async(req,res) =>{
  try{
    await userController.getUserById(req,res);
  } catch (error) {
    res.status(400).json({
      message: "Error fetching user by ID",
      error
    });
  }
});

router.patch("/users/:id", async(req,res) =>{
  try{
    await userController.updateUser(req,res);
  } catch (error) {
    res.status(400).json({
      message: "Error fetching user by ID",
      error
    });
  }
});

router.delete("/user/:id", async(req, res) =>{
  try {
    await userController.deleteUser(req, res);
  } catch (error) {
    res.status(400).json({
      message: "Error deleting user",
      error
    });
  }
});

export default router;
