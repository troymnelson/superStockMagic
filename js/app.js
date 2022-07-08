/* ******************* */
/* declaring variables */
/* ******************* */
var today = moment().format('MMMM Do YYYY, hh:mm:ss a');
console.log(today);
var sym = 'AAPL';

var newPElText = today;
var pEl = $('#time');

const secret = `sk_da0e19d152f54558b107737950eee80b`;
const pub = `pk_de2544713f8442618866a25c57e5e264`;

$(pEl).text(today);

/* grabbing the stock overview for a certain ticker */
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

/* grabbing news data from the alpha vantage api */
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



/* grabbing stuff from iexcloud API */
fetch(`https://cloud.iexapis.com/stable/stock/${sym}/quote?token=${pub}`)
  .then(function (response) {
    let data0 = response;
    console.log(data0);
    return data0.json();
})
  .then(function (data) {
    let results = data;
    console.log(results);
});