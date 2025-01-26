// Michelle Cain Segev Cohen

const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

/**
 * Test cases for the /api/about endpoint
 */
describe('GET /api/about', () => {
    /**
     * Test case: Fetch list of developers
     * @description This test ensures that the endpoint returns an array of developers with the properties: firstname and lastname.
     * @expectedResults The response should be an array containing objects with firstname and lastname properties.
     */
    it('should return a list of developers', async () => {
        const response = await request(app).get('/api/about');

        // Assertions for the developers' list
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array); // Response should be an array
        expect(response.body[0]).toHaveProperty('firstname');
        expect(response.body[0]).toHaveProperty('lastname');
    });
});

/**
 * After all tests are complete, close the MongoDB connection
 * @description Ensures that the MongoDB connection is properly closed after running the test suite.
 */
afterAll(async () => {
    await mongoose.connection.close();
});
