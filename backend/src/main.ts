require('dotenv')
    .config({path: './.env'});
const express = require('express');
const cors = require('cors');
const sequelize = require('./db.ts');
const router = require('./routes/main.ts');
const bodyParser = require("body-parser")
const helmet = require('helmet')
const fileUpload = require('express-fileupload');

const app = express();

app.use(fileUpload());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

app.use('/images', express.static('src/public'));

app.use(cors());

app.use(helmet())

app.use('/api', router);


const start = async (PORT: any) => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        app.listen(PORT, () => console.log(`Server was started, and is running on PORT: ${PORT}`));
    } catch (err) {
        console.error(err);
    }
};
start(process.env.PORT);