import Joi from "joi"

const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  gender: Joi.valid("MALE", "FEMALE").required(),
})

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
})

export { registerSchema, loginSchema }
