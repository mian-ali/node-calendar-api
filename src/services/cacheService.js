const redis = require('redis');
const config = require('../config/config');

const client = redis.createClient({
  host: config.redisHost,
  port: config.redisPort
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});

client.connect();

const cacheService = {
  get: async (key) => {
    const data = await client.get(key);
    return data ? JSON.parse(data) : null;
  },
  set: async (key, value, ttl) => {
    await client.setEx(key, ttl, JSON.stringify(value));
  }
};

module.exports = cacheService;
