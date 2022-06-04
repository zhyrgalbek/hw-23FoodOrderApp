import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (prevState, action) => {
  if (action.type === "ADD") {
    let itemIndex = prevState.items.findIndex((elem)=>elem.id === action.item.id);

    let updatedItems = [];
    if(itemIndex === -1){
      updatedItems = prevState.items.concat(action.item);
    } else {
      let amountItem = {
        ...prevState.items[itemIndex],
        amount: prevState.items[itemIndex].amount + action.item.amount
      }
      
      updatedItems = [...prevState.items];
      updatedItems[itemIndex] = amountItem;
    }
    
    const updatedTotalAmount =
      prevState.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if(action.type === 'REMOVE'){
    let indexItem = prevState.items.findIndex((elem)=>elem.id === action.id);
    
    let itemId = prevState.items[indexItem];
    const updatedTotalAmount = prevState.totalAmount - itemId.price;
    
    let updatedItems = [];

    if(itemId.amount === 1){
      updatedItems = prevState.items.filter((elem)=>elem.id !== action.id);
    } else {
      let itemMinusAmount = {
        ...itemId,
        amount: itemId.amount - 1
      }
      updatedItems = [...prevState.items];
      updatedItems[indexItem] = itemMinusAmount;
    }


    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }  
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);
  const addItemToCartHandler = (item) => {
    dispatchCart({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCart({
      type: 'REMOVE',
      id: id
    })
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;