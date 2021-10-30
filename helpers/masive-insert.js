const fs = require('fs');
const csv = require('csvtojson');

const convertAllToJson = ( currentDir , [...arrayFiles] ) => {
    return new Promise ((res, rej) => {
        let resCsv = [];
        arrayFiles.map( ( file ) => {
            const fileDate = file.split('-CasosConfirmados.csv').shift();
            const fullUrl = currentDir + file;
            csv()
                .fromFile(fullUrl)
                .subscribe( jsonCsv =>{
                    jsonCsv.fechaCaso = fileDate;
                    resCsv.push(jsonCsv);
                })
                .then(() => {
                    res(resCsv);
                });
        });
    }).catch(err =>{ throw err} )
}

const createBulkData = async arrayJson => {
    
}

const readAllFiles = (dirname) => {
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
    readAllFiles
}