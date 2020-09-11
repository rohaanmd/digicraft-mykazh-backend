const express = require('express')
const { ImgUploader, authUser } = require("../middleware/index");
const router = express.Router();
const {   getOthers,
    createOthers,
    updateOthers,
    deleteOthersById,
    deleteAllOthers,
    getOthersByUser,
    getOthersById,
    getAllOthers,
    getNULL,
    getDisapproved,
    getApproved,
    
    ApproveOthers,
    DisapproveOthers,
} = require("../controllers/others");


router.get('/otherapi', getOthers);
router.get('/getall',  getAllOthers);
router.get('/',  getOthersByUser);
router.get('/:othersId',  getOthersById);
router.post('/create',authUser,  createOthers);
router.put('/update/:othersId',authUser, updateOthers);
router.delete('/deleteall', deleteAllOthers);
router.delete('/delete/:othersId', authUser,deleteOthersById);
router.get('/getall',  getApproved);
router.get('/getnull',  getNULL);
router.get('/getdisapproved',  getDisapproved);
router.put('/approve/:othersId',ApproveOthers);
router.put('/disapprove/:othersId',DisapproveOthers);


module.exports = router;