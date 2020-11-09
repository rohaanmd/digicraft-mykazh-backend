const express = require("express");
const router = express.Router();
const {fileMiddleware,
authUser,
} = require("../middleware/index.js");
const {
    SignUp,
    Login,
    getAllUser,
    LogOut,
    updateUser,
    getCurrentUser
} = require ("../controllers/auth");

router.post("/signup" , fileMiddleware,SignUp);
router.post("/login",Login);
router.post('/logout',LogOut);
router.put('/:userId',authUser,updateUser);
router.get('/',authUser,getCurrentUser);

// router.get("/",authUser,getAllUser);
module.exports = router ;
