import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import { useContext, useState } from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const CartStx = useContext(CartContext);
  const hasItems = CartStx.items.length > 0;
  // const totalAmount = `$${CartStx.totalAmount.toFixed(2)}`;


  const cartItemRemoveHandler = (id) => {
    CartStx.removeItem(id);
  }

  const cartItemAddHandler = (item) => {
    CartStx.addItem({ ...item, amount: 1 })
  }


  const cartItems = (
    <ul className={classes["cart-items"]}>
      {CartStx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={() => cartItemAddHandler(item)}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    setIsCheckout(true);
  }

  return (
    <>
      <ToastContainer />
      <Modal onCloseCart={props.onCloseCart}>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{CartStx.totalAmount.toFixed(2)}</span>
        </div>
        {isCheckout && <Checkout onCansel={props.onCloseCart} />}
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onCloseCart}>
            Close
          </button>
          {
            hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>
          }
        </div>
      </Modal>
    </>
  );
};
export default Cart;