import { useState } from "react";
import Card from "../components/card";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const addToCartHandler = () => {};
  const totalPages = 10;

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
            max={100000}
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
            <option value="electronics">Electronincs</option>
            <option value="accesories">Accesoories</option>
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
        <div className="productslist">
          <Card
            productId="9784"
            name="camera"
            photo="https://m.media-amazon.com/images/I/713xBPyXC-L._SL1500_.jpg"
            price={420}
            stock={1000}
            handler={addToCartHandler}
          />
        </div>
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
      </main>
    </div>
  );
}

export default Search;
