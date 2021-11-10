import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StockBasicInfo from '../components/StockBasicInfo';
import StockNameList from '../containers/lists/StockNameList';
import Pagination from '../containers/lists/Pagination';
import { selectPeriod } from '../modules/stock';
import { Flex, Text, Button, Box, Spacer } from '@chakra-ui/react';
import { Stat, StatLabel, StatNumber, StatHelpText, StatArrow, StatGroup } from "@chakra-ui/react"

import StockChart from '../components/StockChart';

const MainBoard = () => {
  return (
    <div className="grid grid-cols-3 gap-4 h-full">
      <div className="col-span-2 grid gap-4 ">
        <StockDetail />
      </div>
      <div className="col-span-1 h-full">
        <StockList />
      </div>
    </div>
  );
};
const StockDetail = () => {
  const dispatch = useDispatch();
  const selectStock = useSelector( rootReducer => rootReducer.stock.selectStock );
  const selectedPeriod = useSelector( rootReducer => rootReducer.stock.selectPeriod );
  const stockBasicPrice = useSelector( rootReducer => rootReducer.stock.priceBasic );
  const [periods] = useState({
    'ONEMONTH' : '1개월',
    'THREEMONTH': '3개월',
    'SIXMONTH': '6개월',
    'ONEYEAR': '1년',
    'TENYEARS': '10년'
  })

  const onClick = useCallback((e) => {
    dispatch(selectPeriod(e.target.id));
  }, [dispatch])
  return (
    <div className="">
      <Flex alignItems="center" className="mb-4">
        <Text fontSize="3xl">{selectStock.stockName}</Text>
        <Text fontSize="lg" color="gray.500" className="ml-2">{selectStock.stockCode}</Text>
      </Flex>
      {selectStock.stockName !== '' && (
        <Flex className="mb-6">
          <Box>
            <StatGroup>
              <Stat>
                <StatLabel>현재주가</StatLabel>
                <StatNumber fontSize="3xl">
                  {stockBasicPrice.CURRENT} 원
                  <StatHelpText>
                    {stockBasicPrice.POSITIVEFLAG === 1 ? 
                      (<StatArrow type="increase" />) :
                      (<StatArrow type="decrease" />)
                    }
                    {stockBasicPrice.UPDOWNRATE} %
                  </StatHelpText>
                </StatNumber>
              </Stat>
            </StatGroup>
          </Box>
          <Spacer />
          {Object.keys(periods).map( p => (
            <Button
              className="mr-1"
              size="sm"
              id={p}
              key={`perod_button_${p}`}
              variant={p === selectedPeriod ? 'solid' : 'ghost'}
              onClick={onClick}
            >
              {periods[p]}
            </Button>
          ))}
        </Flex>
      )}
      
      <StockChart />
    </div>
  );
};
const StockList = () => {
  return (
    <div className="py-3 px-2 border rounded h-full">
      <div className="flex flex-col justify-between h-full">
        <StockBasicInfo />
        <StockNameList />
        <Pagination />
      </div>
    </div>
  );
};

export default MainBoard;
