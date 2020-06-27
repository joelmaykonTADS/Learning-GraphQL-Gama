import express from 'express';

const server = express();

server.get('/status', (_, res) => {
  res.send({
    status: 'OK'
  })
});

server.post('/authenticate', express.json(), (req, res) => {
  console.log('Mail:', req.body.mail, 'Password:', req.body.password);
  res.send();
});

const ip = process.env.HOSTNAME || "127.0.0.1";
const port = process.env.PORT ? parseInt(process.env.PORT) : 8080;

server.listen(port, ip, () => {
  console.log(`Server is running at http://${ip}:${port}`);
});
