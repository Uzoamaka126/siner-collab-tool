// const apiMethodPlugin = {
//     install: (app, options) => {
//         console.log('app.$axios:', app.$axios);
//         app.config.globalProperties.$auth  = {
//             login: {
//                 /**
//                     * User login
//                     * @param {*} $body 
//                     * @param {*} $config 
//                     * @returns 
//                     */
//                 post: ($body, $config) => app.$axios.post('/auth/login', $body, $config)
//             },
//             signup: {
//                     /**
//                     * User signup
//                     * @param {*} $body 
//                     * @param {*} $config 
//                     * @returns 
//                     */
//                 post: ($body, $config) => app.$axios.$post('/auth/register', $body, $config)
//             }
//         }
//    }
// }
import axios from 'axios'

const apiMethodPlugin = {
    auth: {
        login: {
            /**
                * User login
                * @param {*} $body 
                * @param {*} $config 
                * @returns 
                */
            post: ($body, $config) => axios.post('/auth/login', $body, $config)
        },
        signup: {
                /**
                * User signup
                * @param {*} $body 
                * @param {*} $config 
                * @returns 
                */
            post: ($body, $config) => axios.$post('/auth/register', $body, $config)
        }
    }
}

export default apiMethodPlugin
