const request = require('supertest');
const app = require('../app'); 
describe('POST /api/add', () => {
    it('should add a new cost item and return it', async () => {
        const response = await request(app).post('/api/add').send({
            userid: '123123',
            description: 'Groceries',
            category: 'Food',
            sum: 50,
        });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('userid', '123123');
        expect(response.body).toHaveProperty('description', 'Groceries');
        expect(response.body).toHaveProperty('category', 'Food');
        expect(response.body).toHaveProperty('sum', 50);
    });

    it('should return an error for missing required fields', async () => {
        const response = await request(app).post('/api/add').send({
            description: 'Groceries',
        });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');
    });
});

