/* ******************* */
/* declaring variables */
/* ******************* */

// variables to show time
var today = moment().format('MMMM Do YYYY, hh:mm:ss a');
console.log(today);

// holds user input for the symbol of stock to search up
var userInputSym = 'AAPL';

// declaring alphaVantageData vantage api variable globally so it can be accessed in any function
let alphaVantageData = '';

// jQuery grabbing elements
var $asidePEl = $('.p-aside');
var $mainPEl = $('.main-p');
var $timePEl = $('.time');
var txt = $("<p></p>").text(moment().format('MMMM Do YYYY, hh:mm:ss a'))
var $headerEl1 = $('.header-el1')
var $headerEl2 = $('.header-el2')
var $headerEl3 = $('.header-el3')

var $techBtn = $('.tech');
var $financeBtn = $('.sci');

var $img1 = $('#img1');
var $img2 = $('#img2');
var $img3 = $('#img3');
var $a1 = $('#a1');
var $a2 = $('#a2');
var $a3 = $('#a3');


setInterval(function () {
  $($timePEl).text(moment().format('MMMM Do YYYY, hh:mm:ss a'));
}, 1000);


console.log(today);
// console.log($asidePEl.text);


const secret = `sk_da0e19d152f54558b107737950eee80b`;
const pub = `pk_de2544713f8442618866a25c57e5e264`;

/* ******************************************************** */
/* this is the onclick function for the stock search button */
/* ******************************************************** */
$(`#stockSearchButton`).click(stockSearch);

function displayStockData(iexData, alphaVantageData) {
  console.log(iexData);
  console.log(alphaVantageData);

  /* ********************************************* */
  /* setting the element value from the api object */
  /* ********************************************* */

  // checks for the value in iexCloud
  if (iexData.companyName) {
    $(`#stockName`).text(iexData.companyName);
    // checks for the value in alphaVantage
  } else if (alphaVantageData.Name) {
    $(`#stockName`).text(alphaVantageData.companyName);
  }

  // these rely on one api so I can't do any checking
  $(`#stockPrice`).text(iexData.latestPrice);
  $(`#stockDesc`).text(alphaVantageData.Description);

  // price color logic 
  let priceColor = `#000`;
  if (iexData.change > 0) {
    priceColor = `#00b300`;
  } else if (iexData.change < 0) {
    priceColor = `#b30000`;
  } else {
    priceColor = `#000`;
  }

  // inserting the price text and styling
  $(`#stockChange`).text(`${iexData.change} ${iexData.changePercent}`);
  $(`#stockChange`).css('color', priceColor);

  // had to do with ES6 because of some jquery probs [Thanks Eric! :)]
  let stockDataEl = document.getElementById('stockData');

  // first clearing the html in the stockData element
  stockDataEl.innerHTML = '';

  // adding all the table info for the stock
  stockDataEl.insertAdjacentHTML('beforeend', `
  <table>
    <tbody>
      <tr>
        <td>Previous Close</td>
        <td>${iexData.previousClose}</td>
      </tr>
      <tr>
        <td>Open</td>
        <td>${iexData.iexOpen}</td>
      </tr>
      <tr>
        <td>52 Week Range</td>
        <td>${iexData.week52High} - ${iexData.week52Low}</td>
      </tr>
      <tr>
        <td>Market Cap</td>
        <td>${bigNumberRounder(iexData.marketCap)}</td>
      </tr>
    </tbody>
  </table>
  `);
}

