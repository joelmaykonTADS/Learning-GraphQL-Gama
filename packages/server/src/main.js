import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';

const app = express();

const server = new ApolloServer({
	typeDefs,
	resolvers
});

server.applyMiddleware({
	app,
	cors: {
		origin: 'http://localhost:3000'
	},
	bodyParserConfig:true,
})

const ip = process.env.HOSTNAME || '127.0.0.1';
const port = process.env.PORT ? parseInt(process.env.PORT) : 8000;

app.listen(port, ip, () => {
	console.log(`Server is running at http://${ip}:${port}`);
});
