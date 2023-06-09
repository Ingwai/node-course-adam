const Company = require('../../db/models/company');
const fs = require('fs');

class CompanyController {
	async showCompanies(req, res) {
		res.header('Content-Type', 'application/json');
		const companies = await Company.find();
		// res.send(JSON.stringify({ text: 'value' }));
		// można to napisać też
		res.status(200).json(companies);
	}

	async create(req, res) {
		const company = new Company({
			name: req.body.name,
			slug: req.body.slug,
			employeesCount: req.body.employeesCount,
			user: req.body.user,
			// user: req.session.user._id,
		});

		try {
			await company.save();
			res.status(201).json(company);
		} catch (err) {
			res.status(422).json({ errors: err.errors });
		}
	}

	async edit(req, res) {
		const { slug } = req.params;
		const company = await Company.findOne({ slug: slug });
		if (req.body.name) company.name = req.body.name;
		if (req.body.slug) company.slug = req.body.slug;
		if (req.body.employeesCount) company.employeesCount = req.body.employeesCount;

		if (req.file?.filename && company.image) {
			fs.unlinkSync('public/uploads/' + company.image);
		}

		company.image = req.file?.filename || company.image;

		try {
			await company.save();
			res.status(200).json(company);
		} catch (err) {
			res.status(422).json({ errors: err.errors });
		}
	}

	async delete(req, res) {
		const { slug } = req.params;

		try {
			const company = await Company.findOne({ slug: slug });
			if (company.image) {
				fs.unlinkSync('public/uploads/' + company.image);
			}
			await Company.deleteOne({ slug: slug });
			res.sendStatus(204);
		} catch (err) {
			res.status(422).json({ errors: err.errors });
		}
	}
}

module.exports = new CompanyController();
