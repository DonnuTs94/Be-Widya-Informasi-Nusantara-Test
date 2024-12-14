import {
  countProductData,
  createProductData,
  detailProduct,
  findAllProduct,
} from "../services/productService.js"

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
        success: true,
        message: "Success create product",
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

  getAllProduct: async (req, res) => {
    try {
      const { name, category, page } = req.query

      const pageSize = 5
      const offset = (page - 1) * pageSize

      const productData = await findAllProduct({
        userId: req.user.id,
        name,
        category,
        offset,
        pageSize,
      })

      const totalCountProduct = await countProductData({
        userId: req.user.id,
        name,
        category,
      })

      const startItem = offset + 1
      const endItem = Math.min(offset + pageSize, totalCountProduct)

      return res.status(200).json({
        success: true,
        message: "Success get all product data.",
        currentPage: page,
        pageSize,
        totalItems: totalCountProduct,
        totalPages: Math.ceil(totalCountProduct / pageSize),
        range: {
          start: startItem,
          end: endItem,
        },
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

  getDetailProduct: async (req, res) => {
    try {
      const { id } = req.params
      const productData = await detailProduct({ productId: id })

      return res.status(400).json({
        success: true,
        message: "Success get detail product",
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
