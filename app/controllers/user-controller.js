const User = require('../db/models/user');

class UserController {
	showRegister(req, res) {
		res.render('pages/auth/register', {
			title: 'Rejestracja',
		});
	}

	async register(req, res) {
		const user = new User({
			email: req.body.email,
			password: req.body.password,
		});

		try {
			await user.save();
			res.redirect('/zaloguj');
		} catch (err) {
			res.render('pages/auth/register', {
				errors: err.errors,
				form: req.body,
			});
		}
	}

	showLogin(req, res) {
		res.render('pages/auth/login', {
			title: 'Logowanie',
		});
	}

	async login(req, res) {
		try {
			const user = await User.findOne({ email: req.body.email });
			if (!user) {
				throw new Error('user not found');
			}

			const isValidPassword = user.comparePassword(req.body.password);
			if (!isValidPassword) {
				throw new Error('password not valid');
			}
			// login
			req.session.user = user;
			res.redirect('/');
		} catch (e) {
			return res.render('pages/auth/login', {
				form: req.body,
				errors: true,
			});
		}
	}

	async logout(req, res) {
		req.session.destroy();
		res.redirect('/');
	}

	showProfile(req, res) {
		res.render('pages/auth/profile', {
			title: 'Profil użytkownika',
			form: req.session.user,
		});
	}

	async updateProfile(req, res) {
		const user = await User.findById(req.session.user._id);
		user.email = req.body.email;
		user.firstName = req.body.firstName;
		user.lastName = req.body.lastName;

		if (req.body.password) {
			user.password = req.body.password;
		}

		try {
			await user.save();
			req.session.user = user; //update całego użytkownika
			// res.redirect('/admin/profil'); lub tak
			res.redirect('back');
		} catch (e) {
			return res.render('pages/auth/profile', {
				form: req.body,
				errors: e.errors,
			});
		}
	}
}
module.exports = new UserController();
