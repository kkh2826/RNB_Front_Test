import { startLoading, finishLoading } from '../modules/loading.js';

function createRequestThunk(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return params => async dispatch => {
    dispatch({ type });
    dispatch(startLoading(type));
    try {
      const response = await request(params);
      const jsonString = await response.json();
      const payload = JSON.parse(jsonString);
      dispatch({
        type: SUCCESS,
        payload: payload,
      });
    } catch (e) {
      dispatch({
        type: FAILURE,
        payload: e,
        error: true,
      });
      console.log(e);
    } finally {
      dispatch(finishLoading(type));
    }
  };
}
export default createRequestThunk;
