import Joi from "joi"

const createProductSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string()
    .valid("TSHIRTS", "JEANS", "JACKETS", "SHOES", "ACCESSORIES")
    .required(),
  price: Joi.number().positive().min(1).required(),
  quantity: Joi.number().integer().min(0).required(),
  description: Joi.string().max(500).required(),
})

const updateProductSchema = Joi.object({
  quantity: Joi.number().integer().min(0).optional(),
  price: Joi.number().positive().optional(),
  description: Joi.string().max(500).optional(),
})

export { createProductSchema, updateProductSchema }
