const mongoose = require('mongoose');
const { database } = require('../config');

mongoose.set('strictQuery', false);

mongoose.connect(database, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// model

// async function main() {
// 	// const companies = await Company.find({});
// 	// console.log(companies);

// 	const company = new Company({
// 		name: 'ZAPMAR',
// 		slug: 'ZAP',
// 		// employeesCount: 0,
// 	});
// 	try {
// 		await company.save();
// 		console.log(company);
// 	} catch (err) {
// 		console.log('Coś się spierdoliło', err.message);
// 	}
// }

// main();
