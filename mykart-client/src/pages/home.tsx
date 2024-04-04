import { Link } from "react-router-dom";
import Card from "../components/card";
import { useLatestProductsQuery } from "../redux/api/product";
import toast from "react-hot-toast";
import { Skeleton } from "../components/loader";

function Home() {
  const { data, isLoading, isError } = useLatestProductsQuery("");
  if (isError) toast.error("cannot fetch data!");
  const addToCartHandler = () => {};
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
