const express = require("express");
//const multer = require("multer");
const upload = require("../middleware/imageMiddleware");
const imageRouter = express.Router();

//단일 이미지 업로드
imageRouter.post(
  "/image", 
  upload.single("image"), async (req, res) => {
    console.log(req.file);
    const image = req.file.location;
    if (image === undefined) {
      return res.status(400).send("이미지가 존재하지 않습니다.");
    }
    res.status(200).send({
      message: "요청 성공",
      image: image,
    });
  }
);

//복수 이미지 업로드
imageRouter.post(
  "/images", 
  upload.array("image"), async (req, res) => {
    console.log(req.files);
    const image = req.files;
    const path = image.map(img => img.location);
    if (image === undefined) {
      return res.status(400).send("이미지가 존재하지 않습니다.");
    }
    res.status(200).send({
      message: "요청 성공",
      image: path,
    });
  }
);

module.exports = imageRouter;
