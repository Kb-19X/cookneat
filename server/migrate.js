const mongoose = require('mongoose');

const LOCAL_URI = 'mongodb://localhost:27017/cookneatproject'; 
const ATLAS_URI = 'mongodb+srv://DavDB:RTYetuMjOpNSTUTU@cookneat-db.anbbadf.mongodb.net/cookneat?retryWrites=true&w=majority';

const modelName = 'Recipe'; 
const schema = new mongoose.Schema({}, { strict: false }); 
const LocalModel = mongoose.model(modelName, schema);
const RemoteModel = mongoose.model(modelName, schema, modelName); 

async function migrate() {
  try {
    const localConn = await mongoose.createConnection(LOCAL_URI).asPromise();
    const remoteConn = await mongoose.createConnection(ATLAS_URI).asPromise();

    const Local = localConn.model(modelName, schema);
    const Remote = remoteConn.model(modelName, schema);

    const docs = await Local.find();
    if (docs.length === 0) {
      console.log('Aucune donnée à transférer.');
      return;
    }

    await Remote.insertMany(docs);
    console.log(`✅ Transfert réussi : ${docs.length} documents`);

    await localConn.close();
    await remoteConn.close();
  } catch (err) {
    console.error('❌ Erreur de migration :', err);
  }
}

migrate();
