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

const findAllProduct = async ({ pageSize, offset, name, category, userId }) => {
  return await prisma.product.findMany({
    take: pageSize,
    skip: offset,
    where: {
      userId: userId,
      AND: [
        name
          ? {
              name: {
                contains: name,
                mode: "insensitive",
              },
            }
          : {},
        category
          ? {
              category: {
                equals: category,
              },
            }
          : {},
      ],
      isDelete: false,
    },
    select: {
      name: true,
      price: true,
      category: true,
      quantity: true,
      description: true,
      image: true,
      createdAt: true,
    },
    orderBy: {
      name: "asc",
    },
  })
}

const countProductData = async ({ userId, name, category }) => {
  return await prisma.product.count({
    where: {
      userId: userId,
      isDelete: false,
      AND: [
        name
          ? {
              name: {
                contains: name,
                mode: "insensitive",
              },
            }
          : {},
        category
          ? {
              category: {
                equals: category,
              },
            }
          : {},
      ],
    },
  })
}

export { createProductData, findAllProduct, countProductData }
