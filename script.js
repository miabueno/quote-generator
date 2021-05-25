
let apiQuotes = [];

const loadingSpinner = document.getElementById('loader');
const quoteContainer = document.getElementById('quote-container');

// Show Loading
const showLoadingSpinner = () => {
    loadingSpinner.hidden = false;
    quoteContainer.hidden = true;
};

// Hide Loading
const hideLoadingSpinner = () => {
    loadingSpinner.hidden = true;
    quoteContainer.hidden = false;
};

// Select a random quote from given array
const randomQuote = (quotesArr) => {
    const randomIdx = Math.floor(Math.random() * quotesArr.length);
    return quotesArr[randomIdx];
};

// Show new quote in quote container
const displayNewQuote = (quotesArr) => {
    hideLoadingSpinner();
    const newQuote = randomQuote(quotesArr);
    const quoteText = newQuote.text;
    const quoteAuthor = newQuote.author ? newQuote.author : 'Unknown';

    // DOM elements
    const quoteTextElement = document.getElementById('quote');
    const quoteAuthorElement = document.getElementById('author');

    // quote length to determine styling
    (quoteText.length > 120) ? quoteTextElement.classList.add('long-quote') 
        : quoteTextElement.classList.remove('long-quote');

    // manipulate DOM elements
    quoteTextElement.textContent = quoteText;
    quoteAuthorElement.textContent = quoteAuthor;
};

// Get Quotes From API
const getQuotes = async () => {
    showLoadingSpinner();
    const apiURL = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        displayNewQuote(apiQuotes);
    } catch(error) {
        alert(error);
    }
};

// Tweet a Quote
const tweetQuote = (quote, author) => {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterURL, '_blank');
};

// Event Listeners
const twitterBtn = document.getElementById('twitter');
twitterBtn.addEventListener('click', () => {
    const quote = document.getElementById('quote').textContent;
    const author = document.getElementById('author').textContent;
    tweetQuote(quote, author);
});

const newQuoteBtn = document.getElementById('new-quote');
newQuoteBtn.addEventListener('click', () => {
    showLoadingSpinner();
    displayNewQuote(apiQuotes);
});

// On Load
getQuotes();