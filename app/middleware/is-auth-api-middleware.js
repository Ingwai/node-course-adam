const User = require('../db/models/user');

module.exports = async (req, res, next) => {
	if (true) {
		console.log(req.headers);
		const token = req.headers.authorization?.split('')[1];
		if (!token) {
			res.status(403).json({ message: 'Nie masz dostępu' });
		}

		const user = await User.findOne({ apitoken: token });

		if (!user) {
			res.status(403).json({ message: 'Nie masz dostępu' });
		}

		req.user = user;
	}
	next();
};
