import { BrowserRouter, Route, Routes } from "react-router-dom"
import { lazy, Suspense } from "react"

import Loader from "./components/loader"
import Header from "./components/header"

const Home = lazy(() => import("./pages/home"))
const Cart = lazy(() => import("./pages/cart"))
const Search = lazy(() => import("./pages/search"))

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
