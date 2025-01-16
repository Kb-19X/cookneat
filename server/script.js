

const connectToDatabase = require('./connect');

async function run() {
    const db = await connectToDatabase();

    const salesCollection = db.collection('sales');

    // Insérer des documents
    await salesCollection.insertMany([
        { item: 'abc', price: 10, quantity: 2, date: new Date('2014-03-01T08:00:00Z') },
        { item: 'jkl', price: 20, quantity: 1, date: new Date('2014-03-01T09:00:00Z') },
        { item: 'xyz', price: 5, quantity: 10, date: new Date('2014-03-15T09:00:00Z') },
        { item: 'xyz', price: 5, quantity: 20, date: new Date('2014-04-04T11:21:39.736Z') },
        { item: 'abc', price: 10, quantity: 10, date: new Date('2014-04-04T21:23:13.331Z') },
        { item: 'def', price: 7.5, quantity: 5, date: new Date('2015-06-04T05:08:13Z') },
        { item: 'def', price: 7.5, quantity: 10, date: new Date('2015-09-10T08:43:00Z') },
        { item: 'abc', price: 10, quantity: 5, date: new Date('2016-02-06T20:20:13Z') },
    ]);

    console.log('Documents insérés.');

    // Rechercher des ventes du 4 avril 2014
    const salesOnApril4th = await salesCollection.find({
        date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') }
    }).count();

    console.log(`${salesOnApril4th} ventes ont eu lieu le 4 avril 2014.`);

    // Aggregation : total des ventes en 2014
    const totalSales2014 = await salesCollection.aggregate([
        { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
        { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: ['$price', '$quantity'] } } } }
    ]).toArray();

    console.log('Total des ventes en 2014 :', totalSales2014);

    // Fermer la connexion
    await db.client.close();
    console.log('Connexion fermée.');
}

run().catch(console.error);
