import { createProductData } from "../services/productService.js"

const productController = {
  createProduct: async (req, res) => {
    try {
      const { name, category, price, quantity, description } = req.body

      const file = req.file
      const user = req.user

      const productData = await createProductData({
        name,
        category,
        price,
        quantity: Number(quantity),
        description,
        image: file.filename,
        userId: user.id,
      })

      return res.status(201).json({
        message: "Successfully create product",
        data: productData,
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

export default productController
