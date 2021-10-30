const mongoose = require('mongoose');

const ConfirmedCaseSchema = mongoose.Schema({
    region: {
        type: String,
        require: true,
    },
    codigo_region: {
        type: Number,
        require: true,
    },
    comuna: {
        type: String,
        require: true,
    },
    codigo_comuna: {
        type: Number,
        require: true,
    },
    poblacion: {
        type: Number,
        require: true,
    },
    casos_confirmados: {
        type: Number,
        require: true,
    },
    fechaCaso: {
        type: Date,
        require: true,
    }
},{ timestamps: true });

module.exports = mongoose.model('ConfirmedCase', ConfirmedCaseSchema, 'confirmed_case');