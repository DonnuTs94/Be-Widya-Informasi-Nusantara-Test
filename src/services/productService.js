import { prisma } from "../config/prisma.js"

const createProductData = async ({
  name,
  quantity,
  price,
  category,
  description,
  image,
  userId,
}) => {
  return await prisma.product.create({
    data: {
      name,
      category,
      price,
      quantity,
      description,
      image,
      userId,
    },
  })
}

export { createProductData }
