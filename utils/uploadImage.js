const multer = require("multer");

const acceptedTypes = ["jpeg", "jpg", "png"];

const uploadImage = ( destination) => {
  const upload = multer({ dest: `uploads/${destination}` });
  const { mimetype, originalname, filename } = req.file;
  console.log("Miiiiiime");
  console.log(mimetype);

  if (acceptedTypes.includes(mimetype)) {
    req.file.filename = `${req.user._id}-${Date.now()}`;
  }
  upload.single(fieldName);
};

module.exports = { uploadImage };
