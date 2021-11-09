import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import StockName from '../../components/StockName';
import { fetchStockList } from '../../modules/stock';

const StockNameList = () => {
  const dispatch = useDispatch();
  const stockList = useSelector( rootReducer => rootReducer.stock.stockList );
  const searchStockList = useSelector( rootReducer => rootReducer.stock.searchStockList );
  const key = useSelector( rootReducer => rootReducer.stock.key );

  const [currentPosts, setCurrentPosts] = useState(searchStockList);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(15);

  useEffect(() => {
    function GetStockList() {
      dispatch(fetchStockList())
    }
    GetStockList()
  }, [dispatch])
  
  useEffect(() => {
    setCurrentPage(1);
  }, [searchStockList])

  useEffect(() => {
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const new_currentPost = searchStockList.slice(indexOfFirstPost, indexOfLastPost);
    setCurrentPosts(new_currentPost);
  }, [currentPage, searchStockList, postPerPage])

  const paginate = useCallback(pageNum => setCurrentPage(pageNum));
  
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
