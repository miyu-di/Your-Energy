import { getExerciseById, patchRating } from './api.js';
import iconSprite from '../images/icons.svg';

const modalBackdrop = document.querySelector('#exercise-modal');
const exercisesList = document.querySelector('.exercises-list');
let currentExerciseData = null;

if (exercisesList) {
  exercisesList.addEventListener('click', async e => {
    const startBtn = e.target.closest('.exercise-start-btn');
    if (!startBtn) return;
    try {
      const data = await getExerciseById(startBtn.dataset.id);
      if (data) openModal(data);
    } catch (err) {
      console.error(err);
    }
  });
}

export function openModal(data) {
  currentExerciseData = data;
  modalBackdrop.innerHTML = createModalMarkup(data);
  modalBackdrop.classList.remove('is-hidden');
  document.body.classList.add('no-scroll');

  window.addEventListener('keydown', handleEsc);
  initFavoriteBtn(data);
}

function initFavoriteBtn(data) {
  const favBtn = document.querySelector('.btn-favorite');
  if (!favBtn) return;
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const isFavorite = favorites.some(item => item._id === data._id);
  updateFavBtnState(favBtn, isFavorite);
  favBtn.addEventListener('click', () => {
    const currentFavs = JSON.parse(localStorage.getItem('favorites')) || [];
    const index = currentFavs.findIndex(item => item._id === data._id);
    if (index !== -1) {
      currentFavs.splice(index, 1);
      updateFavBtnState(favBtn, false);
    } else {
      currentFavs.push(data);
      updateFavBtnState(favBtn, true);
    }
    localStorage.setItem('favorites', JSON.stringify(currentFavs));
  });
}

function updateFavBtnState(btn, isFav) {
  if (isFav) {
    btn.innerHTML = `Remove from favorites <svg class="modal-heart" width="20" height="20"><use href="${iconSprite}#heart"></use></svg>`;
  } else {
    btn.innerHTML = `Add to favorites <svg class="modal-heart" width="20" height="20"><use href="${iconSprite}#heart"></use></svg>`;
  }
}

function closeModal() {
  modalBackdrop.classList.add('is-hidden');
  modalBackdrop.innerHTML = '';
  document.body.classList.remove('no-scroll');
  window.removeEventListener('keydown', handleEsc);
  if (window.location.pathname.includes('favorite')) {
    const event = new Event('favorites-updated');
    window.dispatchEvent(event);
  }
}

function handleEsc(e) {
  if (e.code === 'Escape') closeModal();
}

if (modalBackdrop) {
  modalBackdrop.addEventListener('click', e => {
    if (e.target === modalBackdrop || e.target.closest('#modal-close')) {
      closeModal();
    }
  });
}

document.addEventListener('click', e => {
  if (e.target.classList.contains('btn-rating')) {
    modalBackdrop.innerHTML = createRatingMarkup(currentExerciseData._id);
    initRatingLogic();
  }
});


function initRatingLogic() {
  let selectedRating = 0;
  const radios = document.querySelectorAll('.rating-radio'); 
  const ratingValueLabel = document.querySelector('#rating-value');
  const form = document.getElementById('rating-form');
  const labels = document.querySelectorAll('.rating-label'); 

  radios.forEach(radio => {
    radio.addEventListener('change', e => {
      selectedRating = Number(e.target.value);
      ratingValueLabel.textContent = `${selectedRating}.0`;

      labels.forEach(label => {
        const labelValue = Number(label.dataset.value);
        const icon = label.querySelector('svg');

        if (labelValue <= selectedRating) {
          icon.style.fill = '#EEA10C';
          icon.style.stroke = '#EEA10C';
        } else {
          icon.style.fill = 'rgba(244, 244, 244, 0.2)'; 
          icon.style.stroke = 'rgba(244, 244, 244, 0.2)'; 
        }
      });
    });
  });

  if (!form) return;

  form.onsubmit = async e => {
    e.preventDefault();
    const { email, comment } = e.target.elements;

    if (selectedRating === 0) return alert('Please select a rating!');

    try {
      await patchRating(currentExerciseData._id, {
        rate: selectedRating,
        email: email.value.trim(),
        comment: comment.value.trim(),
      });

      alert('Thank you for your feedback!');
      openModal(currentExerciseData);
    } catch (err) {
      alert(err.response?.data?.message || 'Error submitting rating');
    }
  };
}


