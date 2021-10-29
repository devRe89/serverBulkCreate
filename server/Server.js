const express = require('express');
const cors = require('cors');
require('dotenv').config();

class Server {

    constructor(){
        this.port = process.env.PORT || 4000;
        this.app = express();
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server Run In Port ${this.port}`);
        });
    }
}

module.exports = Server;