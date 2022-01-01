import { createAction, handleActions } from "redux-actions";

export function getData(url='', Authorization='') {
    return fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            Authorization,
            'Content-Type': 'applicaton/json'
        },
        redirect: 'follow',
        referrer: 'no-referrer',
    }).catch(e => {
        console.log(e)
    })
}
export function postData(url='', Authorization='', data=null) {
    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            Authorization,
            'Content-Type': 'applicaton/json'
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(data),
    }).catch(e => {
        console.log(e)
    })
}

const SET_USER_STOCK_INFO = 'user/SET_USER_STOCK_INFO';

const initialState = {
    userStockInfo: []
}

export const setUserStockInfo = createAction(SET_USER_STOCK_INFO);

export const getUserStockInfo = session => dispatch => {
    const { token, username } = session;
    async function get() {
        try {
            const url = `http://127.0.0.1:8000/api/userstockinfo/?username=${username}`;
            const jwt = `JWT ${token}`;
            const data = await getData(url, jwt);
            dispatch({ type: SET_USER_STOCK_INFO, payload: data })
        } catch (e) {
            console.log(e)
        }
    }
    get()
}
export const postUserStockInfo = bookmarkList => dispatch => {
    const token = sessionStorage.getItem('token')
    async function post() {
        try {
            const url = `http:127.0.0.1:8000/api/userstockinfo/`;
            const jwt = `JWT ${token}`;
            const data = { UserStockInfo: bookmarkList }
            await postData(url, jwt, data);
        } catch (e){
            console.log(e)
        }
    }
    post();
}

const reducer = handleActions(
    {
        [SET_USER_STOCK_INFO]: (state, { payload }) => ({
            userStockInfo: payload
        })
    },
    initialState
)

export default reducer;