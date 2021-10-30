const path = require('path');
const { convertAllToJson, readAllFiles, createBulkData } = require('../helpers/masive-insert');

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
        const dataCsvJson = await convertAllToJson(currentDir, arrayFiles);
        if ( !dataCsvJson ) {
            return res.status(400).json({
                msg: `No se genero ninguna informaciòn a partir del recorrido de los csv`
            });
        }
        const result = await createBulkData(dataCsvJson);
        return res.status(200).json({
            result,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.response,
        })
    }

}