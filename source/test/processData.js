const chai = require('chai');
const credentials = require('../github-credentials.json');
const Agent = require('../src/agent.js');
const dataProcessor = require('../src/processData.js');

const should = chai.should();

describe('agent', () => {
  it('parse the array', (done) => {
    const url = 'spring-projects/spring-kafka';
    const agent = new Agent(credentials);
    agent.fetchAndProcessAllComits(url, (err, abc) => {
      const result = dataProcessor(abc);
      should.not.exist(err);
      abc.should.be.an('array');
      result.should.be.an('Object');
      done();
    });
  });
});
