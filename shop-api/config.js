import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const rootPath = path.resolve();

export default {
    rootPath,
    publicPath: path.join(rootPath, 'public'),
    mongo: {
        db: process.env.MONGODB_URL || 'mongodb+srv://mamzigran:9fAOhC9aT2zMkQaw@cluster0.xnmipzn.mongodb.net/magazin?retryWrites=true&w=majority&appName=Cluster0',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
};
