import { createProductSchema } from "../validator/productValidator.js"

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

export { validateCreateProduct }
