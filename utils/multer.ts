import multer from 'multer';

export const storage = multer.diskStorage({
  destination: (req, filte, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname
    );
  },
});

export const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype.includes('image') ||
    file.mimetype.includes('excel') ||
    file.mimetype.includes('sheet')
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
