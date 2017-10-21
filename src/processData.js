function processDataCharts(array) {
  const monthlyCommit = [];
  const committerCount = [];
  const committer = [];
  const months = { dates: [], nbOfCommits: [], highestValue: 0 };

  let i;
  let j = -1;
  for (i = array.length - 1; i >= 0; i -= 1) {
    const log = array[i].committer.login;
    if (committerCount[log] == null) {
      committerCount[log] = { name: array[i].committer.name, count: 0 };
    }
    committerCount[log].count += 1;

    if (j === -1) {
      j += 1;
      monthlyCommit[j] = {
        date: new Date(array[i].date.getFullYear(), array[i].date.getMonth()),
        count: 0,
      };
    }

    while (monthlyCommit[j].date < array[i].date) {
      const m = monthlyCommit[j].date.getMonth();
      const y = monthlyCommit[j].date.getFullYear();
      j += 1;
      monthlyCommit[j] = { date: new Date(y + ((m + 1) % 12 === 0), (m + 1) % 12), count: 0 };
    }

    monthlyCommit[j].count += 1;
  }

  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const x in committerCount) {
    committer.push(committerCount[x]);
  }

  committer.sort((a, b) => b.count - a.count);

  monthlyCommit.forEach((x) => {
    months.dates.push(`${x.date.getFullYear()} -  ${x.date.getMonth() + 1}`);
    months.nbOfCommits.push(x.count);
    if (months.highestValue < x.count) {
      months.highestValue = x.count;
    }
  });

  return { months, committer };
}

module.exports = processDataCharts;
