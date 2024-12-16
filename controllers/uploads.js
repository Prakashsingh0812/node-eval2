const fs = require("fs");
const multer = require("multer");
const redisClient = require("../config/redis");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
 
    cb(null, Date.now() + '-' + file.originalname);
  }
});


const upload = multer({ storage: storage });

exports.uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "No file uploaded" });
  }

  const file = req.file;
  const uploadId = req.body.uploadFile;

  let uploadBytes = 0;

  const writeStream = fs.createWriteStream(`uploads/${file.filename}`);

 
  const fileStream = fs.createReadStream(file.path);
  
  fileStream.on("data", (chunk) => {
    uploadBytes += chunk.length;
    const progress = Math.floor((uploadBytes / file.size) * 100);
    redisClient.set(`upload:${uploadId}:progress`, progress); 
  });

  fileStream.pipe(writeStream);

  fileStream.on("end", () => {
    redisClient.del(`upload:${uploadId}:progress`); 
    res.send({ message: "File uploaded successfully" });
  });
};

exports.getUploadProgress = async (req, res) => {
  const { uploadId } = req.query;

  const progress = await redisClient.get(`upload:${uploadId}:progress`);
  res.send({ progress: progress });
};
