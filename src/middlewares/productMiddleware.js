import { isProductOwner } from "../services/productService.js"

const verifyOwnerProduct = async (req, res, next) => {
  try {
    const { id } = req.params

    const user = req.user
    const product = await isProductOwner({ productId: id })

    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Product not found",
      })
    }

    if (product.userId !== user.id) {
      return res.status(403).json({
        status: false,
        message: "Forbidden!",
      })
    }

    next()
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Something went wrong, please try again later.",
      error: err.message,
    })
  }
}

export { verifyOwnerProduct }
