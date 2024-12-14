import { Router } from "express"
import { validateFileUpload } from "../middlewares/uploaderMiddleware.js"
import validateToken from "../middlewares/authMiddleware.js"
import productController from "../controllers/productController.js"
import { FILE_PREFIX, FILE_TYPES, PATH, SIZE_3MB } from "../constants/upload.js"
import { validateCreateProduct } from "../middlewares/productValidationMiddleware.js"

const router = Router()

router.post(
  "/",
  validateFileUpload({
    path: PATH,
    fileTypes: FILE_TYPES,
    filePrefix: FILE_PREFIX,
    imgSize: SIZE_3MB,
  }),
  validateCreateProduct,
  validateToken,
  productController.createProduct
)
export default router
