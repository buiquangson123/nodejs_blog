const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/public/img')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
});
   
const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    console.log(file);
    if(file.mimetype == "image/bmp" 
        || file.mimetype == "image/png"
        || file.mimetype == "image/jpeg" 
        || file.mimetype == "image/jpg")
    {
      cb(null, true);
    }else{
      return res.json({err: "Ảnh không được phép!"});  
    }
  }
});
module.exports = upload;