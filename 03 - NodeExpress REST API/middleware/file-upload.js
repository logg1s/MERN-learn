const uuid = require('uuid')
const multer = require('multer')
const fs = require("fs")
const MIME_TYPE= {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg"
}

const fileUpload = multer({
    limits: 500000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const dir = "uploads/images"
            if(!fs.existsSync(dir)) {
                fs.mkdirSync(dir, {recursive: true})
            }
            cb(null, dir)
        },
        filename: (req, file, cb) => {
            const ext = MIME_TYPE[file.mimetype]
            cb(null, uuid.v4() + "." + ext)
        }
    }),
    fileFilter: (req, file, cb) => {
        const isValid = !!MIME_TYPE[file.mimetype]
        const error = isValid ? null : new Error("File is not accepted !")
        cb(error, isValid)
    }
})

module.exports = fileUpload