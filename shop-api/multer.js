const multer = require('multer');
const { promises: fs } = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');
const config = require('./config');

// Настройка хранилища для multer
const imageStorage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const destDir = path.join(config.publicPath, 'images'); // Уберите слэш перед 'images'
        await fs.mkdir(destDir, { recursive: true });
        cb(null, destDir);
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        const filename = randomUUID() + extension; // Удалите '/images' из пути
        cb(null, filename);
    },
});

const imagesUpload = multer({ storage: imageStorage });

module.exports = { imagesUpload };
