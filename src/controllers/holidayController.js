/**
 *
 * @author Ali Ahmad <https://github.com/mian-ali>
 */

const cacheService = require('../services/cacheService');
const calendarificService = require('../services/calendarificService');
const config = require('../config/config');

const getHolidays = async (req, res) => {
  const { country, year } = req.query;
  const cacheKey = `holidays_${country}_${year}`;

  if (!country || !year) {
    return res.status(400).json({ error: 'Country and year are required' });
  }

  try {
    // Check cache first
    let holidays = await cacheService.get(cacheKey);

    if (!holidays) {
      // Fetch from Calendarific API if not in cache
      try {
        holidays = await calendarificService.getHolidays(country, year);
        await cacheService.set(cacheKey, holidays, config.cacheTTL);
      } catch (apiError) {
        // Handle API error specifically
        return res.status(502).json({ error: 'Failed to fetch holidays from external service' });
      }
    }

    res.json(holidays);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCountries = async (req, res) => {
  try {
    const countries = await calendarificService.getCountries();
    res.json(countries);
  } catch (error) {
    res.status(502).json({ error: 'Failed to fetch countries from external service' });
  }
};

module.exports = {
  getHolidays,
  getCountries
};
