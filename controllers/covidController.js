
const path = require('path');

const { convertAllToJson, readAllFiles } = require('../helpers/masive-insert');

exports.getPrueba = (req, res) => {
    res.status(200).json({
        msg: 'Runnig',
        status: 200
    });
}

// 1. obtener lista de csv
// 2. split fecha del nombre de cada csv
// 3. recorrer cada csv para insertar en modelo 
exports.getDataMasive = async (req, res) => {

    try {
        
        const currentDir = path.join(__dirname, '../bases_covid/');
        const arrayFiles = await readAllFiles(currentDir);
        const response = await convertAllToJson(currentDir, arrayFiles);
        
        res.json({
            res: response,
        })


    } catch (error) {
        
    }




}