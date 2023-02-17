const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { Transform } = require('stream');

// Input and output file paths
const inputFilePath = path.join(__dirname, 'input.csv');
const outputFilePath = path.join(__dirname, 'output.json');

// Create a transform stream to convert CSV data to JSON
const csvToJsonTransform = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,
  transform(chunk, encoding, callback) {
    const row = {};
    for (let key in chunk) {
      row[key] = chunk[key];
    }
    this.push(row);
    callback();
  },
});

// Create a read stream to read the CSV file
const readStream = fs.createReadStream(inputFilePath);

// Create a write stream to write the JSON file
const writeStream = fs.createWriteStream(outputFilePath);

// Pipe the read stream to the csv-parser to parse the CSV data
readStream.pipe(csv())

  // Pipe the CSV data to the CSV-to-JSON transform stream
  .pipe(csvToJsonTransform)

  // Collect the JSON objects into an array
  .on('data', (data) => {
    jsonRows.push(data);
  })

  // Pipe the array of JSON objects to the write stream to write to the output file
  .on('end', () => {
    writeStream.write(JSON.stringify(jsonRows));
    writeStream.end();
    console.log('Conversion complete');
  })

  // Handle errors
  .on('error', (err) => {
    console.error(`Error: ${err}`);
  });

// Array to hold the JSON rows
const jsonRows = [];





// const fs = require('fs');
// const path = require('path');
// const csv = require('csv-parser');
// const { Transform } = require('stream');

// // Input and output file paths
// const inputFilePath = path.join(__dirname, 'input.csv');
// const outputFilePath = path.join(__dirname, 'output.json');

// // Create a transform stream to convert CSV data to JSON
// const csvToJsonTransform = new Transform({
//   writableObjectMode: true,
//   transform(chunk, encoding, callback) {
//     const row = {};
//     for (let key in chunk) {
//       row[key] = chunk[key];
//     }
//     callback(null, JSON.stringify(row));
//   },
// });

// // Create a read stream to read the CSV file
// const readStream = fs.createReadStream(inputFilePath);

// // Create a write stream to write the JSON file
// const writeStream = fs.createWriteStream(outputFilePath);

// // Pipe the read stream to the csv-parser to parse the CSV data
// readStream.pipe(csv())

//   // Pipe the CSV data to the CSV-to-JSON transform stream
//   .pipe(csvToJsonTransform)

//   // Pipe the JSON data to the write stream to write to the output file
//   .pipe(writeStream)

//   // Handle errors
//   .on('error', (err) => {
//     console.error(`Error: ${err}`);
//   })

//   // Handle completion
//   .on('finish', () => {
//     console.log('Conversion complete');
//   });





// const fs = require('fs');
// const path = require('path');
// const csv = require('csv-parser');
// const { Transform } = require('stream');

// // // Input and output file paths
// // const inputFilePath = path.join(__dirname, 'input.csv');
// // const outputFilePath = path.join(__dirname, 'output.json');

// // // Create a transform stream to convert CSV data to JSON
// // const csvToJsonTransform = new Transform({
// //   objectMode: true,
// //   transform(chunk, encoding, callback) {
// //     try {
// //       const data = JSON.stringify(chunk);
// //       callback(null, data);
// //     } catch (err) {
// //       callback(err);
// //     }
// //   },
// // });

// // // Create a read stream to read the CSV file
// // const readStream = fs.createReadStream(inputFilePath);

// // // Create a write stream to write the JSON file
// // const writeStream = fs.createWriteStream(outputFilePath);

// // // Pipe the read stream to the csv-parser to parse the CSV data
// // readStream.pipe(csv())

// //   // Pipe the CSV data to the CSV-to-JSON transform stream
// //   .pipe(csvToJsonTransform)

// //   // Pipe the JSON data to the write stream to write to the output file
// //   .pipe(writeStream)

// //   // Handle errors
// //   .on('error', (err) => {
// //     console.error(`Error: ${err}`);
// //   })

// //   // Handle completion
// //   .on('finish', () => {
// //     console.log('Conversion complete');
// //     writeStream.end();
// //   });









