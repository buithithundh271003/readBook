import multer from "multer";
const storages = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/ttcs/webComics_NodeJs/Store-book-main/backend/src/middlewares/tmp')
    },
    filename: function (req, file, cb) {
        console.log("fileeee",file);
      cb(null, file.originalname)
    }
    
  })
  console.log("----------------")
  
  export  const File = multer({ storage: storages })