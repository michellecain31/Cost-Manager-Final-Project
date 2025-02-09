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
     * @expectedResults The response should contain properties for valid categories (e.g., food, health) and a costs array.
     */
    it('should return a report with costs grouped by categories', async () => {
        const response = await request(app).get('/api/report').query({
            id: '123123', // Updated parameter to "id"
            year: 2025,
            month: 1,
        });

        // Assertions for valid response
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('userid', '123123'); // Ensuring userid matches
        expect(response.body).toHaveProperty('year', 2025);
        expect(response.body).toHaveProperty('month', 1);
        expect(response.body).toHaveProperty('costs'); // Ensures the "costs" key exists
        expect(Array.isArray(response.body.costs)).toBe(true); // Ensures "costs" is an array

        // Validate grouped categories structure
        const categoryNames = response.body.costs.map((c) => Object.keys(c)[0]);
        expect(categoryNames).toEqual(
            expect.arrayContaining(['food', 'health', 'housing', 'sport', 'education'])
        );
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
        expect(response.body).toHaveProperty('error', 'One or more required properties are missing');
    });
});

/**
 * After all tests are complete, close the MongoDB connection
 * @description Ensures that the MongoDB connection is properly closed after running the test suite.
 */
afterAll(async () => {
    await mongoose.connection.close();
});
