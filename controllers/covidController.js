const path = require('path');
const { convertAllCasesToJson, 
        readAllFiles, 
        createBulkDataCases, 
        convertAllComunasToJson, 
        createBulkDataComunas 
    } = require('../helpers/masive-insert');
const ConfirmedCase = require('../models/ConfirmedCase');
const Comuna = require('../models/Comuna');

exports.getAllComunas = async (req, res) => {

    try {
        const currentDir = path.join(__dirname, '../comunas/');
        if ( !currentDir ) {
            return res.status(404).json({
                msg: `No se encontro la carpeta bases_covid`
            });
        }
        const arrayFiles = await readAllFiles(currentDir);
        if ( !arrayFiles ) {
            return res.status(404).json({
                msg: `No se encontraron archivos dentro del directorio propuesto`
            });
        }
        const dataCsvJson = await convertAllComunasToJson(currentDir, arrayFiles);
        if ( !dataCsvJson ) {
            return res.status(400).json({
                msg: `No se genero ninguna informaciòn a partir del recorrido de los csv`
            });
        }
        const result = await createBulkDataComunas(dataCsvJson);
        return res.status(200).json({
            result,
            status: 200
        });
    } catch (error) {
        res.status(500).json({
            msg: error.response,
            status: 500
        });
    }

}

exports.getDataMasive = async (req, res) => {

    try {
        const currentDir = path.join(__dirname, '../bases_covid/');
        if ( !currentDir ) {
            return res.status(404).json({
                msg: `No se encontro la carpeta bases_covid`
            });
        }
        const arrayFiles = await readAllFiles(currentDir);
        if ( !arrayFiles ) {
            return res.status(404).json({
                msg: `No se encontraron archivos dentro del directorio propuesto`
            });
        }
        const dataCsvJson = await convertAllCasesToJson(currentDir, arrayFiles);
        if ( !dataCsvJson ) {
            return res.status(400).json({
                msg: `No se genero ninguna informaciòn a partir del recorrido de los csv`
            });
        }
        const result = await createBulkDataCases(dataCsvJson);
        return res.status(200).json({
            result,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.response,
        })
    }

}

exports.getAllComunas = async (req, res) => {

    try {
        const comunas = await Comuna.find();
        if ( !comunas ) {
            return res.status(404).json({
                status: 404,
                msg: 'No hay comunas para cargar'
            });
        } 
        return res.status(200).json({
            status: 200,
            comunas  
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            msg: error
        });
    }

}

exports.getCasesByComunaAndDate = async (req, res) => {

    try {
        const {comuna, month} = req.headers; 
        const cases = await ConfirmedCase.find({ fechaCaso: { $gte: `${month}-01`, $lte: `${month}-31` }, codigo_comuna : Number(comuna) }, {casos_confirmados: 1, fechaCaso: 1});
        if ( !cases ){
            return res.status(404).json({
                status: 404,
                msg: 'No hay casos confirmados en el mes seleccionado'
            });
        }
        return res.status(200).json({
            status: 200,
            cases, 
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            msg: error
        });
    }

}