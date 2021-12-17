import { Stack } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import StockName from '../../components/StockName';
import { selectStock, fetchStockBasicPrice, fetchStockPriceList } from '../../modules/stock';

const Post = ({posts}) => {
  const dispatch = useDispatch();
  const loading = useSelector( rootReducer => rootReducer.loading['stock/FETCH_STOCK_LIST']);
  const onClick = useCallback(stock => {
    dispatch(selectStock(stock.stockCode));
    dispatch(fetchStockBasicPrice(stock.stockCode))
    dispatch(fetchStockPriceList(stock.stockCode))
  }, [dispatch])
  const SkeletonArea = () => {
    return (
      <Stack>
        <Skeleton height="36px" />
        <Skeleton height="36px" />
        <Skeleton height="36px" />
        <Skeleton height="36px" />
        <Skeleton height="36px" />
        <Skeleton height="36px" />
        <Skeleton height="36px" />
        <Skeleton height="36px" />
        <Skeleton height="36px" />
        <Skeleton height="36px" />
        <Skeleton height="36px" />
        <Skeleton height="36px" />
        <Skeleton height="36px" />
        <Skeleton height="36px" />
        <Skeleton height="36px" />
      </Stack>
    )
  }
  return (
    <ul className="flex-grow">
      {loading && <SkeletonArea />}
      {loading || posts
        .map(item => (
          <StockName 
            key={item.stockCode}
            onClick={() => onClick(item)}
             {...item} />
        ))}
    </ul>
  );
};

export default Post;