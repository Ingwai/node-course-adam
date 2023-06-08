const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { checkForbidenString } = require('../validators');

const companySchema = new Schema({
	slug: {
		type: String,
		required: [true, 'Pole slug jest wymagane'],
		minLength: [3, 'Za krótka nazwa. Minimum 3 znaki.'],
		validate: value => checkForbidenString(value, 'slug'),
		trim: true,
		lowercase: true,
		unique: true,
	},
	name: {
		type: String,
		required: [true, 'Pole name jest wymagane'],
		minLength: [3, 'Za krótka nazwa. Minimum 3 znaki.'],
		unique: true,
	},
	employeesCount: {
		type: Number,
		min: 1,
		default: 1,
	},

	user: {
		type: mongoose.Types.ObjectId, //specjalny typ pola mongoose
		require: true,
		ref: 'User',
	},
	image: String,
});

// setter
// companySchema.path('slug').set(value => value.toLowerCase());

const Company = mongoose.model('Company', companySchema);

// wyłączanie klucza versji w mongoose __v:

// const Company = mongoose.model(
// 	'Company',
// 	new Schema(
// 		{
// 			slug: {
// 				type: String,
// 			},
// 			name: {
// 				type: String,
// 			},
// 		},
// 		{ versionKey: false }
// 	)
// );

// Company.find({}).then(docs => {
// 	console.log(docs);
// });

module.exports = Company;
