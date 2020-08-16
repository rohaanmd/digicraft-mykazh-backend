const express = require("express");
const router = express.Router();
const {ImgUploader} = require("../middleware/index.js");
const {
    SignUp,
    Login,
    getAllUser,
} = require ("../controllers/auth");

router.post("/signup" , ImgUploader,SignUp);
router.post("/login",Login);
router.get("/",getAllUser);
module.exports = router ;
