import path from 'path';

const rootPath = __dirname;

const config = {
    rootPath,
    port: parseInt(process.env['PORT'] || '8000'),
    publicPath: path.join(rootPath, 'public'),
    mongoose: {
        db: process.env['MONGO_DB_URL '] || 'mongodb://localhost/shop-project',
    },
};

export default config;
