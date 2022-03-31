import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import {Button} from '@material-ui/core'

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent");
      console.log("Email was sent");
    } catch (error) {
      toast.error("Could not send reset email");
    }
  };

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>
      <main>
        <form>
          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />
          {/* <Link className="forgotPasswordLink" to="/sign-in">
            Sign In
          </Link> */}
          <Link  className="forgotPasswordLink" to="/sign-in"><Button variant="contained" color="secondary">Login</Button></Link>
          <div className="signInBar">
            {/* <div className="signInText" >
              Sent Reset Link
            </div> */}
            <Button variant="contained" color="primary" onClick={handleClick} style={{marginLeft:"8px"}}>Reset Password</Button>
            {/* <div className="signInButton">
            <Button variant="outlined" color="primary" onClick={handleClick}>Send Reset Link</Button>
              {/* <ArrowRightIcon fill="#fff" width="34px" height="34px" onClick={handleClick} /> */}
          {/* </div> */}
          </div>
        </form>
      </main>
    </div>
  );
}

export default ForgotPassword;
