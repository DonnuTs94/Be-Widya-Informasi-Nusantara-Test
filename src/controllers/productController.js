import { categoryMapping } from "../constants/category.js"
import {
  countProductData,
  createProductData,
  detailProduct,
  findAllProduct,
  updateIsDeleteProduct,
  updateProductDetail,
  updateProductImage,
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
        price: parseInt(price),
        quantity: parseInt(quantity),
        description,
        image: file.filename,
        userId: user.id,
      })

      return res.status(201).json({
        success: true,
        message: "Success create product.",
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

      const pageSize = 8
      const offset = (page - 1) * pageSize

      const productData = await findAllProduct({
        userId: req.user.id,
        name,
        category,
        offset,
        pageSize,
      })

      const mappedProductData = productData.map((product) => ({
        ...product,
        category: categoryMapping[product.category] || product.category,
      }))

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
        data: mappedProductData,
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

      return res.status(200).json({
        success: true,
        message: "Success get detail product.",
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

  updateProductData: async (req, res) => {
    try {
      const { id } = req.params
      const { price, description, quantity } = req.body

      await updateProductDetail({
        productId: id,
        price,
        description,
        quantity,
      })

      return res.status(200).json({
        success: true,
        message: "Success update product data.",
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong. please try again later.",
        error: err.message,
      })
    }
  },

  softDelete: async (req, res) => {
    try {
      const { id } = req.params

      await updateIsDeleteProduct({
        id,
      })

      return res.status(200).json({
        success: true,
        message: "Success delete product.",
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong. please try again later.",
        error: err.message,
      })
    }
  },

  updateImage: async (req, res) => {
    try {
      const { id } = req.params
      const file = req.file

      if (!file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded.",
        })
      }

      await updateProductImage({
        id,
        newImage: file.filename,
      })

      return res.status(200).json({
        success: true,
        message: "Success update product image.",
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
