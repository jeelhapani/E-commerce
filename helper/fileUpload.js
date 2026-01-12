const multer = require("multer");
const fs = require("fs");

const fileUpload = ({ uploadPath }) => {
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            const filenameWithoutSpaces = file.originalname.replace(/\s/g, '_');
            const uniqueFilename = `${Date.now()}-${filenameWithoutSpaces}`;
            cb(null, uniqueFilename);
        },
    });

    // Create and export the Multer upload middleware instance
    return (multer({ storage: storage }));

}

module.exports = fileUpload;