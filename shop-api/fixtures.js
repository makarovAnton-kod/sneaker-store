import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import config from './config.js';
import User from './models/User.js';
import Category from './models/Category.js';
import Product from './models/Product.js';

const run = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.mongo.db, config.mongo.options); // Подключаемся к базе данных
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('categories');
        await db.dropCollection('orders');
        await db.dropCollection('products');

        // Создание категорий
        const [actionCategory, rpgCategory, strategyCategory] = await Category.create([
            { title: 'Экшн', description: 'Захватывающие игры с динамичным сюжетом' },
            { title: 'РПГ', description: 'Ролевые игры с глубоким погружением' },
            { title: 'Стратегии', description: 'Игры, требующие тактического мышления' }
        ]);

        // Создание продуктов
        await Product.create([
            { title: "Cyberpunk 2077", price: 1999, category: actionCategory._id, image: 'fixtures/cyberpunk2077.jpeg' },
            { title: "The Witcher 3: Wild Hunt", price: 1499, category: rpgCategory._id, image: 'fixtures/witcher3.jpeg' },
            { title: "Civilization VI", price: 999, category: strategyCategory._id, image: 'fixtures/civ6.jpeg' },
            { title: "DOOM Eternal", price: 1799, category: actionCategory._id, image: 'fixtures/doom_eternal.jpeg' },
            { title: "Dark Souls III", price: 1299, category: rpgCategory._id, image: 'fixtures/darksouls3.jpeg' },
            { title: "Starcraft II", price: 1099, category: strategyCategory._id, image: 'fixtures/starcraft2.jpeg' }
        ]);

        // Создание пользователей
        await User.create([
            { email: 'admin@gmail.com', password: 'admin', token: nanoid(), role: 'admin', displayName: 'Администратор' },
            { email: 'gamer@gmail.com', password: 'gamer', token: nanoid(), role: 'user', displayName: 'Геймер' }
        ]);

        console.log('Данные успешно загружены и перезаписаны');
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    } finally {
        await mongoose.disconnect(); // Закрываем соединение с базой данных
    }
};

run().then(() => console.log('Скрипт завершен')).catch(console.error);
