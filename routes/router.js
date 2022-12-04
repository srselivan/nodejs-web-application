const express = require("express");
const router = express.Router();
const path = require("path")

const multer = require("multer")

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "storage/file_storage")
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const urlencodedParser = express.urlencoded({extended: false});

const get_controllers = require("../controllers/get-controllers.js")
const post_controllers = require("../controllers/post-controllers.js")

router.get('/', get_controllers.get_index_page);
router.get('/view-file/:id', get_controllers.get_files_page);
router.get('/api/v1/files/list', get_controllers.get_list_files)
router.get('/api/v1/files/:id', get_controllers.get_file)

router.post('/api/v1/upload', multer({storage:storageConfig}).single("filedata"), post_controllers.upload_file)
router.post('/api/v1/mark', urlencodedParser, post_controllers.set_mark)
  
module.exports = router;