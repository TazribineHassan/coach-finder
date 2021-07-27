export default {
    state() {
        return {
            userId: null,
            token: null,
            expireIn: null
        };
    },
    mutations: {
        setUserCredentials(state, paylod) {
            state.userId = paylod.userId;
            state.token = paylod.token;
            state.expireIn = paylod.expireIn;
        },
    },
    actions: {
        async auth(context, paylod) {
            // sending the request ...
            const mode = paylod.mode;
            let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAyYX4cvc-TpPfW6wrDdli29veZLNO7i-w';
            if (mode === 'signup') {
                url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAyYX4cvc-TpPfW6wrDdli29veZLNO7i-w';
            }
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: paylod.email,
                    password: paylod.password,
                    returnSecureToken: true
                })
            });
            // extract the data
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Authentcation fialed');
            }
            // store data into localStorage
            localStorage.setItem('token', data.idToken);
            localStorage.setItem('userId', data.localId);
            // save the data into the vue x store
            context.commit('setUserCredentials', {
                userId: data.localId,
                token: data.idToken,
                expireIn: data.expiresIn
            });
        },
        logout(context) {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            context.commit('setUserCredentials', {
                userId: null,
                token: null,
                expireIn: null
            });
        },
        login(context) {

            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            if (token && userId) {
                context.commit('setUserCredentials', {
                    userId: userId,
                    token: token,
                    expireIn: null
                });
            }
        }
    },
    getters: {
        getUserId(state) {
            return state.userId;
        },
        getToken(state) {
            return state.token;
        },
        getExpireIn(state) {
            return state.expireIn;
        },
        isAuth(state) {
            return !!state.token;
        }
    }
};