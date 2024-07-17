const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const config = require('./config');
const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');

const run = async () => {
    await mongoose.connect(config.mongo.db);
    const collections = await mongoose.connection.db.listCollections().toArray();
    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [cpuCategory, hddCategory] = await Category.create({
        title: 'CPUs',
        description: 'Central Processor Units',
    }, {
        title: 'HDDs',
        description: 'Hard Disk Drives',
    });

    await Product.create({
        title: "Intel core i7",
        price: 300,
        category: cpuCategory._id,
        image: 'fixtures/cpu.jpg',
    }, {
        title: "Seagate BarraCuda 1TB",
        price: 150,
        category: hddCategory._id,
        image: 'fixtures/hdd.jpg',
    }, {
        title: "AMD Ryzen 5 3600",
        price: 200,
        category: cpuCategory._id,
        image: 'fixtures/intel.jpg',
    }, {
        title: "Western Digital 2TB",
        price: 180,
        category: hddCategory._id,
        image: 'fixtures/ncn.jpg',
    });

    await User.create({
        username: 'admin',
        password: 'admin',
        token: nanoid(),
    }, {
        username: 'user',
        password: 'user',
        token: nanoid(),
    });

    await mongoose.connection.close();
};

run().catch(console.error);
