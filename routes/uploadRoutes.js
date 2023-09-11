import express from 'express';
import  path from 'path';
import multer from 'multer';

const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './uploads');
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//     //   new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname
//     `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
//   },
// });

// const filefilter = (req, file, cb) => {
// //   const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//   const allowedFileTypes = /jpg|jpeg|png/;
//   const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = allowedFileTypes.test(file.mimetype);
//   if(extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb('Image only!'); 
//   }
// };

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname
    );
  },
});

const filefilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
      cb(null, false);
  }
};

const upload = multer({ storage: storage, filefilter: filefilter });

router.post('/', upload.single('image'), (req, res) => {
    res.send({
        message: 'Image Uploaded',
        image: req.protocol + '://' + req.get('host') + '/' + req.file.filename
    });
});

export default router;  