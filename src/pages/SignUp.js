import { useState, React } from "react";
import { Link, useNavigate } from "react-router-dom";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Auth from "../components/Auth";
import { Button, TextField } from "@material-ui/core";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = loginData;
  const navigate = useNavigate();

  const handleData = (e) => {
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(loginData);
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, { displayName: name });
      const userData = { ...loginData };
      // console.log(userData.password);
      delete userData.password;
      userData.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), userData);
      navigate("/");
    } catch (error) {
      toast.error("Email already exists.");
    }
  };
  return (
    <>
      <div className="pageContainer">
        <header>
          <h2 className="pageHeder">Register Page</h2>
        </header>
        <form>
          <TextField
            variant="outlined"
            type="text"
            placeholder="User Name"
            id="name"
            fullWidth
            style={{ marginBottom: "15px" }}
            value={name}
            onChange={handleData}
          />
          <TextField
            variant="outlined"
            type="email"
            placeholder="Email"
            id="email"
            fullWidth
            style={{ marginBottom: "15px" }}
            value={email}
            onChange={handleData}
          />
          <div className="passwordInputDiv">
            <TextField
              variant="outlined"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
              fullWidth
            style={{ marginBottom: "15px" }}
              value={password}
              onChange={handleData}
            />
            <img
              src={visibilityIcon}
              alt="show_password"
              className="showPassword"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <div className="signUpBar">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Register
            </Button>
          </div>
        </form>
        {/* Google Auth */}
        <Auth />
        <Link to="/sign-in" className="registerLink">
          Already have account?
        </Link>
      </div>
    </>
  );
}

export default SignUp;
