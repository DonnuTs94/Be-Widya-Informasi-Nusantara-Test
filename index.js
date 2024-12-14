import express from "express"
import cors from "cors"
import mainRoutes from "./src/mainRoutes.js"

const PORT = 8000

const app = express()
app.use(cors())
app.use(express.json())

app.use(mainRoutes)

app.listen(PORT, (err) => {
  console.log(`Server Running on Port ${PORT}`)
  if (err) {
    console.log(`ERROR: ${err}`)
  }
})
