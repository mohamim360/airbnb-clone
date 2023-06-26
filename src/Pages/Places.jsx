import { Link, useParams } from "react-router-dom";
import AccountNav from "./AccountNav";


const Places = () => {

  return (
    <div>
      <AccountNav></AccountNav>
    
        <div className="text-center">
          List of all added places
          <br></br>
          <Link
            className="bg-primary text-white py-2 px-4 rounded-full inline-flex gap-2 "
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Add new place
          </Link>
        </div>
      


    </div>
  );
};

export default Places;
