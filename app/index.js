const app = require('./app');
const { port, ssl } = require('./config');
// const https = require('https');
// const fs = require('fs');

// http 80
app.listen(port, () => {
	console.log('No i KURWA server DZIAŁA na porcie: ', port);
});

// https 443

// if (ssl) {

// https.createSever({
// tutaj ceetyfikaty ssl: key:fs.readFileSync("")
// cert:key:fs.readFileSync("")
// ca:key:fs.readFileSync("")

// }).listen(433, () => {
// 	console.log('No i KURWA server DZIAŁA na porcie: ', port);
// });
// }
