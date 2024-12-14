import Joi from "joi"

const createProductSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string()
    .valid("PRODUCT_A", "PRODUCT_B", "PRODUCT_C", "PRODUCT_D")
    .required(),
  price: Joi.number().positive().min(1).required(),
  quantity: Joi.number().integer().min(1).required(),
  description: Joi.string().max(500).required(),
})

export { createProductSchema }
