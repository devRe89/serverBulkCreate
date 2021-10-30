const fs = require('fs');
const csv = require('csvtojson');
const ConfirmedCase = require('../models/ConfirmedCase');

const convertAllToJson = ( currentDir , [...arrayFiles] ) => {

    return new Promise ((res, rej) => {
        let resCsv = [];
        arrayFiles.map( ( file ) => {
            const fileDate = file.split('-CasosConfirmados.csv').shift();
            const fullUrl = currentDir + file;
            csv()
                .fromFile(fullUrl)
                .subscribe( jsonCsv => {
                    jsonCsv.fechaCaso = fileDate;
                    resCsv.push(jsonCsv);
                })
                .then(() => {
                    res(resCsv);
                });
        });
    }).catch(err =>{ throw err} );

}

const createBulkData = async arrayJson => {
    
    const bulk = ConfirmedCase.collection.initializeOrderedBulkOp();
    for (const item of arrayJson) {
        bulk.insert({
            region:             item["Region"],
            codigo_region:      Number(item["Codigo region"]),
            comuna:             item["Comuna"],
            codigo_comuna:      Number(item["Codigo comuna"]),
            poblacion:          Number(item["Poblacion"]),
            casos_confirmados:  Number(item["Casos Confirmados"]),
            fechaCaso:          item["fechaCaso"]
        })
    }
    const result = await bulk.execute();
    return result;
    
}

const readAllFiles = dirname => {

    return new Promise((res, rej) => {
      fs.readdir(dirname, (error, filenames) => {
        if (error) {
          rej(error);
        } else {
          res(filenames);
        }
      });
    });

};

module.exports = {
    convertAllToJson,
    readAllFiles,
    createBulkData
}