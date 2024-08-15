require('dotenv').config();

module.exports = {
  apiKey: process.env.CALENDARIFIC_API_KEY,
  redisHost: process.env.REDIS_HOST || '127.0.0.1',
  redisPort: process.env.REDIS_PORT || 6379,
  cacheTTL: process.env.CACHE_TTL || 3600,
  calendarificBaseURL: 'https://calendarific.com/api/v2'
};
