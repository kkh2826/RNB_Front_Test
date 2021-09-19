import { Button, Text } from '@chakra-ui/react';
import { useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { selectStock, fetchStockPriceList } from '../modules/stock';

const StockName = ({ stockCode, stockName }) => {
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(selectStock(stockCode));
    dispatch(fetchStockPriceList(stockCode));
  }, [dispatch, stockCode]);
  return (
    <Button
      pl={4}
      variant="unstyled"
      textAlign="left"
      onClick={onClick}
      isFullWidth
    >
      <Text isTruncated>{stockCode} {stockName}</Text>
    </Button>
  );
};

export default memo(StockName);
