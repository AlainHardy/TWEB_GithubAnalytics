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
          if (res.links.next) {
            fetchAndProcessPage(res.links.next, credentials);
          } else {
            allPullRequestsAreAvailable(null, pullRequests);
          }
        });
    }
    fetchAndProcessPage(targetUrl, this.credentials);
  }
  fetchAndProcessAllComits(url, allCommitsAreAvailable) {
    const targetUrl = `https://api.github.com/repos/${url}/commits`;
    let commits = [];
    function fetchAndProcessPage(pageUrl, credentials) {
      request
        .get(pageUrl)
        .auth(credentials.username, credentials.token)
        .end((err, res) => {
          let i = null;
          for (i = 0; i < res.body.length; i += 1) {
            const log = res.body[i].committer == null ?
              res.body[i].commit.committer.email : res.body[i].committer.login;
            const stringDate = new Date(res.body[i].commit.committer.date);
            const tempArray = [{
              date: new Date(stringDate.getFullYear(), stringDate.getMonth()),
              committer: { login: log, name: res.body[i].commit.committer.name },
            }];
            commits = commits.concat(tempArray);
          }

          if (res.links.next) {
            fetchAndProcessPage(res.links.next, credentials);
          } else {
            allCommitsAreAvailable(null, commits);
          }
        });
    }
    fetchAndProcessPage(targetUrl, this.credentials);
  }
}

module.exports = Agent;
