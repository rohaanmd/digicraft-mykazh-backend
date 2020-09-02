const express = require('express')
const { ImgUploader, authUser } = require("../middleware/index");
const router = express.Router();
const { deleteProjectById,
     updateProject,
     deleteAllProject,
     createProject,
     getProjectByUser,
     getProjectById,
     getAllProject,
     getProject,
} = require("../controllers/projects");  


router.get('/projectapi', getProject);
router.get('/getall',  getAllProject);
router.get('/',  getProjectByUser);
router.get('/:projectId',  getProjectById);
router.post('/create',authUser,  createProject);
router.put('/update/:projectId',authUser, updateProject);
router.delete('/deleteall', deleteAllProject);
router.delete('/delete/:projectId',authUser, deleteProjectById);


module.exports = router;     