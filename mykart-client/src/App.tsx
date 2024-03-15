import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import Loader from "./components/loader";
import Header from "./components/header";
import SignUp from "./pages/login";
import Login from "./pages/login";

const Home = lazy(() => import("./pages/home"));
const Cart = lazy(() => import("./pages/cart"));
const Search = lazy(() => import("./pages/search"));
const Shipping = lazy(() => import("./pages/shipping"));

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          {/* Logged in user routes */}
          <Route path="/cart" element={<Cart />} />
          <Route>
            <Route path="/shipping" element={<Shipping />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
