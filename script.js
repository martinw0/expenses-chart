var chart = document.querySelector('.card .chart');
fetch('data.json')
.then(function (response) {
    if (!response.ok) {
        throw new Error("HTTP error " + response.status);
    }
    return response.json();
})
.then(function (json) {
    var amounts = json.map(function (el) { return el.amount; });
    amounts = amounts.sort();
    amounts = amounts.reverse();
    var biggestAmount = amounts[0];
    var ratio = chart.clientHeight / biggestAmount;
    json.forEach(element => {
        document.querySelector('.chart .' + element.day + ' .bar').style.height = element.amount * ratio + 'px';
        if (element.amount === biggestAmount) {
            document.querySelector('.chart .' + element.day + ' .bar').classList.add('biggest');
        }
    });
});