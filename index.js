
const fs = require('fs')
const express = require('express')
const moment = require('moment')

const app = express();
const PORT = 8000

// API Endpoint to create a TimeStamp file with current timestamp inside a folder
// "/createTimestampFile" is the endpoint name

app.get('/createTimeStampFile', (req, res) => {
    const date = new Date().toString() //long format timestamp
    const timeStamp = moment().format("YYYY-MM-DD_HH-mm-ss") //short format timestamp for filename

    //create a file with timwstamp
    fs.writeFile(`./TimeStampFiles/${timeStamp}.txt`, date, (err) => {
        if (err) {
            console.log(err);
            res.send("Timestamp file could not be created")
        } else {
            res.send(`Timestamp file has been created sucessfully ===> ${date}`)
        }
    })
})

// API Endpoint to retrieve a list of all text files in the given folder.
// "/getAllTextFiles" is the endpoint name.

app.get('/getAllTextFiles', (req, res) => {
    //retrieving the text files from the folder
    fs.readdir('./TimeStampFiles', (err, files) => {
        if (err) {
            res.send("The text files could not be retrieved");
        } else {
            var timeStampFiles = [];
            files.map((txt) => {
                //display the contents of the text files and their content timestamps
                var temp=fs.readFileSync(`./TimeStampFiles/${txt}`,'utf-8')
                timeStampFiles.push(`${txt}  ===>  ${temp}`)
            });
            res.send({timeStampFiles});
        }
    })
})

app.listen(PORT, () => {
    console.log("Server running on PORT:", PORT);
})

