import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiSolidError } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

import { CartItem as CartItemType } from "../types/types";
import { CartReducerInitialState } from "../types/reducers";
import {
  addToCart,
  calculateTotal,
  removeCartItem,
  applyCoupon,
} from "../redux/reducers/cartReducer";
import Loader from "../components/loader";
import CartItem from "../components/cartItem";

function Cart() {
  const {
    cartItems,
    loading,
    subTotal,
    total,
    tax,
    shippingCharges,
    discount,
  } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
  );
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCoupon, setIsValidCoupon] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const timeOutID = setTimeout(() => {
      const url = `${
        import.meta.env.VITE_BACKEND_SERVER
      }/api/v1/payment/coupon?couponCode=${couponCode}`;
      const { token, cancel } = axios.CancelToken.source();
      axios
        .get(url, { cancelToken: token })
        .then((res) => {
          setIsValidCoupon(true);
          const amount: number = res.data.data.amount;
          dispatch(applyCoupon(amount));
          dispatch(calculateTotal());
        })
        .catch((err) => {
          setIsValidCoupon(false);
          dispatch(applyCoupon(0));
          dispatch(calculateTotal());
          cancel();
          toast.error(err);
        });
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
