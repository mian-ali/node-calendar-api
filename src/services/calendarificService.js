const axios = require('axios');
const config = require('../config/config');

const calendarificService = {
  getHolidays: async (country, year) => {
    const url = `${config.calendarificBaseURL}/holidays?api_key=${config.apiKey}&country=${country}&year=${year}`;
    const response = await axios.get(url);
    return response.data.response.holidays;
  },
  getCountries: async () => {
    const url = `${config.calendarificBaseURL}/countries?api_key=${config.apiKey}`;
    const response = await axios.get(url);
    return response.data.response.countries;
  }
};

module.exports = calendarificService;
