
var today = moment().format('MMMM Do YYYY, hh:mm:ss a');
console.log(today);
var sym = 'AAPL';

fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${sym}&apikey=U9H8L320ZL3GRGKS`)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        let results = data;
        console.log(results);
        console.log(data.Description);
    })  
    .catch(function (err) {
        console.error(err);
    });
