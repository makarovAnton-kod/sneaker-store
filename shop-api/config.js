const path = require('path');
const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    mongo: {
        db: "mongodb+srv://mamzigran:6Nh-dNr-N98-5MC@cluster0.xnmipzn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
    },
};
