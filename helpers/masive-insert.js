const fs = require('fs');
const csv = require('csvtojson');
const ConfirmedCase = require('../models/ConfirmedCase');
const Comuna = require('../models/Comuna');

const convertAllCasesToJson = ( currentDir , [...arrayFiles] ) => {

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

const convertAllComunasToJson = (currentDir , [...arrayFiles]) => {

    return new Promise ((res, rej) => {
        let resCsv = [];
        arrayFiles.map( ( file ) => {
            const fullUrl = currentDir + file;
            csv()
                .fromFile(fullUrl)
                .subscribe( jsonCsv => {
                    resCsv.push(jsonCsv);
                })
                .then(() => {
                    res(resCsv);
                });
        });
    }).catch(err =>{ throw err} );

}

const createBulkDataComunas = async arrayJson => {
    
    const bulk = Comuna.collection.initializeOrderedBulkOp();
    for (const item of arrayJson) {
        bulk.insert({
            id_comuna:   Number(item["id_comuna"]),
            nombre:      item["nombre"],
        })
    }
    const result = await bulk.execute();
    return result;
    
}

const createBulkDataCases = async arrayJson => {
    
    const bulk = ConfirmedCase.collection.initializeOrderedBulkOp();
    for (const item of arrayJson) {
        bulk.insert({
            region:             item["Region"],
            codigo_region:      Number(item["Codigo region"]),
            comuna:             item["Comuna"],
            codigo_comuna:      Number(item["Codigo comuna"]),
            poblacion:          Number(item["Poblacion"]),
            casos_confirmados:  Number(item["Casos Confirmados"]),
            fechaCaso:          new Date(item["fechaCaso"])
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
    convertAllCasesToJson,
    readAllFiles,
    createBulkDataCases,
    convertAllComunasToJson,
    createBulkDataComunas
}