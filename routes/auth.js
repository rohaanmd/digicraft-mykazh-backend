const express = require("express");
const router = express.Router();
const {ImgUploader,
authAdmin,
} = require("../middleware/index.js");
const {
    SignUp,
    Login,
    getAllAdmin,
    LogOut,
} = require ("../controllers/auth");

router.post("/signup" , ImgUploader,SignUp);
router.post("/login",Login);
router.post('/logout',LogOut);
router.get("/",authAdmin,getAllAdmin);
module.exports = router ;
