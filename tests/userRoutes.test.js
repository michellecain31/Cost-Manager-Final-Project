// Michelle Cain Segev Cohen

const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

/**
 * Test cases for the /api/users/:id endpoint
 */
describe('GET /api/users/:id', () => {
    /**
     * Test case: Fetch user details by ID
     * @description This test ensures that the user details (first_name, last_name, id, and total) are returned for a valid user ID.
     * @expectedResults The response should contain user properties: first_name, last_name, id, and total.
     */
    it('should return the user details', async () => {
        const response = await request(app).get('/api/users/123123');

        // Assertions for valid user details
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('first_name');
        expect(response.body).toHaveProperty('last_name');
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('total');
    });

    /**
     * Test case: Invalid user ID
     * @description This test ensures that an error is returned when an invalid user ID is provided.
     * @expectedResults The response should return a 404 status code and an error message.
     */
    it('should return an error for an invalid user ID', async () => {
        const response = await request(app).get('/api/users/invalidID');

        // Assertions for invalid user ID
        expect(response.statusCode).toBe(404);
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
