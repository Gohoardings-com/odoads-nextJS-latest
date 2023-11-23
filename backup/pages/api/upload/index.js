
import { verifyToken } from "../../../middelware/token";
import { addImages } from '../staff'

const multer = require('multer')
const nc = require('next-connect')
const path = require('path')
const handle = nc()
export const config = {
    api: {
      bodyParser: false,
    },
  }
const imageConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/upload')
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: imageConfig,
} )
const isImage = upload.single('file')
handle.use(isImage)
handle.post(addImages)


export default handle