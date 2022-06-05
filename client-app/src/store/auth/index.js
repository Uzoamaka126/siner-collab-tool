import api from '../../utils/api/api'

export default {
    state: () => {
        return {
            loadingState: false,
            accessTokenExpireAt: 0,
            isAuthenticated: false,
            authLoginMsg: '',
            // resetPassword,
            email: '',
            tokenDuration: 60000 * 30,
            user: null
        }
    },
    getters: {
        getUserInitials (state) {
            if (!state.user) {
                return ''
            }

            const { email, firstName, lastName } = state.user

            if (firstName && lastName) {
                return firstName.substring(0, 1) + lastName.substring(0, 1)
            }

            return email.substring(0, 2)
        },
    },
    mutations: {
        setUserAuthState(state, { email, isAuthenticated }) {
            state.isAuthenticated = isAuthenticated;
            state.email = email
        },
        setUserDataState(state, data) {
            state.user = data
        },
        addSingleWorkspaceDetails(state, data) {
            state.workspace = data
        },
    },
    actions: {
        async initLogin(context, { email, password }) {
            context.state.loadingState = true

            try {
                context.state.loadingState = false

                const { message, data: { token, id } } = await api().auth.login({ email, password })

                context.state.authLoginMsg = message
                context.state.email = email
                if (!token) {
                    throw new Error('Invalid or no token!')
                } else {
                    this.setUserDataOnLocalStorage(token, { id, email })
                    this.getCustomerProfile(context)
                }
            } catch (error) {
                context.state.loadingState = false

            }
                
        },
        setUserDataOnLocalStorage(token, userData) {
            localStorage.setItem('siner:access_token', token)
            localStorage.setItem('siner:user', userData)
        },
        async getCustomerProfile({ commit }, id) {
             context.state.loadingState = true

             try {
                context.state.loadingState = false

                const { message, data: { token, id } } = await api().auth.login({ email, password })

                context.state.authLoginMsg = message
                context.state.email = email
                if (!token) {
                    throw new Error('Invalid or no token!')
                } else {
                    this.setUserDataOnLocalStorage(token, { id, email })
                    this.getCustomerProfile(context)
                }
            } catch (error) {
                context.state.loadingState = false

            }

        }
    }
}