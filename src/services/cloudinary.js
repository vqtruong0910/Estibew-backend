const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary');
var multer = require('multer');
const setting = require('../setting/env')

cloudinary.config({
    cloud_name: setting.COULDINARY.NAME,
    api_key: setting.COULDINARY.API_KEY,
    api_secret: setting.COULDINARY.API_SECRET,
    secure: true
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Estibew',
        format: async (req, file) => 'jpg',
        public_id: (req, file) => file.originalname + Date.now() ,
    },
});

const parser = multer({ storage: storage });

// router.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, '../../views', '/index.html'));
// })

// router.post('/', parser.single('image'), function (req, res) {
//     res.json(req.file); // req.file.path = (url)
//     // original upload not with multer
//     // cloudinary.uploader.upload(path.join(__dirname, '../../../uploads', "1662305621580.PNG"),
//     //     { folder: "games" }, (error, result) => {
//     //         console.log(result, error);
//     //         res.send(result.secure_url)
//     //     });
// })

module.exports = parser