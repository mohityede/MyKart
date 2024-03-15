type ProductProps = {
  productId: string;
  name: string;
  photo: string;
  price: number;
  stock: number;
  handler: () => void;
};

function Card({ productId, name, photo, price, stock, handler }: ProductProps) {
  return (
    <div className="productcard">
      <img src={`${photo}`} alt={name} />
      <p>{name}</p>
      <span>₹{price}</span>
      <div>
        <button onClick={() => handler()}>add to cart</button>
      </div>
    </div>
  );
}

export default Card;
