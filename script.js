var chart = document.querySelector('.card .chart');
var day = document.querySelector('.chart .day.mon p');
var span = document.querySelector('.chart .day.mon span');
var dayHeight = day.offsetHeight;
dayHeight += parseInt(window.getComputedStyle(day).getPropertyValue('margin-top'));
dayHeight += parseInt(window.getComputedStyle(day).getPropertyValue('margin-bottom'));
var spanHeight = span.offsetHeight;
spanHeight += parseInt(window.getComputedStyle(span).getPropertyValue('margin-top'));
spanHeight += parseInt(window.getComputedStyle(span).getPropertyValue('margin-bottom'));
var maxBarSize = chart.clientHeight - dayHeight - spanHeight;
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
    var ratio =  maxBarSize / biggestAmount;
    json.forEach(element => {
        document.querySelector('.chart .' + element.day + ' .bar').style.height = element.amount * ratio + 'px';
        if (element.amount === biggestAmount) {
            document.querySelector('.chart .' + element.day + ' .bar').classList.add('biggest');
        }
        document.querySelector('.chart .' + element.day + ' span').innerHTML = '$' + element.amount;
    });
});