import { Button } from '@chakra-ui/button';
import { FormControl } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import React from 'react';

const LoginPage = () => {
    return (
        <div className="flex justify-center mt-10">
            <div className="w-96 p-8 border-solid border-4 border-light-blue-500 rounded">
                <form>
                    <FormControl>
                        <Input
                            id="username"
                            placeholder="아이디"
                        />
                    </FormControl>
                    <FormControl className="mt-5">
                        <Input
                            id="password"
                            placeholder="비밀번호"
                        />
                    </FormControl>
                    <Button width="100%" size="lg" className="mt-8" type="submit">
                        로그인
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;