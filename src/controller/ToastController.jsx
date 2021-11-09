import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/toast';
import { closeToast } from '../modules/toast';
import { useDispatch } from 'react-redux';

const ToastController = () => {
    const dispatch = useDispatch();
    const toast = useToast();
    const toastOption = useSelector( rootReducer => rootReducer.toast.option);
    useEffect(() => {
        !!toastOption && toast(toastOption);
        return () => {
            dispatch(closeToast());
        }
    }, [dispatch, toast, toastOption]);
    return null;
}

export default ToastController;