import { useEffect, useState } from "react";
import { BiSolidError } from "react-icons/bi";
import CartItem from "../components/cartItem";
import { Link } from "react-router-dom";

const cartItems = [
  {
    productId: "9784",
    name: "camera",
    photo: "https://m.media-amazon.com/images/I/713xBPyXC-L._SL1500_.jpg",
    price: 500,
    quantity: 4,
  },
  {
    productId: "9784",
    name: "camera",
    photo: "https://m.media-amazon.com/images/I/713xBPyXC-L._SL1500_.jpg",
    price: 500,
    quantity: 4,
  },
];
const subTotal = 4000;
const tax = Math.round(0.18 * subTotal);
const shippingCharges = 200;
const discount = 250;
const total = subTotal + tax + shippingCharges - discount;

function Cart() {
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCoupon, setIsValidCoupon] = useState<boolean>(false);

  useEffect(() => {
    const timeOutID = setTimeout(() => {
      if (Math.random() > 0.5) setIsValidCoupon(true);
      else setIsValidCoupon(false);
    }, 500);

    return () => {
      clearTimeout(timeOutID);
    };
  }, [couponCode]);
  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((item, ind) => <CartItem key={ind} cartItem={item} />)
        ) : (
          <h1>No Items Added</h1>
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
