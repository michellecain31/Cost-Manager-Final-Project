const request = require('supertest');
const app = require('../app'); 

describe('GET /api/users/:id', () => {
    it('should return the user details', async () => {
        const response = await request(app).get('/api/users/123123');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('first_name');
        expect(response.body).toHaveProperty('last_name');
        expect(response.body).toHaveProperty('total');
    });

    it('should return an error for an invalid user ID', async () => {
        const response = await request(app).get('/api/users/invalidID');

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error');
    });
});
