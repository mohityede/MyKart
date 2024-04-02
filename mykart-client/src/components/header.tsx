import { Link } from "react-router-dom";
import logo from "../assets/MyKart-logo.png";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import { HeaderProps } from "../types/props";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

function Header({ user }: HeaderProps) {
  const [isDialog, setisDialog] = useState<boolean>(false);

  const logOutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("User Sign out successfully!");
      setisDialog(false);
    } catch (error) {
      toast.error("Sign out failed!");
    }
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
        <Link to={"/cart"} onClick={() => setisDialog(false)}>
          CART
        </Link>
        {user?._id ? (
          <>
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
                    ADMIN
                  </Link>
                )}
                {user?.role === "user" && (
                  <Link to={"/orders"} onClick={() => setisDialog(false)}>
                    ORDERS
                  </Link>
                )}
                <button onClick={logOutHandler}>LOGOUT</button>
              </div>
            </dialog>
          </>
        ) : (
          <Link to={"/login"}>LOGIN</Link>
        )}
      </nav>
    </div>
  );
}

export default Header;
