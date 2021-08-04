import router from '../components/users/User.router';
import { Router } from 'express';

interface RouterStack {
    handle: [];
    name?: string;
    params?: undefined,
    path?: undefined,
    keys?: [],
    regexp?: RegExp,
    route: Router
}

describe('user router', () => {
    test('has crud routes', () => {
        const routes = [
            { path: '/', method: 'get'},
            { path: '/', method: 'post'},
            { path: '/:id', method: 'get'},
            { path: '/:id', method: 'put'},
            { path: '/:id', method: 'delete'},
        ]

        routes.forEach(route => {
            const match = router.stack.find(s => s.route.path === route.path && s.route.methods)
            expect(match).toBeTruthy()
        })
    })
})