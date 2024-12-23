import multer from "multer"
import fs from "fs"
import { upload } from "../config/uploader.js"
import { LIMIT_FILE_SIZE } from "../constants/upload.js"

const validateFileUpload = ({ path, fileTypes, filePrefix, imgSize }) => {
  return async (req, res, next) => {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true })
    }

    const handleMulterError = (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === LIMIT_FILE_SIZE) {
          return res.status(400).json({
            message: "File too large, maximum allowed is 3 mb",
          })
        } else {
          return res.status(400).json({
            message: "File upload error: " + err.message,
          })
        }
      } else if (err) {
        return res.status(400).json({
          message: "File upload error: " + err.message,
        })
      }

      next()
    }

    const uploadMiddleware = upload({
      acceptedFileTypes: fileTypes,
      filePrefix: filePrefix,
      maxSize: imgSize,
      dynamicDestination: path,
    })

    uploadMiddleware(req, res, (err) => {
      handleMulterError(err)
    })
  }
}

export { validateFileUpload }
