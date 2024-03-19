const mongoose = require('mongoose');

// const mongoURI = 'mongodb://localhost:27018/dissidentdata';
const mongoURI = "mongodb://vboyce:vboyce@localhost:2999/firstcrankreplication?retryWrites=true&w=majority" 

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

console.log(mongoURI)

module.exports = mongoose;
