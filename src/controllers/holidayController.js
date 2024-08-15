const cacheService = require('../services/cacheService');
const calendarificService = require('../services/calendarificService');
const config = require('../config/config');

const getHolidays = async (req, res) => {
  const { country, year } = req.query;
  const cacheKey = `holidays_${country}_${year}`;

  try {
    let holidays = await cacheService.get(cacheKey);

    if (!holidays) {
      holidays = await calendarificService.getHolidays(country, year);
      await cacheService.set(cacheKey, holidays, config.cacheTTL);
    }

    res.json(holidays);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch holidays' });
  }
};

const getCountries = async (req, res) => {
  try {
    const countries = await calendarificService.getCountries();
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
};

module.exports = {
  getHolidays,
  getCountries
};
