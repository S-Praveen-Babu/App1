import { useState, React } from "react";
import { Link, useNavigate } from "react-router-dom";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import Auth from "../components/Auth";
import { Button, TextField } from "@material-ui/core";
// import ForgotPassword from "./ForgotPassword";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginData;
  // const navigate = useNavigate();

  const handleData = (e) => {
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) navigate("/profile");
    } catch (error) {
      toast.error("Wrong Credentials");
    }
  };
  return (
    <>
      <div className="pageContainer">
        <header>
          <h2 className="pageHeder">Please Login</h2>
        </header>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            fullWidth
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            style={{ marginBottom: "15px" }}
            onChange={handleData}
          />
          <div className="passwordInputDiv">
            <TextField
              variant="outlined"
              fullWidth
              type={showPassword ? "text" : "password"}
              style={{ marginBottom: "15px" }}
              placeholder="Password"
              id="password"
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
          <Link to="/forgot-password" className="forgotPasswordLink">
            ForgotPassword
          </Link>
          <div className="signInBar">
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Register
            </Button>
          </div>
        </form>
        <Auth />
        <Link to="/sign-up" className="registerLink">
          Don't have an account?
        </Link>
      </div>
    </>
  );
}

export default SignIn;
