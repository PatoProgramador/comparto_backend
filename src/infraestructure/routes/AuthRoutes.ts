import { Router } from 'express';
import { AuthController } from '../controller/AuthController';

const router = Router();

router.post("/login", async (requestAnimationFrame, res) =>{
  try{
    await AuthController.login(requestAnimationFrame, res);
  } catch (error) {
    res.status(400).json({
      message: "Authentication failed",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

// router.post('/register', AuthController.register);

export default router;
