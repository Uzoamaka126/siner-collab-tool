import router from '../components/users/User.router';

describe('user router', () => {
    test('has crud routes', () => {
        const routes = [
            { path: '/', method: 'get'},
            { path: '/', method: 'post'},
            { path: '/:id', method: 'get'},
            { path: '/:id', method: 'put'},
            { path: '/:id', method: 'delete'},
        ]
    })
})