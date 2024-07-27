const path = require('path');
const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    mongo: {
        db: 'mongodb+srv://mamzigran:oVWph6fNqGZndqua@cluster0.xnmipzn.mongodb.net/shop-project?retryWrites=true&w=majority',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
    },
};
