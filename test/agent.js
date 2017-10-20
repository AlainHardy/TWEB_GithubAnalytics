const chai = require('chai');
const credentials = require('../github-credentials.json');
const Agent = require('../src/agent.js');
const Chart = require('../src/chart.js');

const should = chai.should();

describe('agent', () => {
    /*
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
    //*/
    /*
    it('should fetch commits', (done) => {
        const owner = 'spring-projects';
        const repo = 'spring-kafka';
        const agent = new Agent(credentials);
        agent.fetchAndProcessAllComits(owner, repo, (err, abc) => {
            should.not.exist(err);
            abc.should.be.an('array');
            done();
        });
    });
    //*/
    //*
    it('should seperate data', (done) => {
        const owner = 'spring-projects';
        const repo = 'spring-kafka';
        const agent = new Agent(credentials);
        agent.fetchAndProcessAllComits(owner, repo, (err, abc) => {
            var test = Chart(abc);
            test.should.not.be.empty;
            var x;
            for(x in test.committerCount) {
                console.log(test.committerCount[x].name);
            }

            done();
        });

    });
    //*/
});
