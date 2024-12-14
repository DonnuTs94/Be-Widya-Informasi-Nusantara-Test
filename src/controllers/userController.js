import { signToken } from "../config/jwt.js"
import {
  createUser,
  findUserByEmail,
  findUserById,
} from "../services/userService.js"
import bcrypt from "bcrypt"

const userController = {
  register: async (req, res) => {
    try {
      const { email, password, firstName, lastName, gender } = req.body

      const userAlreadyExist = await findUserByEmail(email)

      if (userAlreadyExist) {
        return res.status(400).json({
          message: "Email already exist",
        })
      }

      const hashedPassword = bcrypt.hashSync(password, 10)

      await createUser({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        gender,
      })

      res.status(201).json({
        success: true,
        message: "Register success",
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong. please try again later.",
        error: err.message,
      })
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body

      const user = await findUserByEmail(email)

      const passwordIsValid = bcrypt.compareSync(password, user.password)

      if (!user || !passwordIsValid) {
        return res.status(401).json({
          message: "Invalid email or password",
        })
      }

      const token = signToken({
        id: user.id,
      })

      res.status(200).json({
        status: true,
        token,
        message: "Login success",
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong. please try again later.",
        error: err.message,
      })
    }
  },

  userProfile: async (req, res) => {
    try {
      const userData = await findUserById(req.user.id)

      return res.status(200).json({
        status: true,
        message: "Success get user profile",
        data: userData,
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong. please try again later.",
        error: err.message,
      })
    }
  },
}

export default userController
