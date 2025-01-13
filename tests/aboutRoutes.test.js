const request = require('supertest');
const app = require('../app'); 

describe('GET /api/about', () => {
    it('should return a list of developers', async () => {
        const response = await request(app).get('/api/about');

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array); // Should return an array
        expect(response.body[0]).toHaveProperty('firstname');
        expect(response.body[0]).toHaveProperty('lastname');
    });
});
