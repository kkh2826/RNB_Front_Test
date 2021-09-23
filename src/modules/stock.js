import axios from 'axios';
import { handleActions, createAction } from 'redux-actions';
import createRequestThunk from '../lib/createRequestThunk';

// action name
const FETCH_STOCK_LIST = 'stock/FETCH_STOCK_LIST';
const FETCH_STOCK_LIST_SUCCESS = 'stock/FETCH_STOCK_LIST_SUCCESS';
const FETCH_STOCK_PRICELIST = 'stock/FETCH_STOCK_PRICELIST';
const FETCH_STOCK_PRICELIST_SUCCESS = 'stock/FETCH_STOCK_PRICELIST_SUCCESS';
const CHANGEKEY = 'stock/CHANGEKEY';
const SELECTSTOCK = 'stock/SELECTSTOCK';
const SELECTPERIOD = 'stock/SELECTPERIOD';

// action creator
export const fetchStockList = createRequestThunk(FETCH_STOCK_LIST, () => axios.get('http://127.0.0.1:8000/api/stockinfo/KOSPI/'));
export const fetchStockPriceList = createRequestThunk(FETCH_STOCK_PRICELIST, (stockCode)=>axios.get(`http://127.0.0.1:8000/api/stockinfo/searchdetailinfo/${stockCode}/`));
export const changeKey = createAction(CHANGEKEY, stockName=>stockName);
export const selectStock = createAction(SELECTSTOCK, stockCode=>stockCode);
export const selectPeriod = createAction(SELECTPERIOD, period=>period);

// initial state
const initialState = {
  stockList: [],
  key: '',
  selectStock: {stockCode: '', stockName: ''},
  priceList: [],
  selectPeriod: 'ONEYEAR',
  //selectPricePeriod: {ONEYEAR:[]},
  selectPricePeriod: null,
};

// reducer
const reducer = handleActions(
  {
    [FETCH_STOCK_LIST_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      stockList: JSON.parse(data),
    }),
    [CHANGEKEY]: (state, { payload: stockName }) => ({
      ...state,
      key: stockName
    }),
    [SELECTSTOCK]: (state, { payload: stockCode }) => ({
      ...state,
      selectStock: state.stockList.find(stockInfo => stockInfo.stockCode === stockCode),
    }),
    [FETCH_STOCK_PRICELIST_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      priceList: JSON.parse(data)
    }),
    [SELECTPERIOD]: (state, { payload: period }) => ({
      ...state,
      selectPeriod: period,
      //selectPricePeriod: Object.entries(state.priceList).find(([key, value]) => key === "ONEYEAR").filter((key, value) => value),
      //selectPricePeriod: console.log(Object.entries(state.priceList).find(([key, value]) => key === "ONEYEAR")[1]),
      //selectPricePeriod: Object.entries(state.priceList).find(([key, value]) => key === "ONEYEAR")[1],
      selectPricePeriod: state.priceList[period],
    })
  },
  initialState
);

export default reducer;
