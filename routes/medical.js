const express = require('express')
const { ImgUploader, authUser } = require("../middleware/index");
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
router.get('/getall', authUser, getAllCharity);
router.get('/', authUser, getCharityByUser);
router.get('/:charityId', authUser, getCharityById);
router.post('/create',  createCharity);
router.put('/update/:charityId', updateCharity);
router.delete('/deleteall', deleteAllCharity);
router.delete('/delete/:charityId', authUser, deleteCharityById);
router.get('/getall',  getApproved);
router.get('/getnull',  getNULL);
router.get('/getdisapproved',  getDisapproved);
router.put('/approve/:medicalId',ApproveCharity);
router.put('/disapprove/:medicalId',DisapproveCharity);


module.exports = router;