const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('GET /api/report', () => {
    it('should return all costs for a user in a specific month and year', async () => {
        const response = await request(app).get('/api/report').query({
            user_id: '123123',
            year: 2025,
            month: 1,
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array); // Should return an array of cost items
    });

    it('should return an error for missing query parameters', async () => {
        const response = await request(app).get('/api/report');

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');
    });
});

// Add afterAll to close the MongoDB connection
afterAll(async () => {
    await mongoose.connection.close();
});
