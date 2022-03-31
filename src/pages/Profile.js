import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { Link , useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import {toast} from 'react-toastify';
import {Button} from '@material-ui/core'

function Profile() {
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const [changeDetails, setChangeDetails] = useState(false);
  const { name, email } = formData;
  const navigate = useNavigate();
  const onLogout = () => {
    auth.signOut();
    navigate("/"); 
  };
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
           displayName: name ,
          })
      }
      //firestore update
      const useRef = doc(db, "users",auth.currentUser.uid);
      await updateDoc(useRef, { name });
    } catch (error) {
      toast.error('Could not update' )
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <Button variant="contained" color="primary" className="logOut" onClick={onLogout}>
          Logout
        </Button>
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">My Details</p>
          <p
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? "done" : "change"}
          </p>
        </div>
        <div className="profileCard">
          <form>
            <input
              type="text"
              id="name"
              className={!changeDetails ? "profileName" : "profileNameActive"}
              disabled={!changeDetails}
              value={name}
              onChange={handleChange}
            />
            <input
              type="text"
              id="email"
              className={!changeDetails ? "profileEmail" : "profileEmailActive"}
              disabled={!changeDetails}
              value={email}
              onChange={handleChange}
            />
          </form>
        </div>
        <Link to='/createlisting' style={{marginTop:"18px"}}>
         <Button variant="contained" color="primary">Post an Add</Button>
        </Link>
      </main>
    </div>
  );
}

export default Profile;
