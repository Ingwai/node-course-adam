// wtyczka chorniąca przed atakami DDOS i brute atack gdy ktoś chce zapchać łącze. Można ustawić ile połączeń i jak długo strona może obsłużyć i zablokować niechciany adres

const { RateLimiterMemory } = require('rate-limiter-flexible');

const rateLimiter = new RateLimiterMemory({
	points: 10, //ile requestów
	duration: 1, // przez ile sekund
});

const rateLimiterMiddleware = (req, res, next) => {
	rateLimiter
		.consume(req.ip) //sprawdza ip, jeśli jest za dużo połączeń z niego to wyrzuca błąd
		.then(() => {
			next();
		})
		.catch(() => {
			res.status(429).send('To Many Requests');
		});
};

module.exports = rateLimiterMiddleware;
