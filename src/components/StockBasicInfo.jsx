import { SearchIcon } from '@chakra-ui/icons';
import {
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
  } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeKey } from '../modules/stock';

const StockBasicInfo = () => {
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
    )
}

export default StockBasicInfo;