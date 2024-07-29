const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');
const SeedStatus = require('./models/SeedStatus');

const run = async () => {
    try {
        const seedStatus = await SeedStatus.findOne();
        if (seedStatus && seedStatus.seeded) {
            console.log('Data already seeded');
            return;
        }

        // Очистка всех коллекций
        const collections = await mongoose.connection.db.listCollections().toArray();
        for (const coll of collections) {
            await mongoose.connection.db.dropCollection(coll.name);
        }

        // Создание категорий
        const [cpuCategory, hddCategory] = await Category.create([
            { title: 'CPUs', description: 'Central Processor Units' },
            { title: 'HDDs', description: 'Hard Disk Drives' }
        ]);

        // Создание продуктов
        await Product.create([
            { title: "Intel core i7", price: 300, category: cpuCategory._id, image: 'images/cpu.jpg' },
            { title: "Seagate BarraCuda 1TB", price: 150, category: hddCategory._id, image: 'images/hdd.jpg' },
            { title: "AMD Ryzen 5 3600", price: 200, category: cpuCategory._id, image: 'images/intel.jpeg' },
            { title: "Western Digital 2TB", price: 180, category: hddCategory._id, image: 'images/ncn.jpeg' }
        ]);

        // Создание пользователей
        await User.create([
            { email: 'admin@gmail.com', password: 'admin', token: nanoid(), role: 'admin', displayName: 'Admin' },
            { email: 'user@gmail.com', password: 'user', token: nanoid(), role: 'user', displayName: 'User' }
        ]);

        // Установка флага, что данные загружены
        if (!seedStatus) {
            await SeedStatus.create({ seeded: true });
        } else {
            seedStatus.seeded = true;
            await seedStatus.save();
        }

        console.log('Data seeded successfully');
    } catch (error) {
        console.error('Error seeding data:', error);
    }
};

module.exports = run;
