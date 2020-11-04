const express = require("express");
const router = express.Router();
const {
ImgUploader,
authAdmin,
} = require("../middleware/index.js");
const {
    SignUp,
    Login,
    getCurrentAdmin,
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
    updateKnowledge,
  updateEntrepreneur,
  updateInvestor,
    
} = require("../controllers/faq");

const {
  deleteTeamById,
  createTeam,
  updateTeam,
  getAllTeams
} = require("../controllers/teams");

const {
  deletePressById,
  createPress,
  updatePress,
  getAllPress
}= require("../controllers/press");

const {
  deleteHelpSupportById,
  createHelpSupport,
  updateHelpSupport,
  getAllHelpSupport
}= require("../controllers/helpAndSupport");

router.post("/signup" , ImgUploader,SignUp);
router.post("/login",Login);
router.post('/logout',LogOut);



router.put('/approve/:userId',authAdmin,Approved);
router.put('/disapprove/:userId',authAdmin,Disapproved);



router.get("/userlist",authAdmin,getUsers);

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
router.put("/knowledge/update/:faqId",updateKnowledge);
router.get("/investor", getInvestor);
router.put("/investor/update/:faqId",updateInvestor);
router.get("/entrepreneur", getEntrepreneur);
router.put("/entrepreneur/update/:faqId",updateEntrepreneur);

router.get("/teams",getAllTeams);
router.put("/teams/:teamsId",updateTeam);
router.post("/teams/create",createTeam)
router.delete("/teams/:teamsId",deleteTeamById);


router.get("/press",getAllPress);
router.put("/press/:pressId",updatePress);
router.post("/press/create",createPress)
router.delete("/press/:pressId",deletePressById);

router.get("/help",getAllHelpSupport);
router.put("/help/:helpId",updateHelpSupport);
router.post("/help/create",createHelpSupport)
router.delete("/help/:helpId",deleteHelpSupportById);

router.get("/",authAdmin,getCurrentAdmin);

module.exports = router ;
