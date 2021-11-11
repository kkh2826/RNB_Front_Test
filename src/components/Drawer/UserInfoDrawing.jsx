import React from 'react';
import { IconButton, useDisclosure, Stack, Box} from '@chakra-ui/react';
import {
  Drawer,
  DrawerBody,
  // DrawerFooter, 사용하지 않은 Component
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { LockIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';

const UserInfoDrawing = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const isLogin = useSelector( rootReducer => rootReducer.auth.isLogin );


  return (
  <>
        <IconButton size="md" color="current" variant="ghost" icon={<LockIcon/>} onClick={onOpen}/>
        <Drawer
          isOpen={isOpen}
          placement="right"
          initialFocusRef={firstField}
          onClose={onClose}
          size={"xs"}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
              User Info
            </DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  {isLogin !== false ? 
                    (
                      <>
                        User Name: Admin <br/>
                        User Address : ...
                      </>
                    ) :
                    (
                      <>
                        로그인을 해주세요.
                      </>
                    )
                  }
                </Box>
              </Stack>
            </DrawerBody>
          </DrawerContent>
      </Drawer>
      </>
  );
};

export default UserInfoDrawing;