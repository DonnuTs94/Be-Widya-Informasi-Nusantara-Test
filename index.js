import express from "express"
import cors from "cors"
import mainRoutes from "./src/mainRoutes.js"
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT || 8000

const app = express()
app.use(cors())
app.use(express.json())
app.use("/public", express.static("public"))

app.use(mainRoutes)

app.listen(PORT, (err) => {
  console.log(`Server Running on Port ${PORT}`)
  if (err) {
    console.log(`ERROR: ${err}`)
  }
})
