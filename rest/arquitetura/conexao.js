const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://amantikir:9yHbMhlbS6xxRLDp@cluster0.dw5ap.mongodb.net/educacaoDB?retryWrites=true&w=majority';

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();

        await client.db('admin').command({ ping: 1 });
        console.log("Conectado com sucesso!");
    } finally {
        client.close();
    }
}

run().catch(console.dir);

module.exports = run();