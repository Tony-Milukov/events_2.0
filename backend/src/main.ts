
require('dotenv')
    .config({ path: './.env' });
const express = require('express');
const cors = require('cors');
const sequelize = require('./db.ts');
const router = require('./routes/main.ts');
const bodyParser = require("body-parser")
const app = express();
const session = require("express-session")

app.use(bodyParser.json())
app.use(cors());


app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}));

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