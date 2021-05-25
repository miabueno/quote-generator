
let apiQuotes = [];

// Select a random quote from given array
const randomQuote = (quotesArr) => {
    const randomIdx = Math.floor(Math.random() * quotesArr.length);
    return quotesArr[randomIdx];
};

// Show new quote in quote container
const displayNewQuote = (quotesArr) => {
    const newQuote = randomQuote(quotesArr);
    const quoteText = newQuote.text;
    const quoteAuthor = newQuote.author ? newQuote.author : 'Unknown';

    // DOM elements
    const quoteTextEl = document.getElementById('quote');
    const quoteAuthorEl = document.getElementById('author');

    // quote length to determine styling
    (quoteText.length > 120) ? quoteTextEl.classList.add('long-quote') 
        : quoteTextEl.classList.remove('long-quote');

    // manipulate DOM elements
    quoteTextEl.textContent = quoteText;
    quoteAuthorEl.textContent = quoteAuthor;
};

// Get Quotes From API
const getQuotes = async () => {
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
    displayNewQuote(apiQuotes);
});

// On Load
getQuotes();