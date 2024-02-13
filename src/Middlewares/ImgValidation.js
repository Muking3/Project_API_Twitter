import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        const name = file.originalname.replace(/[^a-zA-Z0-9\.\-]/g, '_');
        cb(null, Date.now() + "_" + name);
    }
})
let tableRegex = /^image\/png$|^image\/jpe?g$|^image\/gif|^video\/mkv/;
const maxSise = 5 * 1024 * 1024;
export const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (tableRegex.test(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(null, false);
            cb(new Error("Fichier non valide"));
        }
    },
    limits: { fileSize: maxSise }

}).single("image");
