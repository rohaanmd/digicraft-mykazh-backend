const express = require("express");
const router = express.Router();
const {ImgUploader,
authUser,
} = require("../middleware/index.js");
const {
    SignUp,
    Login,
    getAllUser,
    LogOut,
} = require ("../controllers/auth");

router.post("/signup" , ImgUploader,SignUp);
router.post("/login",Login);
router.post('/logout',LogOut);
router.get("/",authUser,getAllUser);
module.exports = router ;
