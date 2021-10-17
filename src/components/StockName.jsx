import { Box, useColorModeValue } from '@chakra-ui/react';
import { useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { selectStock, fetchStockPriceList } from '../modules/stock';

//import { BsStar, BsStarFill } from 'react-icons/bs';

const StockName = ({ stockCode, stockName }) => {
  const isDark = useColorModeValue(false, true);
  const hoverColor = `hover:bg-gray-${isDark ? 500 : 200}`;
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(selectStock(stockCode));
    dispatch(fetchStockPriceList(stockCode));
  }, [dispatch, stockCode]);
  return (
    <Box
      className={`p-2 pl-4 mb-1 cursor-pointer rounded ${hoverColor}`}
      onClick={onClick}
    >
      <Box>
        {stockCode} {stockName}
      </Box>
    </Box>
  );
};

export default memo(StockName);
