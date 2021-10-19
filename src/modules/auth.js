import { createAction, handleActions } from 'redux-actions';

function postData(url='', data={}) {
    return fetch(url,{
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(data),
    }).catch(e => {
        console.error(e);
    })
}

const SET_AUTH = 'auth/SET_AUTH';

export const setAuth = createAction(SET_AUTH);

export const requestLogin = info => dispatch => {
    const url = 'http://127.0.0.1:8000/api/account/login/';
    async function login() {
        try {
            const response = await postData(url, info);
            const data = await response.json();
            const { user, token, success, message } = data;
            if (!success) throw new Error(message);
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('username', user.username);
            dispatch(setAuth(true));
        } catch(e){
            console.error(e);
        }
    }
    login();
}
export const requestLogout = () => dispatch => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    dispatch(setAuth(false));
}

const initialState = {
    isLogin: false
}

const reducer = handleActions(
    {
        [SET_AUTH]: (state, { payload }) => ({
            isLogin: payload
        })
    },
    initialState
)

export default reducer;