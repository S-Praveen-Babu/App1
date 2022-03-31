// import React from "react";
// import { useState, useEffect } from "react";
// import { useParams, useSearchParams } from "react-router-dom";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../firebase.config";
// import { toast } from "react-toastify";
// import {Button} from '@material-ui/core'
// const Contact = () => {
//   const [message, setMessage] = useState("");
//   const [owner, setOwner] = useState(null);
//   const [searchParams, setSearchParams] = useParams();

//   const params = useParams();
//   useEffect(() => {
//     const getOwner = async () => {
//       const docRef = doc(db, "users", params.ownerId);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         setOwner(docSnap.data());
//       } else {
//         toast.error("Could not fetch owner details");
//       }
//     };
//     getOwner();
//   }, [params.owner]);

//   const handleChange=(e)=>{
//     setMessage(e.target.value);
//   }
//   return (
//     <div className="pageContainer">
//       <header>
//         <p className="pageHeader">Contact Owner</p>
//       </header>
//       <main>
//         <div className="contactLandlord">
//           <p className="landlordName">{owner?.name}</p>
//         </div>
//         <form className="messageForm">
//           <div className="messageDiv">
//             <label htmlFor="message" className="messageLabel">
//               Message
//             </label>
//             <textarea name="message" id="message" className="textarea" value={message} onChange={handleChange}></textarea>
//           </div>
//           <a href={`mailto:${owner.email}?Subject=${searchParams.get('listingName)}&bod=${message}`} >
//               <Button variant="contained" color="primary">Send Message </Button>
//            </a>
//         </form>
//       </main>
//     </div>
//   );
// };


import React from 'react'

const Contact = () => {
  return (
    <div>Contact</div>
  )
}

export default Contact
