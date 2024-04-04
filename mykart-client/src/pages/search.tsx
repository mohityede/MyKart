import { useState } from "react";
import Card from "../components/card";
import { useSearchProductsQuery } from "../redux/api/product";
import Loader from "../components/loader";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducers/cartReducer";
import { CartItem } from "../types/types";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const reqQuery = {
    search: searchInput,
    sort,
    price: maxPrice,
    category,
    page,
  };
  console.log(reqQuery);
  const { data, isLoading, isError, error } = useSearchProductsQuery({
    search: searchInput,
    sort,
    price: maxPrice,
    category,
    page,
  });

  const filteredProducts = data?.data.filteredProductsOnly;
  const totalPages: number = data?.data.totalPages as number;

  const dispatch = useDispatch();
  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Product added to cart");
  };

  if (isError) toast.error("Error while fetching products.");
  return (
    <div className="searchpage">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (low to high)</option>
            <option value="dsc">Price (high to low)</option>
          </select>
        </div>
        <div>
          <h4>Max Price: {maxPrice}</h4>
          <input
            type="range"
            min={100}
            max={1000000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="accesories">Accesoories</option>
            <option value="sports">Sports</option>
            <option value="home">Home</option>
            <option value="beuty">Beuty</option>
            <option value="other">Other</option>
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input
          type="text"
          value={searchInput}
          placeholder="Product name..."
          onChange={(e) => setSearchInput(e.target.value)}
        />
        {!isLoading ? (
          <div className="productslist">
            {filteredProducts && filteredProducts.length >= 1 ? (
              filteredProducts.map((i) => {
                return (
                  <Card
                    key={i._id}
                    productId={i._id}
                    name={i.name}
                    photo={i.photo}
                    price={i.price}
                    stock={i.stock}
                    handler={addToCartHandler}
                  />
                );
              })
            ) : (
              <div>No Product found...</div>
            )}
          </div>
        ) : (
          <Loader />
        )}
        {totalPages > 1 && (
          <article>
            <button
              disabled={page == 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </button>
            <span>
              {page} of {totalPages}
            </span>
            <button
              disabled={page == totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </article>
        )}
      </main>
    </div>
  );
}

export default Search;