/* this rounds big numbers to a decimal with their symbol on the end */
function bigNumberRounder(IEXCloudMarketCap) {
  // defines local to this function
  let alphaMarketCap = alphaVantageData.MarketCapitalization;
  // tests for marketCap truthy value
  if (IEXCloudMarketCap) {
    let marketCap = IEXCloudMarkio / superStockMagic /
      etCap;
    return marketCapIfElse(marketCap);
  } else if (alphaVantageData.MarketCapitalization) {
    let marketCap = alphaMarketCap;
    return marketCapIfElse(marketCap);
  }
  // console.log(`bigNum called and marketCap length is:${marketCap.toString().length}`);

  function marketCapIfElse(marketCap) {
    // this grabs the length of the marketcap
    let numLength = marketCap.toString().length;

    // marketCap conversion if/else; the logic is pretty straighforward
    if (numLength > 12) {
      return `${(marketCap / 1000000000000).toFixed(2)}T`;
    } else if (numLength > 9) {
      return `${(marketCap / 1000000000).toFixed(2)}B`;
    } else if (numLength > 6) {
      return `${(marketCap / 1000000).toFixed(2)}M`;
    } else {
      return `${(marketCap / 1000).toFixed(2)}K`;
    }
  }
}

/* this is the iexCloud api function */
function stockSearch() {
  let $userInput = $(`.materialize-textarea`).val();
  // console.log($userInput)
  // validation to make sure user is entering valid ticker strings?
  $userInput = $userInput.toUpperCase();
  $userInput = $userInput.replace(/[^a-z,A-Z ]/g, '');
  if ($userInput) {
    console.log(`grabbed good input: ${$userInput}`);

  } else {
    M.toast({ html: `Error: please enter a valid ticker!` })
  }


  // grabbing data from the alphavantage api
  $.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${$userInput}&apikey=U9H8L320ZL3GRGKS`)
    // hands shaken, data taken
    .then(function (data0) {
      console.log(`alphaVantage was called`);
      alphaVantageData = data0;
    })

  // grabbing stuff from iexcloud API referencing user input
  $.get(`https://cloud.iexapis.com/stable/stock/${$userInput}/quote?token=${pub}`)
    // hands shaken, data taken
    .then(function (data) {
      console.log(`iex called`);

      displayStockData(data, alphaVantageData);
    })
}

/* grabbing the stock overview for a certain ticker */
fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${userInputSym}&apikey=U9H8L320ZL3GRGKS`)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    // let results = data;
    // console.log(results);
    $('.p-aside').text = "hello";
    // console.log($asidePEl); 
    // console.log(data['52WeekHigh']);

  })
  .catch(function (err) {
    console.error(err);
  });

  // On button click technology fetch and display tech news
  $('.tech').click(function() {
    
    $.get(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=technology&apikey=U9H8L320ZL3GRGKS`)
  .then(function (data) {
    let results = data;
    // console.log(results);
  
    var num = Math.floor(Math.random() * 50);
    var num1 = Math.floor(Math.random() * 50);
    var num2 = Math.floor(Math.random() * 50);

    if (num == num1 || num == num2) {
      num = Math.floor(Math.random() * 50)
    } if (num1 == num2) {
      num1 = Math.floor(Math.random() * 50)
    }
  
  
    $headerEl1.text(results.feed[num].title);
    $headerEl1.append('<hr>');
    $headerEl2.text(results.feed[num1].title);
    $headerEl2.append('<hr>');
    $headerEl3.text(results.feed[num2].title);
  
    $a1.attr('href', results.feed[num].url)
    $a2.attr('href', results.feed[num1].url)
    $a3.attr('href', results.feed[num2].url)
    $a1.attr('target', "_blank");
    $a2.attr('target', "_blank");
    $a3.attr('target', "_blank");
    $img1.attr('src', results.feed[num].banner_image)
    if (!($img1.attr('src', results.feed[num].banner_image))) {
      $img1.attr('alt', 'No image found for article')
    }

    console.log(results.feed[num].banner_image)

    if (!($img2.attr('src', results.feed[num1].banner_image))) {
      $img2.attr('alt', 'No image found for article')
    }
    
    console.log(results.feed[num1].banner_image)
    if (!($img1.attr('src', results.feed[num2].banner_image))) {
      $img3.attr('alt', 'No image found for article')
    }
    console.log(results.feed[num2].banner_image)
  
   })  
  .catch(function (err) {
    console.error(err);
  
  })});
  
  

