import { Link } from "react-router-dom";
import Card from "../components/card";

function Home() {
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
        <Card
          productId="9784"
          name="camera"
          photo="https://m.media-amazon.com/images/I/713xBPyXC-L._SL1500_.jpg"
          price={420}
          stock={1000}
          handler={addToCartHandler}
        />
      </main>
    </div>
  );
}

export default Home;
