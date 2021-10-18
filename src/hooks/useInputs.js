import { useCallback, useState } from "react";


const useInputs = (initialState={}) => {
    const [form, setForm] = useState(initialState);
    const onChange = useCallback((e) => {
        const {id, value} = e.target;
        setForm(state => ({
            ...state,
            [id]: value
        }))
    }, [])

    return [form, onChange];
}

export default useInputs;