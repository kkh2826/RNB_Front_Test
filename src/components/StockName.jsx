import { Box, useColorModeValue, Flex } from '@chakra-ui/react';
import { useCallback, memo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { selectStock, fetchStockPriceList, fetchStockBasicPrice } from '../modules/stock';
import { StarIcon } from '@chakra-ui/icons';

//import { BsStar, BsStarFill } from 'react-icons/bs';

const StockName = ({ bookmark = false, stockCode, stockName }) => {
  const isDark = useColorModeValue(false, true);
  const hoverColor = `hover:bg-gray-${isDark ? 500 : 200}`;
  const [isStar, setIsStar] = useState(bookmark);
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(selectStock(stockCode));
    dispatch(fetchStockPriceList(stockCode));
    dispatch(fetchStockBasicPrice(stockCode));
  }, [dispatch, stockCode]);

  useEffect(() => {
    const stars = localStorage.getItem('starts') || '';
    const token = `,${stockCode}`

    if (isStar){
      const stars_ = stars.replace(token, '');
      localStorage.setItem('stars', stars_.concat(token));
    }

    if (stars.includes(token)){
      setIsStar(true);
    }
  }, [isStar, stockCode])

  const onClickStar = useCallback((e) => {
    e.stopPropagation();
    const stars = localStorage.getItem('stars') || '';
    const token = `,${stockCode}`;
    const stars_ = stars.replace(token, '');

    localStorage.setItem('stars', stars_.concat(isStar ? '' : token));
    setIsStar(!isStar)
  }, [isStar, stockCode])
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
          color={`${isStar ? 'yellow' : 'gray'}.400`}
          onClick={onClickStar}
        />
      </Flex>
    </Box>
  );
};

export default memo(StockName);
