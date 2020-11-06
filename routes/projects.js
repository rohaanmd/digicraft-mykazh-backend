const express = require('express')
const { fileMiddleware, authUser,authAdmin } = require("../middleware/index");
const router = express.Router();
const { deleteProjectById,
     updateProject,
     deleteAllProject,
     createProject,
     getProjectByUser,
     getProjectById,
     getAllProject,
     getProject,
     getNULL,
     getDisapproved,
     getApproved,
     ApproveProject,
     DisapproveProject,
} = require("../controllers/projects");  


router.get('/projectapi', getProject);
router.get('/getall', authAdmin, getAllProject);
router.get('/getapproved', getApproved);
router.get('/getnull',authAdmin, getNULL);
router.get('/getdisapproved',authAdmin, getDisapproved);
router.get('/',authUser,  getProjectByUser);
router.get('/:projectId', authUser, getProjectById);
router.post('/create',authUser, createProject);
router.put('/update/:projectId',authUser, updateProject);
router.delete('/deleteall', deleteAllProject);
router.delete('/delete/:projectId',authUser, deleteProjectById);
router.put('/approve/:projectId',authAdmin,ApproveProject);
router.put('/disapprove/:projectId',authAdmin,DisapproveProject);


module.exports = router;     