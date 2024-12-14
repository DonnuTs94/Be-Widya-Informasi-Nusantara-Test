import multer from "multer"

const upload = ({
  filePrefix = "FILE",
  fileName = Date.now(),
  acceptedFileTypes = [],
  maxSize,
  dynamicDestination,
}) => {
  const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dynamicPath = dynamicDestination
      cb(null, dynamicPath)
    },
    filename: (req, file, cb) => {
      fileName = `${filePrefix}-${Date.now()}-${file.originalname}`
      cb(null, `${fileName}`)
    },
  })

  const fileFilter = (req, file, cb) => {
    if (acceptedFileTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error("Invalid file type"))
    }
  }

  return multer({
    storage: diskStorage,
    fileFilter,
    limits: { fileSize: maxSize },
  }).single("image")
}

export { upload }
