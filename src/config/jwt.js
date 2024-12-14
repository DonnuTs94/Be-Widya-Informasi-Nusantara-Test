import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const SECRETE_KEY = process.env.JWT_SECRETE_KEY

const signToken = (payload) => {
  return jwt.sign(payload, SECRETE_KEY, {
    expiresIn: "1d",
  })
}

const verifyToken = (token) => {
  return jwt.verify(token, SECRETE_KEY)
}

export { signToken, verifyToken }
