const express = require('express');
const bodyParser = require('body-parser');
const Agent = require('./src/agent.js');
const DataProcessor = require('./src/processData.js');
const credentials = require('./github-credentials.json');
const path = require('path');

const app = express();

// Used to save the most recently fetched graph
let chartPageData = null;

app.set('view engine', 'ejs');

// Define where ressources are
app.use(express.static(path.join(__dirname, '/static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ encoded: true }));

app.get('/', (req, res) => {
  res.render('pages/index');
});

app.get('/chart', (req, res) => {
  if (chartPageData != null) {
    res.render('pages/chart', chartPageData);
  } else {
    res.render('pages/chart', { chartToDisplay: false });
  }
});

app.post('/chart', (req, res) => {
  const url = req.body.repository;

  const agent = new Agent(credentials);
  agent.fetchAndProcessAllComits(url, (err, array) => {
    const result = DataProcessor(array);
    chartPageData = {
      chartToDisplay: true,
      chartData: result.months,
      committers: result.committer,
      chosenRepo: url,
    };
    res.render('pages/chart', {
      chartToDisplay: true,
      chartData: result.months,
      committers: result.committer,
      chosenRepo: url,
    });
  });
});

app.listen(3000, () => {
});
