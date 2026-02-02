import { updateQuoteBlock } from './api.js';

// Селектори для твоїх елементів
const quoteTextField = document.querySelector('.quote-text');
const quoteAuthorField = document.querySelector('.quote-author');

// Запускаємо функцію відразу при завантаженні сторінки
initQuote();

async function initQuote() {
  // Використовуємо твою логіку з localStorage
  const quoteData = await updateQuoteBlock();

  if (quoteData) {
    renderQuote(quoteData);
  } else {
    // Якщо API не відповіло, можна вставити дефолтний текст
    quoteTextField.textContent =
      "Don't think about the start of the race. Think about the ending.";
    quoteAuthorField.textContent = 'Usain Bolt';
  }
}

function renderQuote(data) {
  // Вставляємо текст цитати
  quoteTextField.textContent = data.quote;

  // Вставляємо автора
  quoteAuthorField.textContent = data.author;
}
