import toast from "react-hot-toast";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { auth } from "../firebase";
import { MassageResponse } from "../types/api";
import { useLoginMutation } from "../redux/api/user";
import { useNavigate } from "react-router-dom";

function Login() {
  const [gender, setGender] = useState<string>("");
  const [DOB, setDOB] = useState<string>("");
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const inputData = {
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        gender,
        dob: DOB,
        _id: user.uid,
        role: "user",
      };
      const res = await login(inputData);

      if ("data" in res) {
        toast.success(res.data.massage);
        navigate("/");
      } else {
        const err = res.error as FetchBaseQueryError;
        const errMsg = err.data as MassageResponse;
        toast.error(errMsg.massage);
      }
    } catch (err) {
      toast.error("err");
    }
  };
  return (
    <div className="login">
      <main>
        <h1 className="heading">Sign Up</h1>
        <div>
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender:</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            value={DOB}
            onChange={(e) => setDOB(e.target.value)}
          />
        </div>
        <div>
          <p>Already have account</p>
          <button onClick={loginHandler}>
            <FcGoogle />
            <span>Sign in With Google</span>
          </button>
        </div>
      </main>
    </div>
  );
}

export default Login;
