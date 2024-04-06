import { Toaster } from "react-hot-toast";
import { lazy, Suspense, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Loader from "./components/loader";
import Header from "./components/header";
import Protected from "./components/protected";
import { auth } from "./firebase";
import { User } from "./types/types";
import { getUser } from "./redux/api/user";
import { userExist, userNotExist } from "./redux/reducers/userReducer";
import { UserReducerInitialState } from "./types/reducers";

const Home = lazy(() => import("./pages/home"));
const Cart = lazy(() => import("./pages/cart"));
const Login = lazy(() => import("./pages/login"));
const Search = lazy(() => import("./pages/search"));
const Orders = lazy(() => import("./pages/orders"));
const Checkout = lazy(() => import("./pages/checkout"));
const Shipping = lazy(() => import("./pages/shipping"));
const PageNotFound = lazy(() => import("./pages/notFound"));

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  useEffect(() => {
    onAuthStateChanged(auth, async (currUser) => {
      if (currUser) {
        const res = await getUser(currUser.uid);
        dispatch(userExist(res?.data as User));
      } else {
        dispatch(userNotExist());
      }
    });
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <BrowserRouter>
      <Header user={user} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/login"
            element={
              <Protected isAuthenticated={user ? false : true}>
                <Login />
              </Protected>
            }
          />
          {/* Logged in user routes */}
          <Route
            element={
              <Protected
                isAuthenticated={user ? true : false}
                redirect="/login"
              />
            }
          >
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/pay" element={<Checkout />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}

export default App;
