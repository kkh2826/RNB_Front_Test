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
export function deleteData(url = '', Authorization = '', data = null) {
    // Default options are marked with *
    return fetch(url, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        Authorization,
        'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data),
    }).catch(e => {
      console.error(e);
    });
  }
const SET_USER_STOCK_INFO = 'user/SET_USER_STOCK_INFO';

const initialState = {
    userStockInfo: []
}

export const setUserStockInfo = createAction(SET_USER_STOCK_INFO);

export const getUserStockInfo = session => dispatch => {
    const { token, username } = session;
    async function requestGet() {
        try {
            const url = `http://127.0.0.1:8000/api/userstockinfo/?username=${username}`;
            const jwt = `JWT ${token}`;
            const data = await getData(url, jwt);
            dispatch({ type: SET_USER_STOCK_INFO, payload: data })
        } catch (e) {
            console.log(e)
        }
    }
    requestGet()
}
export const postUserStockInfo = bookmarkList => dispatch => {
    const token = sessionStorage.getItem('token')
    async function requestPost() {
        try {
            const url = `http:127.0.0.1:8000/api/userstockinfo/`;
            const jwt = `JWT ${token}`;
            const data = { UserStockInfo: bookmarkList }
            await postData(url, jwt, data);
        } catch (e){
            console.log(e)
        }
    }
    requestPost();
}
export const deleteUserStockInfo = userStockInfo => dispatch => {
    const token = sessionStorage.getItem('token')
    async function requestDelete() {
        try {
            const url = `http:127.0.0.1:8000/api/userstockinfo/`;
            const jwt = `JWT ${token}`;
            const data = { UserStockInfo: userStockInfo }
            await deleteData(url, jwt, data);
        } catch (e){
            console.log(e)
        }
    }
    requestDelete();
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