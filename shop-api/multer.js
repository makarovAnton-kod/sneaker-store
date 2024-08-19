import { randomUUID } from "crypto";
import config from "./config.js";
import path from "path";
import { promises as fs } from "fs";
import multer from "multer";

// Настройка хранилища для multer
const imageStorage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const destDir = path.join(config.publicPath, 'images'); // Путь к каталогу изображений
        await fs.mkdir(destDir, { recursive: true });
        cb(null, destDir);
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        const filename = randomUUID() + extension; // Генерация уникального имени файла
        cb(null, filename);
    },
});

const imagesUpload = multer({ storage: imageStorage });

export default imagesUpload; // Экспортируем imagesUpload напрямую
