const Hapi = require('hapi');
const Config = require('config');
const { ApolloServer } = require('apollo-server-hapi');

const MongoDB = require('./services/mongo');
const rootSchema = require('./graphql/root-schema');

const server = new ApolloServer({
  typeDefs: rootSchema.typeDefs,
  resolvers: rootSchema.resolvers,
  context: ({ request }) => ({
    user: request.auth.credentials,
  }),
});

/**
 * Application Configuration
 */
const app = Hapi.server({
  port: Config.get('server.port'),
  host: Config.get('server.host'),
  debug: { log: ['*'], request: ['*'] }
});

async function startServer() {
  await server.applyMiddleware({ app });

  try {
    await server.installSubscriptionHandlers(app.listener);
    await app.start();
    console.log(`Server is running at: ${app.info.uri}`);
  } catch (err) {
    console.log(`Error while starting server: ${err.message}`);
  }
}


async function middleware() {
  // app.ext([
  //   {
  //     type: 'onPreAuth',
  //     method: (request, h) => {
  //       const { headers: { accept = '' } } = request;
  //       const isJSON = accept.includes('application/json');
  //       request.isJSON = isJSON;
  //       return h.continue;
  //     }
  //   }
  // ]);
}

async function services() {
  const mongodb = Config.get('mongodb');

  await app.register({
    plugin: MongoDB,
    options: {
      hosts: mongodb.hosts,
      db: mongodb.database,
      username: mongodb.username,
      password: mongodb.password,
      connectOpts: mongodb.options,
    }
  });
}

async function initialize() {
  await middleware();
  await services();
  await startServer();
  app.log('info', `Server running at: ${app.info.uri}`);
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

initialize();
