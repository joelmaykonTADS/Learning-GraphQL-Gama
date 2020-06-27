import express from 'express';
import cors from 'cors'

const server = express();

server.get('/status', (_, res) => {
	res.send({
		status: 'OK'
	});
});

const enableCors = cors({ origin: 'http://localhost:3000' });

server
	.options('/authenticate', enableCors)
	.post('/authenticate',enableCors,express.json(), (req, res) => {
		console.log('Mail:', req.body.email, 'Password:', req.body.password);
		res.send();
	});

const ip = process.env.HOSTNAME || '127.0.0.1';
const port = process.env.PORT ? parseInt(process.env.PORT) : 8000;

server.listen(port, ip, () => {
	console.log(`Server is running at http://${ip}:${port}`);
});
