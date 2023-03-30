const AWS = require("aws-sdk");
const s3 = require("../data-access/s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

const allowedExtensions = [".png", ".jpg", ".jpeg", ".bmp"];

const imageUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: "8team",
    key: (req, file, callback) => {
      const extension = path.extname(file.originalname);
      if (!allowedExtensions.includes(extension)) {
        return callback(new Error("wrong Extension"));
      }
      callback(null, `${Date.now()}_${path.basename(file.originalname)}`);
    },
    acl: "public-read-write",
  }),
  //용량 제한 20mb
  limits: { fileSize: 20 * 1024 * 1024 },
});

module.exports = imageUploader;
