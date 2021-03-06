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
const CHANGEPAGE = 'stock/CHANGEPAGE';
const SELECTSTOCK = 'stock/SELECTSTOCK';
const SELECTPERIOD = 'stock/SELECTPERIOD';
const TOGGLEBOOKMARK = 'stock/TOGGLEBOOKMARK';

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
export const changePage = createAction(CHANGEPAGE, page => page);
export const selectStock = createAction(SELECTSTOCK, stockCode=>stockCode);
export const selectPeriod = createAction(SELECTPERIOD, period=>period);
export const toggleBookmark = createAction(TOGGLEBOOKMARK);

// initial state
const initialState = {
  stockList: [],
  searchStockList: [],
  key: '',
  selectStock: {stockCode: '종목을 선택하세요.', stockName: ''},
  priceList: [],
  selectPeriod: 'ONEMONTH',
  selectPricePeriod: [],
  priceBasic: {},
  pagenation: {
    currentPage: 1,
    pagesTotalCount: null,
    itemsPerPage: 15,
    pageGroupSize: 8,
    pageGroupTotalCount: null,
  }
};

// reducer
const reducer = handleActions(
  {
    [FETCH_STOCK_LIST_SUCCESS]: (state, { payload: data }) => {
      const pagesTotalCount = Math.ceil(data.length / state.pagenation.itemsPerPage)
      const pageGroupTotalCount = pagesTotalCount / state.pagenation.pageGroupSize
      const stars = localStorage.getItem('stars') || '';
      const stockListWithBookmark = data.map(item => {
        const bookmark = stars.includes(item.stockCode);
        return {
          ...item,
          bookmark
        }
      })

      return {
        ...state,
        stockList: stockListWithBookmark,
        searchStockList: stockListWithBookmark,
        pagenation: {
          ...state.pagenation,
          currentPage: 1,
          pagesTotalCount: pagesTotalCount,
          pageGroupTotalCount: pageGroupTotalCount
        }
      }
    },
    [CHANGEKEY]: (state, { payload: stockName }) => {
      const searchStockList = state.stockList.filter(stockInfo => stockInfo.stockName.toUpperCase().includes(stockName.toUpperCase()))
      const pagesTotalCount = Math.ceil(searchStockList.length / state.pagenation.itemsPerPage)
      const pageGroupTotalCount = Math.ceil(pagesTotalCount / state.pagenation.pageGroupSize)

      return {
        ...state,
        key: stockName,
        searchStockList: searchStockList,
        pagenation: {
          ...state.pagenation,
          currentPage: 1,
          pagesTotalCount: pagesTotalCount,
          pageGroupTotalCount: pageGroupTotalCount
        }
      }
    },
    
    [CHANGEPAGE]: (state, { payload: page }) => {
      const { pagesTotalCount } = state.pagenation
      const currentPage = Math.min(Math.max(1, page), pagesTotalCount)

      return {
        ...state,
        pagenation: {
          ...state.pagenation,
          currentPage: currentPage
        }
      }
    },

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
    }),
    [TOGGLEBOOKMARK]: (state, { paylaod: stockCode, bookmark }) => {
      const stockList = state.stockList.map(stock => {
        if (stock.stockCode === stockCode) {
          return {
            ...state,
            bookmark: !bookmark
          }
        }
        return stock;
      });
      const searchStockList = state.searchStockList.map(searchStock => {
        if (searchStock.stockCode === stockCode) {
          return {
            ...state,
            bookmark: !bookmark
          }
        }
        return searchStock;
      });
      return {
        ...state,
        stocklist: stockList,
        searchStocklist: searchStockList
      }
    }
  },
  initialState
);

export default reducer;
