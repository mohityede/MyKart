import { Link } from "react-router-dom"
import logo from "../assets/MyKart-logo.png"

const user = { _id: 123 }

function Header() {
  return (
    <div className="header">

      <img className="logo-img" src={logo} alt="mykart-logo" />

      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"/search"}>Search</Link>
        <Link to={"/cart"}>cart</Link>
        {
          user?._id ? (
            <>
              <button>
                profile
              </button>
              <dialog>
                <div>
                  <Link to="/orders">
                    Orders
                  </Link>
                  <button >
                    signOut
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
