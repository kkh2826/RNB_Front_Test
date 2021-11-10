import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchStockList } from '../../modules/stock';
import Pagination from './Pagination';
import Post from './Post';

const StockNameList = () => {
  const dispatch = useDispatch();
  const searchStockList = useSelector( rootReducer => rootReducer.stock.searchStockList );
  const stockList = useSelector( rootReducer => rootReducer.stock.stockList );

  const [currentPosts, setCurrentPosts] = useState(searchStockList);
  const itemsPerPage = useSelector( rootReducer => rootReducer.stock.pagenation.itemsPerPage);
  const currentPage = useSelector( rootReducer => rootReducer.stock.pagenation.currentPage );

  useEffect(() => {
    function GetStockList() {
      dispatch(fetchStockList())
    }
    if (stockList.length === 0)
      GetStockList()
  }, [dispatch, stockList])

  useEffect(() => {
    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const new_currentPost = searchStockList.slice(indexOfFirstPost, indexOfLastPost);
    setCurrentPosts(new_currentPost);
  }, [currentPage, searchStockList, itemsPerPage])
  
  return (
      <Post posts={currentPosts} />
  );
};

export default StockNameList;
