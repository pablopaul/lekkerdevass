const request = require('supertest');
const app = require('../app');
const db = require("../models/index");

beforeAll(async () => {
    return await db.sequelize.sync({force: true});
});

afterAll(async () => {
    return await db.sequelize.close();
});

describe('Api', () => {

    describe('routes', () => {
        it('are generally accessible', async () => {
            const response = await request(app)
                .get('/')
            expect(response.status).toBe(200);

        });

        it('return 404 if invalid', async () => {
            const response = await request(app)
                .get('/invalidRoute')
            expect(response.status).toBe(404);

        });

        it('protected route without token returns 403', async () => {
            const response = await request(app)
                .get('/userList')
            expect(response.status).toBe(403);
        });
    });

    var cookies;

    describe('auth', () => {
        it('sign up works', async () => {
            const response = await request(app)
                .post('/auth/signup')
                .send({
                    'username': 'username374849',
                    'password': 'password'
                })
            expect(response.status).toBe(200);

        });

        it('login works', async () => {
            const response = await request(app)
                .post('/auth/login')
                .send({
                    'username': 'username374849',
                    'password': 'password'
                })
            expect(response.status).toBe(200);
            cookies = response.headers['set-cookie'];
        });
    });

    describe('userList', () => {
        it('works', async () => {
            const response = await request(app)
                .get('/userList')
                .set('Cookie', cookies)
            expect(response.status).toBe(200);
        });
    });

    describe('team(s)', () => {
        it('can be created', async () => {
            const response = await request(app)
                .post('/team')
                .send({
                    'name': 'TeamXYZ',
                    'maxMembers': '30'
                })
                .set('Cookie', cookies)
            expect(response.status).toBe(200);
        });

        it('can be listed', async () => {
            const response = await request(app)
                .get('/teamList')
                .set('Cookie', cookies)
            expect(response.status).toBe(200);
        });

        it('can be updated', async () => {
            const response = await request(app)
                .patch('/team')
                .send({
                    'name': 'TeamNewName',
                    'maxMembers': '50'
                })
                .set('Cookie', cookies)
            expect(response.status).toBe(200);
        });

        it('can be deleted', async () => {
            const response = await request(app)
                .delete('/team')
                .set('Cookie', cookies)
            expect(response.status).toBe(200);
        });
    });

    describe('user info', () => {
        it('can be retrieved', async () => {
            const response = await request(app)
                .get('/user/1')
                .set('Cookie', cookies)
            expect(response.status).toBe(200);
        });
    });

});
