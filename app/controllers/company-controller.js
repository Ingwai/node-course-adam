const Company = require('../db/models/company');

class CompanyController {
	async showCompanies(req, res) {
		const companies = await Company.find({});
		console.log(companies);
		res.render('pages/companies', {
			companies,
		});
	}

	async showCompany(req, res) {
		const { name } = req.params;
		const company = await Company.findOne({ slug: name });
		res.render('pages/company', {
			name: company?.name,
			title: company?.name ?? 'Brak wyników',
		});
	}
}

module.exports = new CompanyController();
