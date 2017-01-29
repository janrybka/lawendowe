// Pomocne: https://github.com/kshern/tiny-cli/blob/master/bin/tiny.js#L57
// https://tinypng.com/developers/reference/nodejs
// https://tinypng.com/dashboard/developers

const fs = require('fs');
let tinify = require("tinify");
//let cwait = require("cwait");
//let TaskQueue = cwait.TaskQueue;


if (process.argv.length <= 3) {
  console.log("Usage: " + __filename + " API_KEY path/to/directory");
  process.exit(-1);
}

tinify.key = process.argv[2];
tinify.validate(function (err) {
  if (err) throw err;
  // Validation of API key failed.
}).then(() => {
  console.log(`Podany klucz autoryzacyjny jest ok. Rozpoczynam tworzenie miniatur.`);

  const choosenFolder = process.argv[3];
  const sourcePicFolder = choosenFolder + '/src/';
  const bigPicFolder = choosenFolder + '/big/';
  const minPicFolder = choosenFolder + '/min/';
  const optimazieBig = false;
  fs.readdir(sourcePicFolder, (err, files) => {
    if (err) {
      console.log(`Folder '${sourcePicFolder}' nie został znaleziony`);
      console.log(err);
      return;
    }
    let reg = /(\.jpg)$/; //|(\.png)
    filteredFiles = files.filter((file) => {
      console.log(file + " = " + ((reg.test(file) === true) ? "OK" : "nie"));
      return reg.test(file);
    })


    let startedJobs = [];
    // filteredFiles.forEach(file => {
    // var queue = new TaskQueue(Promise, 1);

    let definitionObject = {
      "folder": "nazwa_folderu",
      "name": "ladna_nazwa_folderu",
      "cover": "najlepsze zdjecie",
      "elements": []
    };
    filteredFiles.map((elem, idx) => {
      let element = { "name": elem.replace(reg, ''), "title": "", "subtitle": "" };
      definitionObject.elements.push(element);
    });
    //console.log(JSON.stringify(definitionObject, null, ' '));
    console.log(`Konfigurację galerii zapisałem do pliku ${choosenFolder + '/gallery.json'}`);
    fs.writeFileSync(choosenFolder + '/gallery.json', JSON.stringify(definitionObject, null, ' '));

    filteredFiles.map(
      // queue.wrap(
      (file) => {
        console.log(`Rozpoczynam procesowanie pliku ${bigPicFolder + file}`);

        let source = tinify.fromFile(sourcePicFolder + file);
        let resizeJob = source.resize({
          method: "fit",
          width: 1900,
          height: 1000
        }).toFile(bigPicFolder + file)
          .then(() => {
            console.log(`Zapis pełnego obrazu do pliku ${bigPicFolder + file} został zakończone`);
            let coverJob = source.resize({
              method: "cover",
              width: 350,
              height: 350
            })
            .toFile(minPicFolder + file);
            return coverJob;
          })
          .then(() => {
            console.log(`Zapis miniatury do pliku ${minPicFolder + file} został zakończony z powodzeniem.`);
          })
          .catch((err) => {
            if (err instanceof tinify.AccountError) {
              console.log("The error message is: " + err.message);
              // Verify your API key and account limit。
              console.log('Sprawdź limit darmowych obrazków.');
            } else {
              // Something else went wrong, unrelated to the Tinify API.
              console.log(`Wykonywanie miniatury dla pliku ${bigPicFolder + file} zakończyło się błędem`);
              if (err) {
                console.log(err);
              }
            }
          });
        startedJobs.push(resizeJob);
      }
      // )
    )
    //});
    Promise.all(
      startedJobs
    )
      .then((msg) => {
        let compressionsThisMonth = tinify.compressionCount;
        console.log(`Do tej pory wykonanych zostało ${compressionsThisMonth} z 500 darmowych.`);
      })
      .catch((err) => {
        console.log(`Wykonywanie miniatur zakończyło się błędem`);
        console.log(err);
      });
  })
});