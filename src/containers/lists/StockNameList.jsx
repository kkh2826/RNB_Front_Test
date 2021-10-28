import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import StockName from '../../components/StockName';
import { fetchStockList } from '../../modules/stock';

const StockNameList = () => {
  const dispatch = useDispatch();
  const stockList = useSelector( rootReducer => rootReducer.stock.stockList );
  const key = useSelector( rootReducer => rootReducer.stock.key );
  useEffect(() => {
    function GetStockList() {
      dispatch(fetchStockList())
    }
    GetStockList()
  }, [dispatch])
  return (
    <div>
      {stockList
        .filter(({stockName}) => stockName.toUpperCase().includes(key.toUpperCase()))
        .map(stockInfo => (
          <StockName key={stockInfo.stockCode} stockCode={stockInfo.stockCode} stockName={stockInfo.stockName} />
        ))}
    </div>
  );
};

export default StockNameList;
