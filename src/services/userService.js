import { prisma } from "../config/prisma.js"

const createUser = async ({ email, password, firstName, lastName, gender }) => {
  return await prisma.user.create({
    data: {
      email,
      password,
      firstName,
      lastName,
      gender,
    },
  })
}

const findUserByEmail = async (email) => {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  })
}

const findUserById = async (id) => {
  return await prisma.user.findFirst({
    where: {
      id,
    },
    select: {
      email: true,
      firstName: true,
      lastName: true,
      gender: true,
    },
  })
}

export { createUser, findUserByEmail, findUserById }
