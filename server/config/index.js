const { MongoClient } = require('mongodb');
const uri = process.env.ATLAS_URI;

exports.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });