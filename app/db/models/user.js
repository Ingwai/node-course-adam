const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { validateEmail } = require('../validators');
const bcrypt = require('bcrypt');
const randomstring = require('randomstring');

const userSchema = new Schema({
	email: {
		type: String,
		required: [true, 'Pole email jest wymagane'],
		validate: [validateEmail, 'Email nieprawidłowy'],
		trim: true,
		lowercase: true,
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Pole hasło jest wymagane'],
		minLength: [5, 'Hasło powinno mieć minimum 5 znaków.'],
	},
	firstName: String,
	lastName: String,
	apiToken: String,
});

// hashowanie hasła na polu password korzystamy z biblioteki node.bcrypt.js

// userSchema.path('password').set(value => {
// 	const salt = bcrypt.genSaltSync(10);
// 	const hash = bcrypt.hashSync(value, salt);
// 	return hash;
// });

userSchema.pre('save', function (next) {
	// const user = this; this wskazuje na usera
	if (!this.isModified('password')) return next();
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(this.password, salt);
	this.password = hash;
	next();
});

//  sprawdzanie błędu dla zmiennej unique robimy middleware
userSchema.post('save', function (err, doc, next) {
	if (err.code === 11000) {
		err.errors = { email: { message: 'Taki email już istnieje' } };
	}
	next(err);
});

userSchema.pre('save', function (next) {
	// const user = this //this wskazuje na user
	if (this.isNew) {
		this.apiToken = randomstring.generate(30);
	}
	next();
	// isNew to pole moongose
	// token genujemy przez bibliotkę randomstring
});

userSchema.methods = {
	comparePassword(password) {
		return bcrypt.compareSync(password, this.password);
	},
};

// wirtualne pole
userSchema.virtual('fullName').get(function () {
	if (this.firstName && this.lastName) {
		return `${this.firstName} ${(this.lastName && this.lastName[0]) || ''}.`;
	}
});

const User = mongoose.model('User', userSchema);
module.exports = User;
