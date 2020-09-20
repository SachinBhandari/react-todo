const mongoose = require('mongoose');
mongoose.Promise = Promise;

let options = {
  autoIndex: false,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(process.env.MONGODB, options);

mongoose.connection.on('error', function () {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

mongoose.connection.once('open', () => {
  console.log("mongodb running");
});

