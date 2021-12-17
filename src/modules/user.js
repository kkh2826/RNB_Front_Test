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

const reducer = handleActions(
    {
        [SET_USER_STOCK_INFO]: (state, { payload }) => ({
            userStockInfo: payload
        })
    },
    initialState
)

export default reducer;