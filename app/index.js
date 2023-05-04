const app = require('./app');
const { port } = require('./config');

app.listen(port, () => {
	console.log('No i KURWA server DZIAŁA na porcie: ', port);
});
