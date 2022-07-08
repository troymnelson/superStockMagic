
var today = moment().format('MMMM Do YYYY, hh:mm:ss a');
console.log(today);
var sym = 'AAPL';


var newPElText = today;
var pEl = $('#time');

$(pEl).text(today);

fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${sym}&apikey=U9H8L320ZL3GRGKS`)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        let results = data;
        // console.log(results);
        console.log(results);
    })  
    .catch(function (err) {
        console.error(err);
    });

fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&topics=technology&apikey=U9H8L320ZL3GRGKS`)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        let results = data;
        // console.log(results);
        console.log(results);
    })  
    .catch(function (err) {
        console.error(err);
    });

