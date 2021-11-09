import { handleActions, createAction } from 'redux-actions';
import createRequestThunk from '../lib/createRequestThunk';

// action name
const FETCH_STOCK_LIST = 'stock/FETCH_STOCK_LIST';
const FETCH_STOCK_LIST_SUCCESS = 'stock/FETCH_STOCK_LIST_SUCCESS';
const FETCH_STOCK_PRICELIST = 'stock/FETCH_STOCK_PRICELIST';
const FETCH_STOCK_PRICELIST_SUCCESS = 'stock/FETCH_STOCK_PRICELIST_SUCCESS';
const FETCH_STOCK_BASICPRICE = 'stock/FETCH_STOCK_BASICPRICE';
const FETCH_STOCK_BASICPRICE_SUCCESS = 'stock/FETCH_STOCK_BASICPRICE_SUCCESS';
const CHANGEKEY = 'stock/CHANGEKEY';
const SELECTSTOCK = 'stock/SELECTSTOCK';
const SELECTPERIOD = 'stock/SELECTPERIOD';

const GetStockList = market =>
  fetch(`http://127.0.0.1:8000/api/stockinfo/${market}/`);
const GetStockPriceList = stockCode =>
  fetch(`http://127.0.0.1:8000/api/stockinfo/searchdetailinfo/${stockCode}/`);
const GetStockBasicPrice = stockCode =>
  fetch(`http://127.0.0.1:8000/api/stockinfo/searchcurrentprice/${stockCode}/`);
// action creator
export const fetchStockList = createRequestThunk(FETCH_STOCK_LIST, GetStockList);
export const fetchStockPriceList = createRequestThunk(FETCH_STOCK_PRICELIST, GetStockPriceList);
export const fetchStockBasicPrice = createRequestThunk(FETCH_STOCK_BASICPRICE, GetStockBasicPrice);
export const changeKey = createAction(CHANGEKEY, stockName=>stockName);
export const selectStock = createAction(SELECTSTOCK, stockCode=>stockCode);
export const selectPeriod = createAction(SELECTPERIOD, period=>period);

// initial state
const initialState = {
  stockList: [],
  searchStockList: [],
  key: '',
  selectStock: {stockCode: '종목을 선택하세요.', stockName: ''},
  priceList: [],
  selectPeriod: 'ONEMONTH',
  selectPricePeriod: [],
  priceBasic: {}
};

// reducer
const reducer = handleActions(
  {
    [FETCH_STOCK_LIST_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      stockList: data,
      searchStockList: data
    }),
    [CHANGEKEY]: (state, { payload: stockName }) => ({
      ...state,
      key: stockName,
      searchStockList: state.stockList.filter(stockInfo => stockInfo.stockName.toUpperCase().includes(stockName.toUpperClase()))
    }),
    [SELECTSTOCK]: (state, { payload: stockCode }) => ({
      ...state,
      selectStock: state.stockList.find(stockInfo => stockInfo.stockCode === stockCode),
      selectPricePeriod: [],
    }),
    [FETCH_STOCK_PRICELIST_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      priceList: data,
      selectPricePeriod: data["ONEMONTH"]
    }),
    [SELECTPERIOD]: (state, { payload: period }) => ({
      ...state,
      selectPeriod: period,
      selectPricePeriod: state.priceList[period],
    }),
    [FETCH_STOCK_BASICPRICE_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      priceBasic: data
    })
  },
  initialState
);

export default reducer;
