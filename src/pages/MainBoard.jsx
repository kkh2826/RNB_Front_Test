import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StockBasicInfo from '../components/StockBasicInfo';
import StockNameList from '../containers/lists/StockNameList';
import { selectPeriod } from '../modules/stock';
import { Flex, Text, Button } from '@chakra-ui/react';

import StockChart from '../components/StockChart';

const MainBoard = () => {
  return (
    <div className="grid grid-cols-3 gap-4 h-full">
      <div className="col-span-2 grid grid-rows-2 gap-4 ">
        <StackDetail />
        <StackChart />
      </div>
      <div className="col-span-1 h-full">
        <StackList />
      </div>
    </div>
  );
};
const StackDetail = () => {
  const dispatch = useDispatch();
  const selectStock = useSelector( rootReducer => rootReducer.stock.selectStock );
  const selectedPeriod = useSelector( rootReducer => rootReducer.stock.selectPeriod );

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
      <Flex className="mb-6">
        {Object.keys(periods).map( p => (
          <Button
            className="mr-1"
            size="sm"
            id={p}
            variant={p === selectedPeriod ? 'solid' : 'ghost'}
            onClick={onClick}
          >
            {periods[p]}
          </Button>
        ))}
      </Flex>
      <StockChart />
    </div>
  );
};
const StackList = () => {
  return (
    <div className="py-3 px-2 border rounded">
      <StockBasicInfo />
      <StockNameList />
    </div>
  );
};
const StackChart = () => {
   return <div className=""></div>;
};

export default MainBoard;
