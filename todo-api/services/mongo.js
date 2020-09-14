const Mongoose = require('mongoose');

const MongoDB = {
  name: 'HapiMongo',
  version: '1.1.0',
  register: async (server, options) => {
    const hosts = options.hosts.join(',');
    const connectionString = `mongodb://${hosts}/${options.db}`;

    Mongoose.connect(connectionString, options.connectOpts);

    const connection = Mongoose.connection;

    connection.on('error', e => server.log(e));
  }
};

module.exports = MongoDB;
