import axios from 'axios';

const BASE_URL = 'https://your-energy.b.goit.study/api';

export async function getFilters(filterName = 'Muscles', page = 1) {
  try {
    const response = await axios.get(`${BASE_URL}/filters`, {
      params: {
        filter: filterName,
        page: page,
        limit: 12,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching filters (filter: ${filterName}, page: ${page}):`,
      error
    );
    throw error;
  }
}

export const getExercises = async params => {
  try {
    const response = await axios.get(`${BASE_URL}/exercises`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching exercises:', error);
    throw error;
  }
};

export const getExerciseById = async id => {
  try {
    const response = await axios.get(`${BASE_URL}/exercises/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching exercise by ID (${id}):`, error);
    throw error;
  }
};


export const patchRating = async (id, data) => {
  try {
    const body = {
      rate: Number(data.rate),
      email: data.email,
      review: data.comment 
    };
    const response = await axios.patch(`${BASE_URL}/exercises/${id}/rating`, body);
    return response.data;
  } catch (error) {
    console.error("Помилка в API (rating):", error);
    throw error; 
  }
};

export const subscribeEmail = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/subscription`, { email });
    return response.data;
  } catch (error) {
    console.error("Помилка в API (subscription):", error);
    
    throw error;
  }
};

async function getQuote() {
  try {
    const response = await axios.get(`${BASE_URL}/quote`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error('Error getting quote from backend', error);
    return null;
  }
}

export async function updateQuoteBlock() {
  const storedQuote = localStorage.getItem('quote');
  const storedDate = localStorage.getItem('quoteDate');
  const currentDate = new Date().toDateString();

  if (storedQuote && storedDate === currentDate) {
    return JSON.parse(storedQuote);
  } else {
    const quoteData = await getQuote();

    if (quoteData) {
      localStorage.setItem('quote', JSON.stringify(quoteData));
      localStorage.setItem('quoteDate', currentDate);
      return quoteData;
    }
  }
}