function createRatingMarkup(exerciseId) {
  return `
    <div class="modal-content rating-modal">
      <button type="button" class="modal-close-btn" id="modal-close">
        <svg class="modal-close-icon" width="28" height="28"><use href="${iconSprite}#cross"></use></svg>
      </button>
      <p class="rating-label">Rating</p>
      <div class="rating-value-container">
        <span id="rating-value">0.0</span>
        
        <div class="star-rating-wrapper">
            ${[1, 2, 3, 4, 5]
              .map(
                i => `
                <div class="rating-group">
                    <input class="rating-radio visually-hidden" type="radio" name="rate" id="star${i}" value="${i}">
                    <label class="rating-label" for="star${i}" data-value="${i}">
                        <svg class="rating-star-icon" width="24" height="24">
                            <use href="${iconSprite}#star"></use>
                        </svg>
                    </label>
                </div>
            `
              )
              .join('')}
        </div>
      </div>

      <form class="rating-form" id="rating-form">
        <input type="email" name="email" placeholder="Email" required 
               pattern="^\\w+(\\.\\w+)?@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$" class="rating-input"/>
        <textarea name="comment" placeholder="Your comment" required class="rating-textarea"></textarea>
        <button type="submit" class="rating-send-btn">Send</button>
      </form>
    </div>
    
    <style>
        
    </style>
    `;
}


function createModalMarkup(data) {
  const {
    gifUrl,
    name,
    rating,
    target,
    bodyPart,
    equipment,
    popularity,
    burnedCalories,
    description,
    _id,
  } = data;

  return `
    <div class="modal-content">
      <button type="button" class="modal-close-btn" id="modal-close">
        <svg class="modal-close-icon" width="28" height="28"><use href="${iconSprite}#cross"></use></svg>
      </button>
      <div class="modal-exercise-card">
        <div class="modal-gif-wrapper">
          <img src="${gifUrl}" alt="${name}" class="modal-gif" width="295" height="258" />
        </div>
        <div class="modal-details">
          <h2 class="modal-title">${name}</h2>
          <div class="modal-rating-row">
              <span class="modal-rating-value">${rating.toFixed(1)}</span>
              ${renderStars(rating)}
          </div>
          <ul class="modal-stats-list">
            <li class="modal-stat-item"><span>Target</span> <strong>${target}</strong></li>
            <li class="modal-stat-item"><span>Body Part</span> <strong>${bodyPart}</strong></li>
            <li class="modal-stat-item"><span>Equipment</span> <strong>${equipment}</strong></li>
            <li class="modal-stat-item"><span>Popular</span> <strong>${popularity}</strong></li>
            <li class="modal-stat-item"><span>Burned calories</span> <strong>${burnedCalories}/3 min</strong></li>
          </ul>
          <p class="modal-description">${description}</p>
          <div class="modal-btns">
            <button class="btn-favorite" data-id="${_id}">Add to favorites</button>
            <button class="btn-rating" type="button">Give a rating</button>
          </div>
        </div>
      </div>
    </div>`;
}

function renderStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    const isFilled = i <= Math.round(rating);
    const color = isFilled ? '#EEA10C' : 'rgba(244, 244, 244, 0.2)';

    stars += `
        <span style="display: inline-flex;">
            <svg class="modal-star-icon" width="18" height="18" style="fill: ${color}; stroke: ${color}">
                <use href="${iconSprite}#star"></use>
            </svg>
        </span>`;
  }
  return `<div class="modal-stars">${stars}</div>`;
}
