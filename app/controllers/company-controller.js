const Company = require('../db/models/company');
const fs = require('fs');
const { Parser } = require('json2csv');

class CompanyController {
	async showCompanies(req, res) {
		const { q, sort, countmin, countmax } = req.query;
		const page = req.query.page || 1;
		const perPage = 2;
		const where = {};

		// search
		if (q) where.name = { $regex: q, $options: 'i' };

		// filter
		if (countmin || countmax) {
			where.employeesCount = {};
			if (countmin) where.employeesCount.$gte = countmin;
			if (countmax) where.employeesCount.$lte = countmax;
		}

		let query = Company.find(where);

		// pagination
		query = query.skip((page - 1) * perPage);
		query = query.limit(perPage); // ile wyników na stronę ustawiam limit

		// sort
		// opcje wyrażeń regularnych ma mongoDB
		if (sort) {
			const s = sort.split('|');
			query = query.sort({ [s[0]]: s[1] }); //jest w MongoDB funkcja sort
		}
		// egzekwowanie (exec)
		const companies = await query.populate('user').exec();
		const resultsCount = await Company.find(where).countDocuments();
		const pagesCount = Math.ceil(resultsCount / perPage);
		// exec() że uruchamiam wszystkie moje parametry
		res.render('pages/companies/companies', {
			companies,
			page,
			pagesCount,
			resultsCount,
		});
	}

	async showCompany(req, res) {
		const { name } = req.params;
		const company = await Company.findOne({ slug: name });
		res.render('pages/companies/company', {
			name: company?.name,
			title: company?.name ?? 'Brak wyników',
		});
	}

	showCreateCompanyForm(req, res) {
		res.render('pages/companies/create');
	}

	async createCompany(req, res) {
		const company = new Company({
			name: req.body.name,
			slug: req.body.slug,
			employeesCount: req.body.employeesCount || undefined,
			user: req.session.user._id,
			image: req.file.filename,
		});

		try {
			await company.save();
			res.redirect('/firmy');
		} catch (err) {
			res.render('pages/companies/create', {
				errors: err.errors,
				form: req.body,
			});
		}
	}

	async showEditCompanyForm(req, res) {
		const { name } = req.params;
		const company = await Company.findOne({ slug: name });
		res.render('pages/companies/edit', {
			form: company,
			slug: name,
		});
	}

	async editCompany(req, res) {
		const { name } = req.params;
		const company = await Company.findOne({ slug: name });
		company.name = req.body.name;
		company.slug = req.body.slug;
		company.employeesCount = req.body.employeesCount;

		if (req.file?.filename && company.image) {
			fs.unlinkSync('public/uploads/' + company.image);
		}

		company.image = req.file?.filename || company.image;

		//req.file bo multer tego wymaga nie jest to już body-parser

		try {
			await company.save();
			res.redirect('/firmy');
		} catch (err) {
			res.render('pages/companies/edit', {
				errors: err.errors,
				form: req.body,
			});
		}
	}

	async deleteCompany(req, res) {
		const { name } = req.params;

		try {
			const company = await Company.findOne({ slug: name });
			if (company.image) {
				fs.unlinkSync('public/uploads/' + company.image);
			}
			await Company.deleteOne({ slug: name });
			res.redirect('/firmy');
		} catch (err) {
			console.log(err.message);
		}
	}

	async deleteImage(req, res) {
		const { name } = req.params;
		const company = await Company.findOne({ slug: name });

		try {
			fs.unlinkSync('public/uploads/' + company.image);
			company.image = '';
			company.save();
			res.redirect('/firmy');
		} catch (err) {
			console.log(err.message);
		}
	}

	async getCSV(req, res) {
		//pola pliku csv sobie definiujemy
		const fields = [
			{
				label: 'Nazwa',
				value: 'name',
			},
			{
				label: 'URL',
				value: 'slug',
			},
			{
				label: 'Liczba pracowników',
				value: 'employeesCount',
			},
		];
		// dane z bazy danych zaciągamy do zmiennej data
		const data = await Company.find();
		// nazwa pliku csv
		const fileName = 'companies.csv';
		// zmienna wywołująca obiekt Parser z biblioteki json2csv
		const json2csv = new Parser({ fields });
		const csv = json2csv.parse(data);

		//te 3 linijki to express wysyłają pewne dane
		res.header('Content-Type', 'text/csv');
		res.attachment(fileName);
		res.send(csv);

		// żeby zamienić dane na csv instalujemy json2csv
	}
}

module.exports = new CompanyController();
