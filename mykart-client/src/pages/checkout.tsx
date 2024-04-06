import toast from "react-hot-toast";
import { FormEvent, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { StripeElements } from "@stripe/stripe-js/dist";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { NewOrderRequest } from "../types/api";
import { resetCart } from "../redux/reducers/cartReducer";
import { useCreateOrderMutation } from "../redux/api/order";
import {
  CartReducerInitialState,
  UserReducerInitialState,
} from "../types/reducers";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const {
    shippingCharges,
    shippingInfo,
    cartItems,
    subTotal,
    tax,
    discount,
    total,
  } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
  );

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [newOrder] = useCreateOrderMutation();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return setIsProcessing(true);
    const orderData: NewOrderRequest = {
      shippingInfo,
      shippingCharges,
      subTotal,
      tax,
      discount,
      total,
      user: user?._id as string,
      orderItems: cartItems,
    };

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements: elements as StripeElements,
      confirmParams: { return_url: window.location.origin },
      redirect: "if_required",
    });
    if (error) {
      setIsProcessing(false);
      toast.error("Something went wrong!");
      navigate("/cart");
    }

    if (paymentIntent?.status === "succeeded") {
      const res = await newOrder(orderData);
      dispatch(resetCart());
      if ("data" in res) {
        toast.success("Order created successfully");
        navigate("/orders");
      } else {
        toast.error("something went wrong after payment successd");
      }
    }
    setIsProcessing(false);
  };

  return (
    <div className="checkoutcontainer">
      <form onSubmit={submitHandler}>
        <PaymentElement />
        <button type="submit" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
}
function Checkout() {
  const location = useLocation();
  const clientSecret: string | undefined = location.state;
  if (!clientSecret) return <Navigate to={"/shopping"} />;
  const options = {
    // passing the client secret obtained from the server
    clientSecret: clientSecret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
}

export default Checkout;
