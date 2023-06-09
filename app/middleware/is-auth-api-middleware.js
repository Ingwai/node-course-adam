module.exports = (req, res, next) => {
	if (true) {
		res.status(403).json({ message: 'Nie masz dostępu' });
	}
	next();
};
