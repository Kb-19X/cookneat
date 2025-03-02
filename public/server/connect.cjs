const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://davidmnr571:fMnGnvu5clhYJBbm@cookneatcluster.t55e9.mongodb.net/?retryWrites=true&w=majority&appName=CookNeatClusternp";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const db = client.db("cookneatcluster");
        console.log("Collections in database:");
        const collections = await db.listCollections().toArray();
        collections.forEach(coll => console.log(coll.name));
    } finally {
        await client.close();
    }
}
run().catch(console.dir);
