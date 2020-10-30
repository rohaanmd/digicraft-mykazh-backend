const express = require('express')
const { ImgUploader, authUser,authAdmin } = require("../middleware/index");
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


router.get('/ngoapi', getNgo);
router.get('/getall', authAdmin, getAllNgo);//

router.get('/getapproved',  getApproved);
router.get('/getnull', authAdmin, getNULL);//
router.get('/getdisapproved', authAdmin, getDisapproved);
router.put('/approve/:ngoId',authAdmin,ApproveNgo);
router.put('/disapprove/:ngoId',authAdmin,DisapproveNgo);
router.get('/', authUser, getNgoByUser);//
router.get('/:ngoId',  getNgoById); //
router.post('/create',authUser, createNgo);//
router.put('/update/:ngoId',authUser, updateNgo);//
router.delete('/deleteall', deleteAllNgo);
router.delete('/delete/:ngoId', authUser, deleteNgoById);



module.exports = router;