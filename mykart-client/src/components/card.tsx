import { ProductProps } from "../types/props";

function Card({ productId, name, photo, price, stock, handler }: ProductProps) {
  return (
    <div className="productcard">
      <img src={photo} alt={name} />
      <p>{name}</p>
      <span>₹{price}</span>
      <div>
        <button
          onClick={() =>
            handler({ productId, name, photo, price, stock, quantity: 1 })
          }
        >
          add to cart
        </button>
      </div>
    </div>
  );
}

export default Card;
