import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import config from './config.js';
import User from './models/User.js';
import Category from './models/Category.js';
import Product from './models/Product.js';

const run = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.mongo.db, config.mongo.options);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('categories');
        await db.dropCollection('orders');
        await db.dropCollection('products');

        // Создание категорий
        const [sneakersCategory, sportswearCategory, accessoriesCategory] = await Category.create([
            { title: 'Кроссовки', description: 'Стильные и удобные кроссовки на любой вкус' },
            { title: 'Спортивная одежда', description: 'Одежда для занятий спортом и активного отдыха' },
            { title: 'Аксессуары', description: 'Разнообразные аксессуары для вашего спортивного образа' }
        ]);

        // Создание продуктов с описанием
        await Product.create([
            {
                title: "Nike Air Max 270",
                price: 7999,
                category: sneakersCategory._id,
                image: 'fixtures/nike_air_max_270.jpeg',
                description: "Кроссовки Nike Air Max 270 обеспечивают комфорт и стиль в одном. Обладают самой большой воздушной подушкой среди моделей Nike, что обеспечивает невероятное ощущение мягкости при каждом шаге."
            },
            {
                title: "Adidas Ultraboost",
                price: 9999,
                category: sneakersCategory._id,
                image: 'fixtures/adidas_ultraboost.jpeg',
                description: "Adidas Ultraboost — это кроссовки, созданные для бега и повседневной носки. Их уникальная технология Boost обеспечивает энергоотдачу и комфорт, делая каждую пробежку легче."
            },
            {
                title: "Puma RS-X3",
                price: 6999,
                category: sneakersCategory._id,
                image: 'fixtures/puma_rsx3.jpeg',
                description: "Puma RS-X3 — это смелый и инновационный дизайн в сочетании с передовыми технологиями амортизации. Эти кроссовки идеально подойдут для тех, кто ценит комфорт и стиль."
            },
            {
                title: "Under Armour T-Shirt",
                price: 2999,
                category: sportswearCategory._id,
                image: 'fixtures/under_armour_tshirt.jpg',
                description: "Футболка Under Armour из легкого материала, который отводит влагу и быстро сохнет, что делает ее идеальной для тренировок и активного отдыха."
            },
            {
                title: "Nike Dri-FIT Pants",
                price: 3499,
                category: sportswearCategory._id,
                image: 'fixtures/nike_dri_fit_pants.jpeg',
                description: "Штаны Nike Dri-FIT созданы для максимального комфорта во время тренировки. Технология Dri-FIT отводит влагу и помогает оставаться сухим и сосредоточенным."
            },
            {
                title: "Adidas Cap",
                price: 1999,
                category: accessoriesCategory._id,
                image: 'fixtures/adidas_cap.jpeg',
                description: "Кепка Adidas с классическим дизайном и регулируемой застежкой обеспечит защиту от солнца и дополнит ваш спортивный образ."
            }
        ]);

        // Создание пользователей
        await User.create([
            { email: 'admin@gmail.com', password: 'admin', token: nanoid(), role: 'admin', displayName: 'Администратор' },
            { email: 'shopper@gmail.com', password: 'shopper', token: nanoid(), role: 'user', displayName: 'Покупатель' }
        ]);

        console.log('Данные успешно загружены и перезаписаны');
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    } finally {
        await mongoose.disconnect();
    }
};

run().then(() => console.log('Скрипт завершен')).catch(console.error);
