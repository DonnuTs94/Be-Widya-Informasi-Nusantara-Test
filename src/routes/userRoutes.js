import { Router } from "express"
import userController from "../controllers/userController.js"
import {
  validateLogin,
  validateUserRegister,
} from "../middlewares/userValidationMiddleware.js"
import validateToken from "../middlewares/authMiddleware.js"

const router = Router()

router.post("/register", validateUserRegister, userController.register)
router.post("/login", validateLogin, userController.login)
router.get("/profile", validateToken, userController.userProfile)

export default router
