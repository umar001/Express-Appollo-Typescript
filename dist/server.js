"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const graphql_depth_limit_1 = __importDefault(require("graphql-depth-limit"));
const http_1 = require("http");
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const apollo_server_express_2 = require("apollo-server-express");
const app = (0, express_1.default)();
const typeDefs = (0, apollo_server_express_2.gql) `
  type Query {
    hello: String
  }
`;
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
    },
};
const server = new apollo_server_express_1.ApolloServer({
    typeDefs,
    resolvers,
    validationRules: [(0, graphql_depth_limit_1.default)(7)],
});
app.use('*', (0, cors_1.default)());
app.use((0, compression_1.default)());
server.start().then(() => {
    server.applyMiddleware({ app, path: '/graphql' });
    const httpServer = (0, http_1.createServer)(app);
    httpServer.listen({ port: 3000 }, () => console.log(`\n🚀      GraphQL is now running on http://localhost:3000/graphql`));
});
