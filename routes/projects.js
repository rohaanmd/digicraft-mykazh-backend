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
router.post('/create',  createProject);
router.put('/update/:projectId', updateProject);
router.delete('/deleteall', deleteAllProject);
router.delete('/delete/:projectId', deleteProjectById);


module.exports = router;     