import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";

function Login() {
  const [gender, setGender] = useState<string>("");
  const [DOB, setDOB] = useState<string>("");

  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      console.log(user);
    } catch (err) {
      toast.error("err");
      console.log(err);
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
