const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');
const config = require('./config');

const run = async () => {
    try {
        await mongoose.connect(config.mongo.db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');

        // Очистка всех коллекций
        const collections = await mongoose.connection.db.listCollections().toArray();
        for (const coll of collections) {
            console.log(`Dropping collection: ${coll.name}`);
            await mongoose.connection.db.dropCollection(coll.name);
        }

        // Создание категорий
        const [cpuCategory, hddCategory] = await Category.create([
            {
                title: 'CPUs',
                description: 'Central Processor Units',
            },
            {
                title: 'HDDs',
                description: 'Hard Disk Drives',
            }
        ]);


        // Создание продуктов
        await Product.create([
            {
                title: "Intel core i7",
                price: 300,
                category: cpuCategory._id,
                image: 'uploads/cpu.jpg',
            },
            {
                title: "Seagate BarraCuda 1TB",
                price: 150,
                category: hddCategory._id,
                image: 'uploads/hdd.jpg',
            },
            {
                title: "AMD Ryzen 5 3600",
                price: 200,
                category: cpuCategory._id,
                image: 'uploads/intel.jpeg',
            },
            {
                title: "Western Digital 2TB",
                price: 180,
                category: hddCategory._id,
                image: 'uploads/ncn.jpeg',
            }
        ]);


        // Создание пользователей
         await User.create([
            {
                email: 'admin@gmail.com',
                password: 'admin',
                token: nanoid(),
                role: 'admin',
                displayName: 'Admin'
            },
            {
                email: 'user@gmail.com',
                password: 'user',
                token: nanoid(),
                role: 'user',
                displayName: 'User'
            }
        ]);


        console.log('Data seeded successfully');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await mongoose.disconnect();
        console.log('MongoDB disconnected');
    }
};

// Экспортируем функцию по умолчанию
module.exports = run;
