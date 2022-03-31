import React from "react";
import { Link } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';


function ListingItem({ listing, id ,onDelete}) {
  return (
    <li className="categoryListing">
      <Link to={`/category/${listing.type}/${id}`} className="categoryListing">
        <img
          src={listing.imageUrls[1]}
          alt={listing.name}
          className="categoryListingImg"
        />
        <div className="categoryListingDetails">
          <p className="categoryListingLocation">{listing.location}</p>
          <p className="categoryListingName">{listing.name}</p>
          <p className="categoryListingPrice">${listing.offer ?listing.offerprice: listing.regularprice}
          {listing.type==='rent' && '/month'}</p>
       
        </div>
      </Link>
      {onDelete && (
      <DeleteIcon className='removeIcon' onClick={()=>onDelete(listing.id,listing.name)} />
      )}
    </li>
  );
}

export default ListingItem;
