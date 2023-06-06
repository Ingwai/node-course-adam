const express = require('express');
const router = new express.Router();
const CompanyController = require('../controllers/company-controller');
const UserController = require('../controllers/user-controller');
const PageController = require('../controllers/page-controller');

router.get('/', PageController.showHome);

router.get('/firmy/', CompanyController.showCompanies);

router.get('/firmy/:name', CompanyController.showCompany);

router.get('/zarejestruj', UserController.showRegister);

router.post('/zarejestruj', UserController.register);

router.get('/zaloguj', UserController.showLogin);

router.post('/zaloguj', UserController.login);

router.get('/wyloguj', UserController.logout);

router.get('/admin/profil', UserController.showProfile);

router.post('/admin/profil', UserController.updateProfile);

router.get('/admin/firmy/dodaj', CompanyController.showCreateCompanyForm);

router.post('/admin/firmy/dodaj', CompanyController.createCompany);

router.get('/admin/firmy/:name/edytuj', CompanyController.showEditCompanyForm);

router.post('/admin/firmy/:name/edytuj', CompanyController.editCompany);

router.get('/admin/firmy/:name/usun', CompanyController.deleteCompany);

router.get('*', PageController.showNotFound);

module.exports = router;
