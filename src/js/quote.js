import { updateQuoteBlock } from './api.js';

const quoteTextField = document.querySelector('.quote-text');
const quoteAuthorField = document.querySelector('.quote-author');

initQuote();

async function initQuote() {
  const quoteData = await updateQuoteBlock();

  if (quoteData) {
    renderQuote(quoteData);
  } else {
    quoteTextField.textContent =
      "Don't think about the start of the race. Think about the ending.";
    quoteAuthorField.textContent = 'Usain Bolt';
  }
}

function renderQuote(data) {
  quoteTextField.textContent = data.quote;
  quoteAuthorField.textContent = data.author;
}
