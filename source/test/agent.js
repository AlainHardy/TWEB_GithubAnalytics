/*const chai = require('chai');
const credentials = require('../github-credentials.json');
const Agent = require('../src/agent.js');

const should = chai.should();

describe('agent', () => {
  it('should fetch pull requests', (done) => {
    const owner = 'spring-projects';
    const repo = 'spring-kafka';
    const agent = new Agent(credentials);
    agent.fetchAndProcessAllPullRequests(owner, repo, (err, pullRequests) => {
      should.not.exist(err);
      pullRequests.should.be.an('array');
      done();
    });
  });
  it('should fetch commits', (done) => {
    const url = 'spring-projects/spring-kafka';
    const agent = new Agent(credentials);
    agent.fetchAndProcessAllComits(url, (err, abc) => {
      should.not.exist(err);
      abc.should.be.an('array');
      done();
    });
  });
});
*/