//   $('.tech').click(function ( {
//     ) $.get(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=technology&apikey=U9H8L320ZL3GRGKS`)
//   .then(function (data) {
//     let results = data;
//     // console.log(results);
//     let num = Math.floor(Math.random() * 50);
//     let num1 = Math.floor(Math.random() * 50);
//     let num2 = Math.floor(Math.random() * 50);

//     if (num == num1 || num == num2) {
//       num = Math.floor(Math.random() * 50)
//     } if (num1 == num2) {
//       num1 = Math.floor(Math.random() * 50)
//     }


//     $headerEl1.text(results.feed[num].title);
//     $headerEl1.append('<hr>');
//     $headerEl2.text(results.feed[num1].title);
//     $headerEl2.append('<hr>');
//     $headerEl3.text(results.feed[num2].title);

//     $a1.attr('href', results.feed[num].url)
//     $a2.attr('href', results.feed[num1].url)
//     $a3.attr('href', results.feed[num2].url)
//     $a1.attr('target', "_blank");
//     $a2.attr('target', "_blank");
//     $a3.attr('target', "_blank");
//     $img1.attr('src', results.feed[num].banner_image)
//     $img2.attr('src', results.feed[num1].banner_image)
//     $img3.attr('src', results.feed[num2].banner_image)

// })  
//   .catch(function (err) {
//     console.error(err);

// }));

