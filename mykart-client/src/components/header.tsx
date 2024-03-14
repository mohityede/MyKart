import { Link } from "react-router-dom";
import logo from "../assets/MyKart-logo.png";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";

const user = { _id: 123, role: "admin" };

function Header() {
  const [isDialog, setisDialog] = useState<boolean>(false);

  const logOutHandler = () => {
    setisDialog(false);
  };

  return (
    <div className="header">
      <Link to={"/"}>
        <img
          onClick={() => setisDialog(false)}
          className="logo-img"
          src={logo}
          alt="mykart-logo"
        />
      </Link>
      <nav>
        <Link to={"/search"} onClick={() => setisDialog(false)}>
          SEARCH
        </Link>
        {user?._id ? (
          <>
            <Link to={"/cart"} onClick={() => setisDialog(false)}>
              CART
            </Link>
            <button onClick={() => setisDialog((prev) => !prev)}>
              <CgProfile />
            </button>
            <dialog open={isDialog}>
              <div>
                {user?.role === "admin" && (
                  <Link
                    to={"/admin/dashboard"}
                    onClick={() => setisDialog(false)}
                  >
                    Admin
                  </Link>
                )}
                {user?.role === "user" && (
                  <Link to={"/orders"} onClick={() => setisDialog(false)}>
                    Orders
                  </Link>
                )}
                <button onClick={logOutHandler}>signOut</button>
              </div>
            </dialog>
          </>
        ) : (
          <Link to={"/login"}>login</Link>
        )}
      </nav>
    </div>
  );
}

export default Header;
