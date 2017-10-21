const express = require('express');
const bodyParser = require('body-parser');
const Agent = require(__dirname+'/src/agent.js');
const Chart = require(__dirname+'/src/chart.js');
const credentials = require(__dirname+'/github-credentials.json');

const app = express();

app.set('view engine', 'ejs');

// Define where ressources are
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({encoded:true}));


app.get('/', function (req, res) 
{
    //res.sendFile('/www/index.html', {root:__dirname});
    //res.sendFile(__dirname+'/www/index.html');
    res.render('pages/index', {myPath:__dirname});
});

app.get('/chart', function(req, res) {
    
    res.render('pages/chart', {chartToDisplay: false});    
});

app.post('/chart', function(req, res) {

    const owner = 'spring-projects';
    const repo = 'spring-kafka';

    const url = req.body.repository;

    const agent = new Agent(credentials);
    agent.fetchAndProcessAllComits(url, (err, array) => {
        const result = Chart(array);

        res.render('pages/chart',{chartToDisplay: true, chartData: result.months, committers: result.committer});
    });
});

app.listen(3000, function() {
    console.log('Listening on port 3000');
})

app.get('/about', function (req, res) {
    res.render('pages/about');
});