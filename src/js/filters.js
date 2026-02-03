import { getFilters, getExercises } from './api.js';
import { createExerciseMarkup } from './exercises.js';

const listContainer = document.querySelector('.exercises-list');
const filterButtons = document.querySelectorAll('.filter-btn');
const paginationContainer = document.getElementById('pagination');
const titleCurrent = document.querySelector('.breadcrumb-current');
const titleDivider = document.querySelector('.breadcrumb-divider');
const searchForm = document.getElementById('search-form');
const filtersNav = document.querySelector('.filters-nav');

let appState = {
  filter: 'Muscles',
  categoryName: '',
  keyword: '',
  page: 1,
  view: 'categories',
};

if (filtersNav && listContainer) {
  init();
}

async function init() {
  setActiveButton(appState.filter);
  await handleFilterSelect(appState.filter, 1);
  addListeners(); 
}

function addListeners() {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', async e => {
      e.preventDefault();
      const selectedFilter = e.currentTarget.dataset.filter;
      if (
        e.currentTarget.classList.contains('active') &&
        appState.view === 'exercises'
      ) {
        return resetToCategories(selectedFilter);
      }

      if (e.currentTarget.classList.contains('active')) return;

      appState.filter = selectedFilter;
      appState.page = 1;
      appState.view = 'categories';
      appState.categoryName = '';

      setActiveButton(selectedFilter);
      titleCurrent.textContent = '';
      titleDivider.style.display = 'none';
      searchForm.classList.add('is-hidden');

      await handleFilterSelect(appState.filter, appState.page);
    });
  });

  listContainer.addEventListener('click', async e => {
    if (appState.view === 'exercises') return;

    const card = e.target.closest('.filter-item');
    if (!card) return;

    const name = card.dataset.name;
    const filter = card.dataset.filter;

    appState.view = 'exercises';
    appState.categoryName = name;
    appState.page = 1;

    titleDivider.style.display = 'inline-block';
    titleCurrent.textContent = capitalize(name);
    searchForm.classList.remove('is-hidden');

    await loadExercises(filter, name, 1);
  });

  paginationContainer?.addEventListener('click', async e => {
    if (!e.target.classList.contains('pg-btn')) return;

    const newPage = Number(e.target.dataset.page);
    appState.page = newPage;

    if (appState.view === 'categories') {
      await handleFilterSelect(appState.filter, newPage);
    } else {
      await loadExercises(appState.filter, appState.categoryName, newPage);
    }

    window.scrollTo({
      top: listContainer.offsetTop - 100,
      behavior: 'smooth',
    });
  });

  searchForm?.addEventListener('submit', async e => {
    e.preventDefault();

    const input = e.currentTarget.elements.keyword;
    const keywordValue = input.value.trim().toLowerCase();

    appState.keyword = keywordValue;
    appState.page = 1;

    await loadExercises(appState.filter, appState.categoryName, appState.page);
  });
}

async function resetToCategories(filterName) {
  appState.filter = filterName;
  appState.page = 1;
  appState.view = 'categories';
  appState.categoryName = '';
  searchForm.reset();

  setActiveButton(filterName);
  titleCurrent.textContent = '';
  titleDivider.style.display = 'none';
  searchForm.classList.add('is-hidden');

  await handleFilterSelect(appState.filter, appState.page);
}

async function handleFilterSelect(filterName, page) {
  try {
    listContainer.innerHTML = '<p class="loader">Loading...</p>';
    const data = await getFilters(filterName, page);

    if (data.results.length > 0) {
      listContainer.innerHTML = createCategoryMarkup(data.results);
      renderPagination(data.totalPages, page);
    }
  } catch (error) {
    console.error(error);
    listContainer.innerHTML = '<p>Error loading categories.</p>';
  }
}

async function loadExercises(filterType, filterName, page) {
  try {
    listContainer.innerHTML = '<p class="loader">Loading exercises...</p>';

    let paramKey = 'muscles';
    if (filterType === 'Body parts') paramKey = 'bodypart';
    if (filterType === 'Equipment') paramKey = 'equipment';

    const params = {
      [paramKey]: filterName.toLowerCase(),
      page: page,
      limit: 10,
      keyword: appState.keyword,
    };

    const data = await getExercises(params);

    if (data.results && data.results.length > 0) {
      listContainer.innerHTML = createExerciseMarkup(data.results);
      renderPagination(data.totalPages, page);
    } else {
      listContainer.innerHTML = `
        <p class="no-results-message">
          Unfortunately, <strong>no results</strong> were found matching your search, please try again.
        </p>`;
      paginationContainer.innerHTML = '';
    }
  } catch (error) {
    console.error(error);
    listContainer.innerHTML = '<p>Error loading exercises.</p>';
  }
}

function renderPagination(totalPages, activePage) {
  if (!paginationContainer) return;
  paginationContainer.innerHTML = '';
  if (totalPages <= 1) return;

  const buttons = [];
  const maxVisibleButtons = 5; 

  if (activePage > 1) {
    buttons.push(createPageBtn('<<', 1, 'arrow'));
    buttons.push(createPageBtn('<', activePage - 1, 'arrow'));
  }

  let startPage = Math.max(1, activePage - 2);
  let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

  if (endPage - startPage < maxVisibleButtons - 1) {
    startPage = Math.max(1, endPage - maxVisibleButtons + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    buttons.push(createPageBtn(i, i, i === activePage ? 'active' : ''));
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      const dots = document.createElement('span');
      dots.textContent = '...';
      dots.className = 'pg-dots';
      buttons.push(dots);
    }
    buttons.push(createPageBtn(totalPages, totalPages, ''));
  }

  if (activePage < totalPages) {
    buttons.push(createPageBtn('>', activePage + 1, 'arrow'));
    buttons.push(createPageBtn('>>', totalPages, 'arrow'));
  }

  buttons.forEach(btn => paginationContainer.appendChild(btn));
}

function createPageBtn(text, page, className) {
  const btn = document.createElement('button');
  btn.className = `pg-btn ${className}`;
  btn.textContent = text;
  btn.dataset.page = page;
  return btn;
}

function setActiveButton(filterName) {
  filterButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filterName);
  });
}

function createCategoryMarkup(array) {
  return array
    .map(
      item => `
    <li class="filter-item" 
        data-name="${item.name}" 
        data-filter="${item.filter}"
        style="background: linear-gradient(0deg, rgba(17,17,17,0.5), rgba(17,17,17,0.5)), url('${item.imgURL}') center/cover no-repeat;">
        <div class="filter-text">
            <h3>${capitalize(item.name)}</h3>
            <p>${item.filter}</p>
        </div>
    </li>
  `
    )
    .join('');
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
