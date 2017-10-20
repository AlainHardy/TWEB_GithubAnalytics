const request = require('superagent');


class Agent {
    constructor(credentials) {
        this.credentials = credentials;
    }


    fetchAndProcessAllPullRequests(owner, repo, allPullRequestsAreAvailable) {
        const targetUrl = `https://api.github.com/repos/${owner}/${repo}/pulls?state=all`;
        let pullRequests = [];
        function fetchAndProcessPage(pageUrl, credentials) {
            request
                .get(pageUrl)
                .auth(credentials.username, credentials.token)
                .end((err, res) => {
                    pullRequests = pullRequests.concat(res.body);
                    if(res.links.next) {
                        fetchAndProcessPage(res.links.next, credentials);
                    } else {
                        allPullRequestsAreAvailable(null, pullRequests);
                    }
                });
        }
        fetchAndProcessPage(targetUrl, this.credentials);
    }
    //*
    fetchAndProcessAllComits(owner, repo, allCommitsAreAvailable) {
        const targetUrl = `https://api.github.com/repos/${owner}/${repo}/commits`;
        let commits = [];
        function fetchAndProcessPage(pageUrl, credentials) {
            request
                .get(pageUrl)
                .auth(credentials.username, credentials.token)
                .end((err, res) => {
                    //commits = commits.concat(res.body);
                    var i;
                    for(i = 0; i < res.body.length; i++) {
                        let tempArray = [];
                        
                        tempArray.push({'date':res.body[i].commit.committer.date});
                        tempArray.push({'commiter': {'id':res.body[i].committer.id,'name':res.body[i].commit.committer.name}});
                        commits.push(tempArray);
                    }

                    if(res.links.next) {
                        fetchAndProcessPage(res.links.next, credentials);
                    } else {
                        allCommitsAreAvailable(null, commits);
                    }
                });
        }
        fetchAndProcessPage(targetUrl, this.credentials);
    }
    //*/
}

module.exports = Agent;