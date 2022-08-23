import express, { Request } from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import { gql } from 'apollo-server-express';

const app = express();

const typeDefs = gql`
  type Query {
    hello: String
  }
`;
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
    validationRules: [depthLimit(7)],
});
app.use('*', cors<Request>());
app.use(compression());
server.start().then(() => {
    server.applyMiddleware({ app, path: '/graphql' });
    const httpServer = createServer(app);
    httpServer.listen(
        { port: 3000 },
        (): void => console.log(`\n🚀      GraphQL is now running on http://localhost:3000/graphql`));
})