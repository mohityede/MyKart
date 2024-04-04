import { useEffect, useState } from "react";
import { BiSolidError } from "react-icons/bi";
import CartItem from "../components/cartItem";
import { Link, useFetcher } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartReducerInitialState } from "../types/reducers";
import { CartItem as CartItemType } from "../types/types";
import {
  addToCart,
  calculateTotal,
  removeCartItem,
} from "../redux/reducers/cartReducer";
import toast from "react-hot-toast";
import Loader from "../components/loader";

function Cart() {
  const {
    cartItems,
    loading,
    subTotal,
    total,
    tax,
    shippingCharges,
    shippingInfo,
    discount,
  } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
  );
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCoupon, setIsValidCoupon] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const timeOutID = setTimeout(() => {
      if (Math.random() > 0.5) setIsValidCoupon(true);
      else setIsValidCoupon(false);
    }, 500);

    return () => {
      clearTimeout(timeOutID);
    };
  }, [couponCode]);

  const incrementCartItemQuantity = (cartItem: CartItemType) => {
    if (cartItem.stock === cartItem.quantity) toast.error("Out of Stock");
    dispatch(
      addToCart({
        ...cartItem,
        quantity: Math.min(cartItem.stock, cartItem.quantity + 1),
      })
    );
  };
  const decrementCartItemQuantity = (cartItem: CartItemType) => {
    dispatch(
      addToCart({ ...cartItem, quantity: Math.max(1, cartItem.quantity - 1) })
    );
  };
  const deleteCartItem = (id: string) => {
    dispatch(removeCartItem(id));
  };

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems]);
  return (
    <div className="cart">
      <main>
        {!loading ? (
          cartItems.length > 0 ? (
            cartItems.map((item, ind) => (
              <CartItem
                key={ind}
                cartItem={item}
                incrementCartItemQuantity={incrementCartItemQuantity}
                decrementCartItemQuantity={decrementCartItemQuantity}
                deleteCartItem={deleteCartItem}
              />
            ))
          ) : (
            <h1>No Items Added</h1>
          )
        ) : (
          <Loader />
        )}
      </main>
      <aside>
        <p>SubTotal:₹{subTotal}</p>
        <p>Shipping Charges:₹{shippingCharges}</p>
        <p>Tax:₹{tax}</p>
        <p>
          Discounts:- <em className="green">₹{discount}</em>
        </p>
        <p>
          <b>Total: ₹{total}</b>
        </p>

        <input
          type="text"
          placeholder="coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />

        {couponCode &&
          (isValidCoupon ? (
            <span className="green">
              ₹{discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid code <BiSolidError />
            </span>
          ))}
        {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
      </aside>
    </div>
  );
}

export default Cart;
