function makeChart(a) {
    var monthlyCommit = [];
    var committerCount = [];

    var i;
    var j = -1;
    for(i = a.length-1; i >= 0; i--) {
        let log = a[i].committer.login;
        if(committerCount[log] == null) {
            committerCount[log] = {name : a[i].committer.name , count : 0};
        }
        committerCount[log].count += 1;

        let year = a[i].date.getFullYear();
        let month = a[i].date.getMonth();
        if(j == -1 || (monthlyCommit[j].date.getFullYear() != year, month && monthlyCommit[j].date.getMonth() != month)){
            monthlyCommit[++j] = {date : new Date(year, month), count : 0};
        }
        monthlyCommit[j].count += 1;
    }

    var committer = [];
    var x;
    for(x in committerCount) {
        committer.push(committerCount[x]);
    }
    committer.sort((a,b) => {return b.count-a.count;});

    var months = {dates: [], nbOfCommits: [], highestValue: 0};
    for(x in monthlyCommit) {
        months.dates.push(monthlyCommit[x].date.getFullYear()+"-"+(monthlyCommit[x].date.getMonth()+1));
        months.nbOfCommits.push(monthlyCommit[x].count);
        if(months.highestValue < monthlyCommit[x].count) {
            months.highestValue = monthlyCommit[x].count;
        }
    }

    return {months, committer};
}

module.exports = makeChart;
