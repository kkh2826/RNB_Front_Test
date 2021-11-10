import { Heading, Button, Flex, Text } from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import { useSession } from '../../hooks';
// import { requestLogout } from '../../modules/auth';

import LogoutModal from '../../components/Modal/LogoutModal';
import BookmarkDrawing from '../../components/Drawer/BookmarkDrawing';
import UserInfoDrawing from '../../components/Drawer/UserInfoDrawing';

const Header = () => {
  // const dispatch = useDispatch();
  const history = useHistory();
  const isLogin = useSelector( rootReducer => rootReducer.auth.isLogin );
  const [token, username, updateSessionInfo] = useSession();
  const onClickLogin = useCallback(() => history.push('/login'), [history]);
  // const onClickLogout = useCallback(() => {
  //   dispatch(requestLogout());
  //   history.push('/');
  // }, [history, dispatch]);

  useEffect(() => {
    updateSessionInfo();
  }, [updateSessionInfo]);

  return (
    <div className="container mx-auto p-4 flex">
      <Heading className="flex-grow" size="4xl">
        <Link to='/'>RnB</Link>
      </Heading>
      <div className="flex items-center">
        {isLogin && (
          <Flex align="center">
            <Text mr="2" fontSize="lg">
              {username} 님
            </Text>
            {/* <Button onClick={onClickLogout}>로그아웃</Button> */}
            <LogoutModal />
          </Flex>
        )}
        {!isLogin && <Button onClick={onClickLogin}>로그인</Button>}
        <ColorModeSwitcher />
        <BookmarkDrawing />
        <UserInfoDrawing />
      </div>
    </div>
  );
};

export default Header;
