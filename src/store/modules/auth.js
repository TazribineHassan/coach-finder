let timer;
export default {
    state() {
        return {
            userId: null,
            token: null,
        };
    },
    mutations: {
        setUserCredentials(state, paylod) {
            state.userId = paylod.userId;
            state.token = paylod.token;
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

            //set timer
            const expireAt = +data.expiresIn * 1000;
            const expirationDate = expireAt + new Date().getTime();

            // store data into localStorage
            localStorage.setItem('token', data.idToken);
            localStorage.setItem('userId', data.localId);
            localStorage.setItem('expiresIn', expirationDate);

            timer = setTimeout(function(){
                context.dispatch('logout');
            }, expireAt);

            // save the data into the vue x store
            context.commit('setUserCredentials', {
                userId: data.localId,
                token: data.idToken,
            });
        },
        logout(context) {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('expiresIn');
            
            clearTimeout(timer);

            context.commit('setUserCredentials', {
                userId: null,
                token: null,
            });
        },
        login(context) {

            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const expiresIn = localStorage.getItem('expiresIn');
            
            const timeLeft = +expiresIn - new Date().getTime();

            if( timeLeft < 0){
                return;
            }
            
            timer = setTimeout(function(){
                context.dispatch('logout');
            }, timeLeft);

            if (token && userId) {
                context.commit('setUserCredentials', {
                    userId: userId,
                    token: token,
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