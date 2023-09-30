var quotesData;

var colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
];

var currentQuote = '';
var currentAuthor = '';

function getQuotesFromAPI() {
    return $.ajax({
        headers: { Accept: 'application/json' },
        url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
        success: (jsonQuotes) => {
            if (typeof jsonQuotes === 'string') {
                quotesData = JSON.parse(jsonQuotes);
                console.log('quotesData')
                console.log(quotesData);
            }
        }
    })
}

function generateRandomQuote() {
    return quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)]
}

function printQuoteToScreen() {
    let randomQuote = generateRandomQuote();
    currentQuote = randomQuote.quote;
    currentAuthor = randomQuote.author;
$("#tweet-quote").attr('href','https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + currentQuote + '"' + "\n" + "\n" + "- " + currentAuthor));
$('.quote-text').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#text').text(currentQuote);
  });
$('.quote-author').animate({opacity:0}, 500, function () {
    $(this).animate({opacity:1}, 500);
    $('#author').html(currentAuthor);
})
var randColor = Math.floor(Math.random() * colors.length)
$('body').animate(
    {
        backgroundColor: colors[randColor],
        color:colors[randColor]
    }, 1000
)
$('.button').animate(
    {
        backgroundColor:colors[randColor]
    }, 1000
)
}

function go() {
    getQuotesFromAPI().then(() => {
        printQuoteToScreen();
    });

    $('#new-quote').on('click', printQuoteToScreen);
};

window.onload = go()
