import { subscribeEmail } from './api.js';

const subForm = document.querySelector('.subs-form');

subForm?.addEventListener('submit', async e => {
  e.preventDefault();

  const emailInput = e.currentTarget.elements.email;
  const emailValue = emailInput.value.trim().toLowerCase();

  const regex = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  if (!regex.test(emailValue)) {
    alert('Please enter a valid email format (e.g., test@gmail.com)');
    return;
  }

  try {
    const response = await subscribeEmail(emailValue);
    alert(response.message || 'Subscription successful!');
    subForm.reset();
  } catch (error) {
    const message = error.response?.data?.message || 'Something went wrong.';
    alert(message);
  }
});
