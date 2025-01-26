// Michelle Cain Segev Cohen

const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

/**
 * Test cases for the /api/addcost endpoint
 */
describe('POST /api/addcost', () => {
    /**
     * Test case: Adding a new cost item with a valid category
     * @description This test verifies that a new cost item with a valid category can be successfully added.
     */
    it('should add a new cost item with a valid category and return it', async () => {
        const response = await request(app).post('/api/addcost').send({
            userid: '123123',
            description: 'Groceries',
            category: 'food', // Valid category
            sum: 50,
        });

        // Assertions for successful addition
        expect(response.statusCode).toBe(201);
        expect(response.body.cost).toHaveProperty('userid', '123123');
        expect(response.body.cost).toHaveProperty('description', 'Groceries');
        expect(response.body.cost).toHaveProperty('category', 'food');
        expect(response.body.cost).toHaveProperty('sum', 50);
    });

    /**
     * Test case: Adding a new cost item with an invalid category
     * @description This test ensures that adding a cost with an invalid category returns an appropriate error.
     */
    it('should return an error for an invalid category', async () => {
        const response = await request(app).post('/api/addcost').send({
            userid: '123123',
            description: 'Groceries',
            category: 'invalidCategory', // Invalid category
            sum: 50,
        });

        // Assertions for invalid category
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error', 'Invalid category. Allowed categories are: food, health, housing, sport, education');
    });

    /**
     * Test case: Missing required fields
     * @description This test ensures that a request missing required fields returns an error.
     */
    it('should return an error for missing required fields', async () => {
        const response = await request(app).post('/api/addcost').send({
            description: 'Groceries',
        });

        // Assertions for missing fields
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error', 'One or more required properties are missing');
    });
});

/**
 * After all tests are complete, close the MongoDB connection
 */
afterAll(async () => {
    await mongoose.connection.close();
});
