import { createAction, handleActions } from 'redux-actions';
import { closeToast, showToast } from './toast';

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

const isLogin = !!sessionStorage.getItem('token') || false
//const isLogin = sessionStorage.getItem('token') ? true: false

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
            dispatch(showToast({
                title: '로그인 성공',
                description: `${user.username}님 안녕하세요`,
                status: 'success',
                duration: 5000,
                isClosable: true,
                onCloseComplete: () => {
                    dispatch(closeToast());
                }
            }))
        } catch(e){
            console.error(e);
            dispatch(showToast({
                title: '로그인 실패',
                description: 'e.messasge',
                statis: 'error',
                duration: 5000,
                isClosable: true,
                onCloseComplete: () => {
                    dispatch(closeToast())
                }
            }))
        }
    }
    login();
}
export const requestLogout = () => dispatch => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    dispatch(setAuth(false));
    dispatch(
        showToast({
          title: '로그아웃 완료',
          status: 'success',
          duration: 5000,
          isClosable: true,
          onCloseComplete: () => {
            dispatch(closeToast());
          },
        })
      );
}

const initialState = {
    isLogin: isLogin
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