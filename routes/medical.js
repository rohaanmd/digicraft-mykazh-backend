const express = require('express')
const { ImgUploader, authUser,authAdmin } = require("../middleware/index");
const router = express.Router();
const {  deleteCharityById,
     updateCharity,
     deleteAllCharity,
     createCharity,
     getCharityByUser,
     getCharityById,
     getAllCharity,
     getCharity,
     getNULL,
     getDisapproved,
     getApproved,
     ApproveCharity,
     DisapproveCharity,
} = require("../controllers/medical")


router.get('/charityapi', getCharity);
router.get('/getapproved', getApproved);
router.get('/getnull',authAdmin, getNULL);
router.get('/getdisapproved',authAdmin,  getDisapproved);
router.put('/approve/:medicalId',authAdmin,ApproveCharity);
router.put('/disapprove/:medicalId',authAdmin,DisapproveCharity);
router.get('/getall', authUser, getAllCharity);
router.get('/', authUser, getCharityByUser);

router.post('/create', authUser, createCharity);
router.put('/update/:medicalId',authUser ,updateCharity);
router.get('/:medicalId', authUser, getCharityById);
router.delete('/deleteall', deleteAllCharity);
router.delete('/delete/:medicalId', authUser, deleteCharityById);



module.exports = router;