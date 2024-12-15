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
      id: true,
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

const detailProduct = async ({ productId }) => {
  return await prisma.product.findFirst({
    where: {
      id: productId,
    },
    select: {
      id: true,
      name: true,
      price: true,
      category: true,
      quantity: true,
      description: true,
      image: true,
    },
  })
}

const isProductOwner = async ({ productId }) => {
  return await prisma.product.findFirst({
    where: {
      id: productId,
    },
    select: {
      userId: true,
    },
  })
}

const updateProductDetail = async ({
  productId,
  price,
  quantity,
  description,
}) => {
  return await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      ...(price !== undefined && { price }),
      ...(quantity !== undefined && { quantity }),
      ...(description !== undefined && { description }),
    },
  })
}

const updateIsDeleteProduct = async ({ id }) => {
  return await prisma.product.update({
    where: {
      id,
    },
    data: {
      isDelete: true,
    },
  })
}

export {
  createProductData,
  findAllProduct,
  countProductData,
  detailProduct,
  isProductOwner,
  updateProductDetail,
  updateIsDeleteProduct,
}
