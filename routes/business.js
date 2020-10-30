const express = require('express')
const { ImgUploader, authUser ,authAdmin } = require("../middleware/index");
const router = express.Router();
const { getBusiness,
    createBusiness,
    updateBusiness,
    deleteBusinessById,
    deleteAllBusiness,
    getBusinessByUser,
    getBusinessById,
    getAllBusiness,
    ApproveBusiness,
    DisapproveBusiness,
    getNULL,
    getDisapproved,
    getApproved
} = require("../controllers/buisness")


router.get('/businessapi', getBusiness);
router.get('/getall', getApproved);
router.get('/getnull', authAdmin, getNULL);
router.get('/getdisapproved', authAdmin , getDisapproved);
router.get('/',authUser, getBusinessByUser);
router.get('/:businessId', getBusinessById);
router.post('/create',authUser, createBusiness);
router.put('/update/:businessId',authUser, updateBusiness);
router.put('/approve/:businessId',authAdmin,ApproveBusiness);
router.put('/disapprove/:businessId',authAdmin,DisapproveBusiness);
router.delete('/deleteall', deleteAllBusiness);
router.delete('/delete/:businessId',authUser, deleteBusinessById);


module.exports = router;