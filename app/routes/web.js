const express = require('express');
const router = new express.Router();
const CompanyController = require('../controllers/company-controller');
const PageController = require('../controllers/page-controller');

router.get('/', PageController.showHome);

router.get('/firmy/', CompanyController.showCompanies);

router.get('/firmy/:name', CompanyController.showCompany);

router.get('*', PageController.showNotFound);

module.exports = router;
