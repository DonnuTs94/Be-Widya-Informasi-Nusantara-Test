import { Router } from "express"
import userRouter from "./routes/userRoutes.js"
import productRouter from "./routes/productRoutes.js"

const router = Router()

router.use("/user", userRouter)
router.use("/product", productRouter)

export default router
