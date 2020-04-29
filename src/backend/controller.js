const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

var mysql = require('mysql2');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

app.use(bodyParser.json());



router.get('/getData', function(req, res, next) {
    console.log("Received GET request")
    let connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        password : 'testing',
        database : 'tkd'
    });
    connection.query('SELECT * FROM tkd.profile WHERE (`active` = \'1\')', function(error, results, fields) {
        if(error) throw error;
        console.log(JSON.stringify(results));
        res.json((results));
    });
});


router.post('/putData', (req, res) => {
    let connection = mysql.createConnection({
        host     : '127.0.0.1',
        user     : 'root',
        password : 'testing',
        database : 'tkd'
    });

    connection.connect(function(err){
    connection.query('INSERT INTO profile (name, sex, birthdate, weight, rank, umpire, active, school, instructor) ' +
        'VALUES (\'' + req.body.name + '\', \'' + req.body.sex + '\', \'' + req.body.birthdate +
        '\', \'' + req.body.weight + '\', \'' + req.body.rank + '\', \'' + req.body.umpire + '\', \'' +
        req.body.active + '\', \'' + req.body.school + '\', \'' + req.body.instructor + '\');',
        function (error, results, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                console.log("great success!");
            }
        });
    });


});


app.get('/products/:id', cors(), function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for a Single Route'})
});


app.use('/api', router);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
