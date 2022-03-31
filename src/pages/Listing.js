import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import { Button } from "@material-ui/core";

const Listing = () => {
  const [listing, setListing] = useState('');
  //   const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  //   const auth = getAuth();
  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // {
        //   console.log(docSnap.data());
        // }
        setListing(docSnap.data());
        // setLoading(false);
      }
    };
    fetchListing();
  }, [navigate, params.listingId]);
  //   return <p>Loading...</p>

  return (
    <main>
      <div className="listingDetails">
        <p className="listingName">
          {listing.name} - $
          {listing.offer ? listing.offerprice : listing.regularprice}
        </p>
          <Button  color="primary">
          For {listing.type === "rent" ? "Rent" : "Sale"}
        </Button> 
        <ul className="listingDetailsList">
          <li>No of Bathrooms:{listing.bedrooms}</li>
          <li>No of Bathrooms:{listing.bathrooms}</li>
          <li>
            Furnished Status:
            {listing.furnished ? "Fully Furnished" : "Not Furnished"}
          </li>
          <li>
            Parking Status:
            {listing.parking ? "Parking Available" : "Not Available"}
          </li>
        </ul>
        <Link to={`/contact/${listing.userRef}?listingName=${listing.name}`}>
          <Button variant="contained" color="primary">
            Contact Owner
          </Button>
        </Link> 
      </div>
    </main>
  );
};

export default Listing;
