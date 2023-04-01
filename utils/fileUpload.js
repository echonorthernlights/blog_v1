const fileUpload = require("express-fileupload");
const filesPayloadExists = require("../middleware/fileUpload/filesPayloadExists");
const fileExtLimiter = require("../middleware/fileUpload/fileExtLimiter");
const fileSizeLimiter = require("../middleware/fileUpload/fileSizeLimiter");

const upload = async (req, res) => {
  let fileName;
  console.log("///////");
  console.log(req.files);
  fileUpload({ createParentPath: true }),
    filesPayloadExists,
    fileExtLimiter([".png", ".jpg", ".jpeg"]),
    fileSizeLimiter,
    () => {
      console.log("upload hit");
      //const files = req.files;

      Object.keys(files).forEach((key) => {
        const [type, extension] = files[key].mimetype.split("/");
        console.log(files[key].mimetype);
        fileName = `${req.user._id.toString()}-${Date.now()}.${extension}`;
        const filePath = path.join("uploads", "profiles", fileName);
        files[key].mv(filePath, (err) => {
          if (err) console.log(err);
        });
      });
      console.log(fileName);
      res.status(200).json({ data: fileName });
    };
};

module.exports = { upload };
