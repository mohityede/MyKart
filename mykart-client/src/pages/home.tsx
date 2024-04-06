import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Card from "../components/card";
import { CartItem } from "../types/types";
import { Skeleton } from "../components/loader";
import { addToCart } from "../redux/reducers/cartReducer";
import { useLatestProductsQuery } from "../redux/api/product";

function Home() {
  const { data, isLoading, isError } = useLatestProductsQuery("");
  const navigate = useNavigate();
  if (isError) toast.error("cannot fetch data!");
  const dispatch = useDispatch();
  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    navigate("/cart");
  };
  return (
    <div className="home">
      <section></section>
      <h1>
        Latest Products
        <Link to="/search" className="findmore">
          more...
        </Link>
      </h1>

      <main>
        {isLoading ? (
          <Skeleton width="25%" />
        ) : (
          data?.data.map((i) => (
            <Card
              key={i._id}
              productId={i._id}
              name={i.name}
              photo={i.photo}
              price={i.price}
              stock={i.stock}
              handler={addToCartHandler}
            />
          ))
        )}
      </main>
    </div>
  );
}

export default Home;
