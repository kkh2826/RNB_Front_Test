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

export const requestLogin = info => dispatch => {
    const url = 'http:127.0.0.1:8000/api/account/login/';
    async function login() {
        try {
            const response = await postData(url, info);
            const data = await response.json();
            const { user, token } = data;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('username', user.username);
        } catch(e){
            console.error(e);
        }
    }

    login();

}