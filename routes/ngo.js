const express = require('express')
const { ImgUploader, authUser } = require("../middleware/index");
const router = express.Router();
const {   getNgo,
    createNgo,
    updateNgo,
    deleteNgoById,
    deleteAllNgo,
    getNgoByUser,
    getNgoById,
    getAllNgo,
    getNULL,
    getDisapproved,
    getApproved,
    ApproveNgo,
    DisapproveNgo,
} = require("../controllers/ngo");


router.get('/vgoapi', getNgo);
router.get('/getall',  getAllNgo);
router.get('/',  getNgoByUser);
router.get('/:ngoId',  getNgoById);
router.post('/create',authUser, createNgo);
router.put('/update/:ngoId',authUser, updateNgo);
router.delete('/deleteall', deleteAllNgo);
router.delete('/delete/:ngoId', authUser, deleteNgoById);
router.get('/getall',  getApproved);
router.get('/getnull',  getNULL);
router.get('/getdisapproved',  getDisapproved);
router.put('/approve/:ngoId',ApproveNgo);
router.put('/disapprove/:ngoId',DisapproveNgo);


module.exports = router;