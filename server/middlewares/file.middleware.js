const multer = require('multer');
const moment = require('moment')


const storage = multer.diskStorage({
    description(req, file, cb) {
        cb(null, '../images')
    },
    filename(req, file, cb) {
        const data = moment().format('DDMMYYYY-HHmmss_SSS')
        cb(null, `${data}-${file.originalname}`);
    }
});

const types = ['image/png', 'image/jpeg', 'image/jpg'];

const fileFilter = (req, file, cb) => {
    if (types.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
};

module.exports=multer({storage, fileFilter})
