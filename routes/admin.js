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

const {
    getTerms,
      updateTerms,
      postInfo,
      getRisk,
      updateRisk,
      getPrivacy,
      updatePrivacy,

} = require("../controllers/info");

const {
    postFaq,
    getInvestor ,
    getKnowledge,
    getEntrepreneur,
    
} = require("../controllers/faq");
const { get } = require("mongoose");

router.post("/signup" , ImgUploader,SignUp);
router.post("/login",Login);
router.post('/logout',LogOut);



router.put('/approve/:userId',authAdmin,Approved);
router.put('/disapprove/:userId',authAdmin,Disapproved);



router.get("/userlist",authAdmin,getUsers);
router.get("/",authAdmin,getAllAdmin);
router.get("/approveduserlist",authAdmin,getApprovedUser);
router.get("/undefineduserlist",authAdmin,getUndefinedUser);
router.get("/disapproveduserlist",authAdmin,getDisapprovedUser);


router.post("/info/create", postInfo);

router.get("/terms", getTerms);
router.put("/terms/update",updateTerms);

router.get("/risk", getRisk);
router.put("/risk/update",updateRisk);

router.get("/privacy", getPrivacy);
router.put("/privacy/update",updatePrivacy);




router.post("/faq/create", postFaq);

router.get("/knowledge", getKnowledge);
// router.put("/terms/update",updateTerms);

router.get("/investor", getInvestor);
// router.put("/risk/update",updateRisk);

router.get("/entrepreneur", getEntrepreneur);
// router.put("/privacy/update",updatePrivacy);




module.exports = router ;
