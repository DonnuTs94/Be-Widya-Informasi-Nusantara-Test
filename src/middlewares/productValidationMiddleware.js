import {
  createProductSchema,
  updateProductSchema,
} from "../validator/productValidator.js"

const validateCreateProduct = (req, res, next) => {
  const { error } = createProductSchema.validate(req.body)
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    })
  }

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Image file is required.",
    })
  }

  next()
}

const validateUpdateProduct = (req, res, next) => {
  const { error } = updateProductSchema.validate(req.body)
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    })
  }

  next()
}

export { validateCreateProduct, validateUpdateProduct }
