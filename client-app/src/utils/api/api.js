import axiosPlugin from './axios'

const api = () => {
    return {
        auth: {
            login: {
                /**
                    * User login
                    * @param {*} $body 
                    * @param {*} $config 
                    * @returns { Promise <{ 
                    * status: boolean,
                        isSuccessful: boolean,
                        message: string,
                        data: {
                            token: string,
                            id: string,
                        }> 
                    * }
                    }
                */
                post: ($body, $config) => axiosPlugin().post('/auth/login', $body, $config)
            },
            signup: {
                /**
                    * User signup
                    * @param {*} $body 
                    * @param {*} $config 
                    * @returns { Promise <{ 
                    * status: boolean,
                        isSuccessful: boolean,
                        message: string,
                        data: {
                            token: string,
                            id: string,
                        }> 
                    * }
                    }
                */
                post: ($body, $config) => axiosPlugin().$post('/auth/register', $body, $config)
            },
            getUserProfile: {
                /**
                    * User signup
                    * @param {*} $body 
                    * @param {*} $config 
                    * @returns { Promise <{ 
                    * status: boolean,
                        isSuccessful: boolean,
                        message: string,
                        data: {
                            token: string,
                            id: string,
                        }> 
                    * }
                    }
                */
                post: ($body, $config) => axiosPlugin().$post('/auth/register', $body, $config)
            }
        }
    }
}

export default api