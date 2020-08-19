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
    getUsers,
    Approved,
    Disapproved,
    getApprovedUser,
    getDisapprovedUser,
    getUndefinedUser,
} = require ("../controllers/admin");

router.post("/signup" , ImgUploader,SignUp);
router.post("/login",Login);
router.post('/logout',LogOut);
router.post('/approve',authAdmin,Approved);
router.post('/disapprove',authAdmin,Disapproved);



router.get("/userlist",authAdmin,getUsers);
router.get("/",authAdmin,getAllAdmin);
router.get("/approveduserlist",authAdmin,getApprovedUser);
router.get("/undefineduserlist",authAdmin,getUndefinedUser);
router.get("/disapproveduserlist",authAdmin,getDisapprovedUser);
module.exports = router ;
