const request = require('supertest');
const app = require('../src/app');
const cacheService = require('../src/services/cacheService');
const calendarificService = require('../src/services/calendarificService');

jest.mock('../src/services/cacheService');
jest.mock('../src/services/calendarificService');

describe('Holiday Controller', () => {
  it('should return holidays from the cache', async () => {
    cacheService.get.mockResolvedValue([{ name: 'Holiday from Cache' }]);

    const response = await request(app).get('/api/holidays?country=PAK&year=2024');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ name: 'Holiday from Cache' }]);
  });

  it('should return holidays from the Calendarific API when cache is empty', async () => {
    cacheService.get.mockResolvedValue(null);
    calendarificService.getHolidays.mockResolvedValue([{ name: 'Holiday from API' }]);

    const response = await request(app).get('/api/holidays?country=PAK&year=2024');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ name: 'Holiday from API' }]);
  });

  it('should handle errors from the Calendarific API', async () => {
    cacheService.get.mockResolvedValue(null);
    calendarificService.getHolidays.mockRejectedValue(new Error('API Error'));

    const response = await request(app).get('/api/holidays?country=PAK&year=2024');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Failed to fetch holidays' });
  });
});
