const express = require('express');
const Agent = require(__dirname+'/src/agent.js');
const Chart = require(__dirname+'/src/chart.js');
const credentials = require(__dirname+'/github-credentials.json');

const app = express();
const fun = require('./src/test');

app.set('view engine', 'ejs');

// Define where ressources are
app.use(express.static(__dirname + '/static'));


app.get('/', function (req, res) 
{
    //res.sendFile('/www/index.html', {root:__dirname});
    //res.sendFile(__dirname+'/www/index.html');
    var total = fun.addition(1,2);
    res.render('pages/index', {myPath:__dirname, tot: total});
});

app.get('/chart', function(req, res) {

    // Maybe render some waiting page

    const owner = 'spring-projects';
    const repo = 'spring-kafka';

    const agent = new Agent(credentials);
    agent.fetchAndProcessAllComits(owner, repo, (err, array) => {
        const result = Chart(array);

        res.render('pages/chart',{chartData: result.months, committers: result.commiter});
    });
});

app.listen(3000, function() {
    fun.testOfArray();
    console.log('Listening on port 3000');
})

app.get('/about', function (req, res) {
    res.render('pages/about');
});