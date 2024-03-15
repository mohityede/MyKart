import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const [gender, setGender] = useState<string>("");
  const [DOB, setDOB] = useState<string>("");
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
          <button>
            <FcGoogle />
            <span>Sign in With Google</span>
          </button>
        </div>
      </main>
    </div>
  );
}

export default Login;
