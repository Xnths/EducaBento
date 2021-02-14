const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/registros');
mongoose.Promise = global.Promise;