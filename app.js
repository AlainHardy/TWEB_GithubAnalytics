const express = require('express');

const app = express();
const fun = require('./src/test');

app.set('view engine', 'ejs');

// Define where ressources are
app.use(express.static(__dirname + '/static'));


app.get('/', function (req, res) {
    //res.sendFile('/www/index.html', {root:__dirname});
    //res.sendFile(__dirname+'/www/index.html');
    var total = fun.addition(1,2);
    res.render('pages/index', {myPath:__dirname, tot: total});
});

app.listen(3000, function() {
    fun.testOfArray();
    console.log('Listening on port 3000');
})

app.get('/about', function (req, res) {
    res.render('pages/about');
});