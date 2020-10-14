const express = require('express');
const app = express();
const Datastore = require('nedb')
const busboy = require('connect-busboy');


app.use(busboy())
const port = 3000;
// Datastore localfile in the same directory
const databse = new Datastore('database.db');
databse.loadDatabase();

app.listen(3000, () => {
    console.log('listening at 3000');
})

app.use(express.static('public'));


// Handle Uploading Images here 
app.post("/api", (request, response) => {

   
    request.pipe(request.busboy);
    request.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
        file.on('data', function(data) {
          console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
        });
        file.on('end', function() {
          console.log('File [' + fieldname + '] Finished');
        });
  });


    
})