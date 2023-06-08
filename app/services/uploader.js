const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/uploads/'); // null bo nie chce przekazywać żadnego errora i gdzie chce wgrywać pliki
	},
	filename: function (req, file, cb) {
		const name = Date.now() + '_' + path.basename(file.originalname);
		cb(null, name);
	},
});

const upload = multer({ storage });

module.exports = upload;
