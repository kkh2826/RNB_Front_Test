import { Button } from '@chakra-ui/button';
import { FormControl } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { useInputs } from '../hooks';
import { requestLogin } from '../modules/auth';

import RegisterAccountDrawer from './Drawer/RegisterAccountDrawer';

const LoginPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [form, onChange] = useInputs({ username: '', password: ''});
    const isLogin = useSelector( rootReducer => rootReducer.auth.isLogin );

    // const [form, setForm] = useState({ username: '', password: ''});
    // const onChange = useCallback((e) => {
    //     e.preventDefault();
    //     setForm({
    //         ...state,
    //         [id]: value
    //     })
    // })

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        dispatch(requestLogin(form));
    }, [dispatch, form])

    useEffect(() => {
        if (isLogin) history.push('/');
    }, [isLogin, history]);

    return (
        <div className="flex justify-center mt-10">
            <div className="w-96 p-8 border-solid border-4 border-light-blue-500 rounded">
                <form onSubmit={onSubmit}>
                    <FormControl>
                        <Input
                            id="username"
                            placeholder="아이디"
                            value={form.username}
                            onChange={onChange}
                        />
                    </FormControl>
                    <FormControl className="mt-5">
                        <Input
                            id="password"
                            type="password"
                            placeholder="비밀번호"
                            value={form.password}
                            onChange={onChange}
                        />
                    </FormControl>
                    <Button width="100%" size="lg" className="mt-8" type="submit">
                        로그인
                    </Button>
                    <RegisterAccountDrawer />
                </form>
            </div>
        </div>
    )
}

export default LoginPage;