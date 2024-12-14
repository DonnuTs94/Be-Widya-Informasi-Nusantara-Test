import { loginSchema, registerSchema } from "../validator/userValidator.js"

const validateUserRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body)
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    })
  }

  next()
}

const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body)
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    })
  }

  next()
}

export { validateUserRegister, validateLogin }
