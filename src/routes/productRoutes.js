import { Router } from "express"
import { validateFileUpload } from "../middlewares/uploaderMiddleware.js"
import validateToken from "../middlewares/authMiddleware.js"
import productController from "../controllers/productController.js"
import { FILE_PREFIX, FILE_TYPES, PATH, SIZE_3MB } from "../constants/upload.js"
import {
  validateCreateProduct,
  validateUpdateProduct,
} from "../middlewares/productValidationMiddleware.js"
import { verifyOwnerProduct } from "../middlewares/productMiddleware.js"

const router = Router()

router.get("/", validateToken, productController.getAllProduct)
router.get(
  "/:id",
  validateToken,
  verifyOwnerProduct,
  productController.getDetailProduct
)

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

router.put(
  "/:id",
  validateUpdateProduct,
  validateToken,
  verifyOwnerProduct,
  productController.updateProductData
)

router.put(
  "/:id/delete",
  validateToken,
  verifyOwnerProduct,
  productController.softDelete
)

router.put(
  "/:id/image",
  validateFileUpload({
    path: PATH,
    fileTypes: FILE_TYPES,
    filePrefix: FILE_PREFIX,
    imgSize: SIZE_3MB,
  }),
  validateToken,
  verifyOwnerProduct,
  productController.updateImage
)

export default router
