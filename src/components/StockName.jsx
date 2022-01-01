import { Box, useColorModeValue, Flex } from '@chakra-ui/react';
import { useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { toggleBookmark, selectStock, fetchStockBasicPrice, fetchStockPriceList } from '../modules/stock';
import { StarIcon } from '@chakra-ui/icons';
import { postUserStockInfo } from '../modules/user';

//import { BsStar, BsStarFill } from 'react-icons/bs';

const StockName = ({ bookmark, stockCode, stockName }) => {
  const dispatch = useDispatch();
  const isDark = useColorModeValue(false, true);
  const hoverColor = `hover:bg-gray-${isDark ? 500 : 200}`;
  const onClick = useCallback(() => {
    dispatch(selectStock(stockCode))
    dispatch(fetchStockBasicPrice(stockCode))
    dispatch(fetchStockPriceList(stockCode))
  }, [dispatch, stockCode])

  const onClickStar = useCallback((e) => {
    e.stopPropagation();
    const stars = localStorage.getItem('stars') || '';
    const token = `,${stockCode}`;
    const stars_ = stars.replace(token, '');

    localStorage.setItem('stars', stars_.concat(bookmark ? '' : token));
    dispatch(toggleBookmark({ stockCode, bookmark }));
    dispatch(postUserStockInfo([{ stockCode }]))
  }, [dispatch, bookmark, stockCode])
  return (
    <Box
      className={`p-2 pl-3 mb-1 cursor-pointer rounded ${hoverColor}`}
      onClick={onClick}
    >
      <Flex align="center" justify="space-between">
        <Box>
          <span>{stockCode}</span>
          <span className="pl-5">{stockName}</span>
        </Box>
        <StarIcon
          color={`${bookmark ? 'yellow' : 'gray'}.400`}
          onClick={onClickStar}
        />
      </Flex>
    </Box>
  );
};

export default memo(StockName);
