import classes from './Checkout.module.css';
import ValidationInput from '../../hooks/ValidationInput';
import CartContext from '../../store/cart-context';
import { useContext } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const validInput = (value) => {
    if (value.trim() === '') {
        return true;
    } else {
        return false;
    }
}

const Checkout = props => {
    const cartCtx = useContext(CartContext);
    const notify = () => toast();

    let {
        value: nameInput,
        handleChangeInput: nameChangeHandle,
        isValidInput: nameIsValid,
        isBlur: nameBlur,
        resetInput: nameReset
    } = ValidationInput(validInput);

    const {
        value: streetInput,
        handleChangeInput: streetChangeHandle,
        isValidInput: streetIsValid,
        isBlur: streetBlur,
        resetInput: streetReset
    } = ValidationInput(validInput);

    const {
        value: postalInput,
        handleChangeInput: postalChangeHandle,
        isValidInput: postalIsValid,
        isBlur: postalBlur,
        resetInput: postalReset
    } = ValidationInput(validInput);

    const {
        value: cityInput,
        handleChangeInput: cityChangeHandle,
        isValidInput: cityIsValid,
        isBlur: cityBlur,
        resetInput: cityReset
    } = ValidationInput(validInput);

    const confitmHandler = (event) => {
        event.preventDefault();
        if(nameInput === '' || streetInput === '' || postalInput === '' || cityInput === ''){
            nameBlur();
            streetBlur();
            postalBlur();
            cityBlur();
        }
        if(nameIsValid || streetIsValid || postalIsValid || cityIsValid || nameInput === '' || streetInput === '' || postalInput === '' || cityInput === ''){
            return;
        }
        let userAddres = {
            name: nameInput,
            street: streetInput,
            postal: postalInput,
            city: cityInput,
            zakaz: cartCtx.items,
            toalAmout: cartCtx.totalAmount
        }
        nameReset();
        streetReset();
        postalReset();
        cityReset();
        const resolveAfter3Sec = new Promise((resolve, reject)=>{
            fetch('https://foods-a231a-default-rtdb.asia-southeast1.firebasedatabase.app/Users.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userAddres)
            }).then(response=>{
                if(response.ok){
                    resolve();
                } else {
                    reject();
                }
            })
        })
        
        toast.promise(
            resolveAfter3Sec,
            {
              pending: 'Promise is pending',
              success: 'успешно отправился 👌',
              error: 'ваши данные не отправились 🤯'
            }
        )
        
    }


    let nameClasses = nameIsValid ? `${classes.control} ${classes.invalid}` : `${classes.control}`;
    let streetClasses = streetIsValid ? `${classes.control} ${classes.invalid}` : `${classes.control}`;
    let postalClasses = postalIsValid ? `${classes.control} ${classes.invalid}` : `${classes.control}`;
    let cityClasses = cityIsValid ? `${classes.control} ${classes.invalid}` : `${classes.control}`;

    return <>
        <form onSubmit={confitmHandler} className={classes.form}>
            <div className={nameClasses}>
                <label htmlFor="name">Your name</label>
                <input type="text" id="name" value={nameInput} onChange={nameChangeHandle} onBlur={nameBlur} />
            </div>
            <div className={streetClasses}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" value={streetInput} onChange={streetChangeHandle} onBlur={streetBlur} />
            </div>
            <div className={postalClasses}>
                <label htmlFor="postal">Postal code</label>
                <input type="text" id="postal" value={postalInput} onChange={postalChangeHandle} onBlur={postalBlur} />
            </div>
            <div className={cityClasses}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" value={cityInput} onChange={cityChangeHandle} onBlur={cityBlur} />
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>Cancel</button>
                <button>Confirm</button>
            </div>
        </form>
    </>
}

export default Checkout;