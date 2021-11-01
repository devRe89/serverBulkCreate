const mongoose = require('mongoose');

const ComunasSchema = mongoose.Schema({
    id_comuna : {
        type : Number,
        require: true,
    },
    nombre: {
        type : String,
        require: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Comunas', ComunasSchema, 'comunas');
