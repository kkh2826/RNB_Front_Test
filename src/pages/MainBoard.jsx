import { SearchIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StockNameList from '../containers/lists/StockNameList';
import { changeKey } from '../modules/stock';
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
  const selectStock = useSelector( rootReducer => rootReducer.stock.selectStock );  
  return (
    <div className="">
      <Text fontSize="3xl">{selectStock.stockCode}</Text>
      <Text>{selectStock.stockName}</Text>
      {selectStock && (
        <div>
          <button>ONEYEAR</button>
          <button>ONEMONTH</button>
          <button>THREEMONTH</button>
          <button>SIXMONTH</button>
          <button>TENYEAR</button>
        </div>
      )}
    </div>
  );
};
const StackList = () => {
  const dispatch = useDispatch();
  const [searchStockName, setSearchStockName] = useState('');

  const onChange = useCallback((e) => {
    setSearchStockName(e.target.value);
  }, [])
  const onSearch = useCallback((e) => {
    if (e.type === 'click') {
      dispatch(changeKey(searchStockName))
    }
    if (e.type === 'keydown' && e.code === 'Enter') {
      dispatch(changeKey(e.target.value));
    }
  }, [dispatch, searchStockName])
  return (
    <div className="py-3 px-2 border rounded">
      <InputGroup>
        <Input
          placeholder="종목명 입력"
          className="mb-2"
          value={searchStockName}
          onChange={onChange}
          onKeyDown={onSearch}
        />
        <InputRightElement
          children={
            <IconButton
              variant="unstyled"
              isActive={false}
              icon={<SearchIcon />}
            />
          }
          onClick={onSearch}
        />
      </InputGroup>
      <StockNameList />
    </div>
  );
};
const StackChart = () => {
  return <div className=""></div>;
};

export default MainBoard;
