import {useEffect, useState} from 'react';

function ValidationInput(errorValue){
    const [input, setInput] = useState('');
    const [isValidBlur, setIsValidBlur] = useState(false);
    const [isValidInput, setIsValidInput] = useState(false);

    let errorInput = errorValue(input);
    
    useEffect(()=>{
        if(isValidBlur && errorInput){
            setIsValidInput(true);
        } else {
            setIsValidInput(false);
        }
    }, [isValidBlur, errorInput]);

    function resetInput(){
        setInput('');
        setIsValidBlur(false);
    }

    function isBlur(e){
        setIsValidBlur(true);
    }
    
    function handleChangeInput(e){
        setInput(e.target.value);
    }

    return {
        value: input,
        handleChangeInput,
        isValidInput,
        isBlur,
        resetInput
    }
}

export default ValidationInput;