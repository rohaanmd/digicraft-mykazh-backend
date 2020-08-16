const multer = require("multer");


// multer storage engine
const Storage = multer.diskStorage({
    destination: function (req, res, cb) {
      cb(null, "./uploads/");
    },
  });
  

  //multer middleware
  const ImgUploader = multer({
    storage: Storage,
  }).single("picture");
  
  
  module.exports = {
      ImgUploader,

  }