// Michelle Cain Segev Cohen

const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

/**
 * Test cases for the /api/report endpoint
 */
describe('GET /api/report', () => {
    /**
     * Test case: Fetching costs grouped by categories
     * @description This test ensures that costs for a specific user, year, and month are correctly grouped by categories.
     * @expectedResults The response should contain properties for valid categories (e.g., food, health).
     */
    it('should return costs grouped by categories', async () => {
        const response = await request(app).get('/api/report').query({
            user_id: '123123',
            year: 2025,
            month: 1,
        });

        // Assertions for valid response
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('food');
        expect(response.body).toHaveProperty('health');
        // Add expectations for other categories as needed
    });

    /**
     * Test case: Missing required query parameters
     * @description This test ensures that a request with missing query parameters returns an appropriate error message.
     * @expectedResults The response should contain an error message and return status 400.
     */
    it('should return an error for missing query parameters', async () => {
        const response = await request(app).get('/api/report');

        // Assertions for missing query parameters
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');
    });
});

/**
 * After all tests are complete, close the MongoDB connection
 * @description Ensures that the MongoDB connection is properly closed after running the test suite.
 */
afterAll(async () => {
    await mongoose.connection.close();
});
