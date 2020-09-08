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
} = require("../controllers/others");


router.get('/otherapi', getOthers);
router.get('/getall',  getAllOthers);
router.get('/',  getOthersByUser);
router.get('/:othersId',  getOthersById);
router.post('/create',authUser,  createOthers);
router.put('/update/:othersId',authUser, updateOthers);
router.delete('/deleteall', deleteAllOthers);
router.delete('/delete/:othersId', authUser,deleteOthersById);


module.exports = router;