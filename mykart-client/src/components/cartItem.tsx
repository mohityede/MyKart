import { FaCircleMinus, FaTrashCan } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";

type itemProps = { cartItem: any };

function CartItem({ cartItem }: itemProps) {
  const { productId, name, photo, price, quantity } = cartItem;
  return (
    <div className="cartitem">
      <img src={photo} alt={name} />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>₹{price}</span>
      </article>
      <div>
        <FaCircleMinus className="btn" />
        <p>{quantity}</p>
        <IoIosAddCircle className="btn" />
      </div>
      <FaTrashCan className="btndelete" />
    </div>
  );
}

export default CartItem;
