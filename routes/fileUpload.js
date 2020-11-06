const express = require('express')
const { fileMiddleware, authUser ,authAdmin} = require("../middleware/index");
const router = express.Router();
const {  fileController,fileDeleteController
} = require("../controllers/file");

router.post("/upload",authUser,fileMiddleware,fileController);
router.post("/delete/:id",authUser,fileDeleteController);
router.post("/admin/upload",authAdmin,fileMiddleware,fileController);
router.post("/admin/delete/:id",authAdmin,fileDeleteController);
// router.get('/otherapi', getOthers);
// router.get('/getall', authAdmin, getAllOthers);
// router.get('/getapproved', getApproved);
// router.get('/getnull', authAdmin, getNULL);
// router.get('/getdisapproved',authAdmin,  getDisapproved);
// router.put('/approve/:othersId',authAdmin,ApproveOthers);
// router.put('/disapprove/:othersId',authAdmin,DisapproveOthers);
// router.get('/', authUser, getOthersByUser);
// router.get('/:othersId',  getOthersById);
// router.post('/create',authUser,  createOthers);
// router.put('/update/:othersId',authUser, updateOthers);
// router.delete('/deleteall', deleteAllOthers);
// router.delete('/delete/:othersId', authUser,deleteOthersById);

module.exports = router;