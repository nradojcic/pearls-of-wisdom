const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Loading Spinner
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote from API - forismatic.com
async function getQuote() {
  showLoadingSpinner();
  // We need to use a Proxy URL to make our API call in order to avoid a CORS error
  const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // added to fix CORS error
  const apiUrl =
    "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl); // added proxyURL to fix CORS error
    const data = await response.json();

    // for blank Author field, show 'Unknown'
    if (data.quoteAuthor === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    // Reduce font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;

    // Stop Loading Spinner and Show Quote
    removeLoadingSpinner();
  } catch (error) {
    console.log("whoops, there was an error...", error);
    // getQuote(); // Try to get a new quote again if there was an error last time - this can overload the API server with requests! It's safer to reload page manually or press New Quote button
  }
}

// Twitter Button - Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners - for buttons
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Page Load - load a quote first time when visiting the page
getQuote();
