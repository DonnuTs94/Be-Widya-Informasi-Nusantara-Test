import { verifyToken } from "../config/jwt.js"

const validateToken = (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1]

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      })
    }

    const verifiedUser = verifyToken(token)

    req.user = verifiedUser
    next()
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Token",
    })
  }
}

export default validateToken
