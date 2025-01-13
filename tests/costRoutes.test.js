const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('POST /api/addcost', () => {
    it('should add a new cost item and return it', async () => {
        const response = await request(app).post('/api/addcost').send({
            userid: '123123',
            description: 'Groceries',
            category: 'food',
            sum: 50,
        });

        expect(response.statusCode).toBe(201); // Updated to match the status code
        expect(response.body.cost).toHaveProperty('userid', '123123');
        expect(response.body.cost).toHaveProperty('description', 'Groceries');
        expect(response.body.cost).toHaveProperty('category', 'food');
        expect(response.body.cost).toHaveProperty('sum', 50);
    });

    it('should return an error for missing required fields', async () => {
        const response = await request(app).post('/api/addcost').send({
            description: 'Groceries',
        });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');
    });
});

// Add afterAll to close the MongoDB connection
afterAll(async () => {
    await mongoose.connection.close();
});
