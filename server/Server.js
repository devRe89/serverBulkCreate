require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const connectDB = require('../config/dbMongo');
class Server {

    constructor(){
        this.port = process.env.PORT || 4000;
        this.app = express();
        this.middlewares();
        this.routes();
        connectDB();
    }

    middlewares(){
        this.app.use( express.json() );
        this.app.use( cors() );
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes(){
        this.app.use('/data-covid', require('../routes/covid'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server Run In Port ${this.port}`);
        });
    }
}

module.exports = Server;