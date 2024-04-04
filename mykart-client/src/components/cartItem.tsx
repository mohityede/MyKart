import { FaCircleMinus, FaTrashCan } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { ItemProps } from "../types/props";

function CartItem({
  cartItem,
  incrementCartItemQuantity,
  decrementCartItemQuantity,
  deleteCartItem,
}: ItemProps) {
  const { productId, name, photo, price, quantity } = cartItem;
  return (
    <div className="cartitem">
      <img src={`http://localhost:7000/${photo}`} alt={name} />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>₹{price}</span>
      </article>
      <div>
        <FaCircleMinus
          className="btn"
          onClick={() => decrementCartItemQuantity(cartItem)}
        />
        <p>{quantity}</p>
        <IoIosAddCircle
          className="btn"
          onClick={() => incrementCartItemQuantity(cartItem)}
        />
      </div>
      <FaTrashCan
        className="btndelete"
        onClick={() => deleteCartItem(productId)}
      />
    </div>
  );
}

export default CartItem;