// On button click technology fetch and display tech news
$('.science').click(function() {
  
  $.get(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=life_science&apikey=U9H8L320ZL3GRGKS`)
.then(function (data) {
  let results = data;
  // console.log(results);
  let num = Math.floor(Math.random() * 50);
  let num1 = Math.floor(Math.random() * 50);
  let num2 = Math.floor(Math.random() * 50);

  if (num == num1 || num == num2) {
    num = Math.floor(Math.random() * 50)
  } if (num1 == num2) {
    num1 = Math.floor(Math.random() * 50)
  }


  $headerEl1.text(results.feed[num].title);
  $headerEl1.append('<hr>');
  $headerEl2.text(results.feed[num1].title);
  $headerEl2.append('<hr>');
  $headerEl3.text(results.feed[num2].title);

  $a1.attr('href', results.feed[num].url)
  $a2.attr('href', results.feed[num1].url)
  $a3.attr('href', results.feed[num2].url)
  $a1.attr('target', "_blank");
  $a2.attr('target', "_blank");
  $a3.attr('target', "_blank");
  $img1.attr('src', results.feed[num].banner_image)
  $img2.attr('src', results.feed[num1].banner_image)
  $img3.attr('src', results.feed[num2].banner_image)
  
})  
.catch(function (err) {
  console.error(err);

})});


 // On button click technology fetch and display tech news
 $('.finance').click(function() {
    
  $.get(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=finance&apikey=U9H8L320ZL3GRGKS`)
.then(function (data) {
  let results = data;
  // console.log(results);

  var num = Math.floor(Math.random() * 50);
  var num1 = Math.floor(Math.random() * 50);
  var num2 = Math.floor(Math.random() * 50);

  if (num == num1 || num == num2) {
    num = Math.floor(Math.random() * 50)
  } if (num1 == num2) {
    num1 = Math.floor(Math.random() * 50)
  }


  $headerEl1.text(results.feed[num].title);
  $headerEl1.append('<hr>');
  $headerEl2.text(results.feed[num1].title);
  $headerEl2.append('<hr>');
  $headerEl3.text(results.feed[num2].title);

  $a1.attr('href', results.feed[num].url)
  $a2.attr('href', results.feed[num1].url)
  $a3.attr('href', results.feed[num2].url)
  $a1.attr('target', "_blank");
  $a2.attr('target', "_blank");
  $a3.attr('target', "_blank");
  $img1.attr('src', results.feed[num].banner_image)
  if (!($img1.attr('src', results.feed[num].banner_image))) {
    $img1.attr('alt', 'No image found for article')
  }

  console.log(results.feed[num].banner_image)

  if (!($img2.attr('src', results.feed[num1].banner_image))) {
    $img2.attr('alt', 'No image found for article')
  }
  
  console.log(results.feed[num1].banner_image)
  if (!($img1.attr('src', results.feed[num2].banner_image))) {
    $img3.attr('alt', 'No image found for article')
  }
  console.log(results.feed[num2].banner_image)

 })  
.catch(function (err) {
  console.error(err);

})});


 // On button click technology fetch and display tech news
 $('.macro').click(function() {
    
  $.get(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=economy_macro&apikey=U9H8L320ZL3GRGKS`)
.then(function (data) {
  let results = data;
  // console.log(results);

  var num = Math.floor(Math.random() * 50);
  var num1 = Math.floor(Math.random() * 50);
  var num2 = Math.floor(Math.random() * 50);

  if (num == num1 || num == num2) {
    num = Math.floor(Math.random() * 50)
  } if (num1 == num2) {
    num1 = Math.floor(Math.random() * 50)
  }


  $headerEl1.text(results.feed[num].title);
  $headerEl1.append('<hr>');
  $headerEl2.text(results.feed[num1].title);
  $headerEl2.append('<hr>');
  $headerEl3.text(results.feed[num2].title);

  $a1.attr('href', results.feed[num].url)
  $a2.attr('href', results.feed[num1].url)
  $a3.attr('href', results.feed[num2].url)
  $a1.attr('target', "_blank");
  $a2.attr('target', "_blank");
  $a3.attr('target', "_blank");
  $img1.attr('src', results.feed[num].banner_image)
  if (!($img1.attr('src', results.feed[num].banner_image))) {
    $img1.attr('alt', 'No image found for article')
  }

  console.log(results.feed[num].banner_image)

  if (!($img2.attr('src', results.feed[num1].banner_image))) {
    $img2.attr('alt', 'No image found for article')
  }
  
  console.log(results.feed[num1].banner_image)
  if (!($img1.attr('src', results.feed[num2].banner_image))) {
    $img3.attr('alt', 'No image found for article')
  }
  console.log(results.feed[num2].banner_image)

 })  
.catch(function (err) {
  console.error(err);

})});


 // On button click technology fetch and display tech news
 $('.micro').click(function() {
    
  $.get(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=technology&apikey=U9H8L320ZL3GRGKS`)
.then(function (data) {
  let results = data;
  // console.log(results);

  var num = Math.floor(Math.random() * 50);
  var num1 = Math.floor(Math.random() * 50);
  var num2 = Math.floor(Math.random() * 50);

  if (num == num1 || num == num2) {
    num = Math.floor(Math.random() * 50)
  } if (num1 == num2) {
    num1 = Math.floor(Math.random() * 50)
  }


  $headerEl1.text(results.feed[num].title);
  $headerEl1.append('<hr>');
  $headerEl2.text(results.feed[num1].title);
  $headerEl2.append('<hr>');
  $headerEl3.text(results.feed[num2].title);

  $a1.attr('href', results.feed[num].url)
  $a2.attr('href', results.feed[num1].url)
  $a3.attr('href', results.feed[num2].url)
  $a1.attr('target', "_blank");
  $a2.attr('target', "_blank");
  $a3.attr('target', "_blank");
  $img1.attr('src', results.feed[num].banner_image)
  if (!($img1.attr('src', results.feed[num].banner_image))) {
    $img1.attr('alt', 'No image found for article')
  }

  console.log(results.feed[num].banner_image)

  if (!($img2.attr('src', results.feed[num1].banner_image))) {
    $img2.attr('alt', 'No image found for article')
  }
  
  console.log(results.feed[num1].banner_image)
  if (!($img1.attr('src', results.feed[num2].banner_image))) {
    $img3.attr('alt', 'No image found for article')
  }
  console.log(results.feed[num2].banner_image)

 })  
.catch(function (err) {
  console.error(err);

})});


// Parallax  and Grafic part
$(document).ready(function () {
  $('.parallax').parallax();
});

$(document).ready(function () {
  $('.modal').modal();
});



// On finance button click fetch and display science news


