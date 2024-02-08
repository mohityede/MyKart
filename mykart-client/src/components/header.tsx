import { Link } from "react-router-dom"
import logo from "../assets/MyKart-logo.png"
import { MdHome, MdSearch } from "react-icons/md"
import { CgProfile } from "react-icons/cg"
import { PiSignOut } from "react-icons/pi"
import { IoMdCart } from "react-icons/io"
import { useState } from "react"

const user = { _id: 123 }

function Header() {
  const [isDialog, setisDialog] = useState<boolean>(false);

  return (
    <div className="header">
      <img className="logo-img" src={logo} alt="mykart-logo" />
      <nav>
        <Link to={"/"}>
          <MdHome />
        </Link>
        <Link to={"/search"}>
          <MdSearch />
        </Link>
        <Link to={"/cart"}>
          <IoMdCart />
        </Link>
        {
          user?._id ? (
            <>

              <CgProfile onClick={() => setisDialog((prev) => !prev)} />

              <dialog open={isDialog}>
                <div>
                  <Link to="/orders">
                    Orders
                  </Link>
                  <button >
                    signOut <PiSignOut />
                  </button>
                </div>
              </dialog>
            </>
          ) : (
            <Link to={"/login"}>login</Link>
          )
        }
      </nav>
    </div>
  )
}

export default Header
