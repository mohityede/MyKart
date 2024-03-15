import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function Shipping() {
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: 4400,
  });

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="shipping">
      <button className="backbtn" onClick={() => navigate("/cart")}>
        <BiArrowBack />
      </button>
      <form>
        <h1>Shipping Information:</h1>
        <input
          required
          type="text"
          placeholder="Address"
          name="address"
          value={shippingInfo.address}
          onChange={(e) => changeHandler(e)}
        />
        <input
          required
          type="text"
          placeholder="City"
          name="city"
          value={shippingInfo.city}
          onChange={(e) => changeHandler(e)}
        />
        <input
          required
          type="text"
          placeholder="State"
          name="state"
          value={shippingInfo.state}
          onChange={(e) => changeHandler(e)}
        />
        <select
          required
          name="country"
          value={shippingInfo.country}
          onChange={(e) => changeHandler(e)}
        >
          <option value="">Choose Country:</option>
          <option value="india">India</option>
        </select>

        <input
          required
          type="number"
          placeholder="Pin Code"
          name="pinCode"
          minLength={6}
          maxLength={6}
          value={shippingInfo.pinCode}
          onChange={(e) => changeHandler(e)}
        />
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
}

export default Shipping;
