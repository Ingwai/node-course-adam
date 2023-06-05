module.exports = {
	checkForbidenString(value, forbidenString) {
		if (value === forbidenString) throw new Error(`Nazwa ${forbidenString} jest zabroniona`);
	},

	validateEmail(email) {
		let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		return re.test(email);
	},
};
