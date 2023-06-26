import { useEffect, useState } from "react";
import Perks from "./Perks";
import PhotosUploader from "./PhotosUploader";
import axios from "axios";
import AccountNav from "./AccountNav";
import { Navigate, useParams } from "react-router-dom";

const PlacesForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((res) => {
      const { data } = res;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
    });
  }, [id]);

  function headers(text) {
    return <h2 className="text-xl mt-3">{text}</h2>;
  }

  function details(text) {
    return <p className="text-gray-600 text-sm">{text}</p>;
  }

  function input(header, detail) {
    return (
      <>
        {headers(header)}
        {details(detail)}
      </>
    );
  }

  async function NewPlace(e) {
    e.preventDefault();
    const placeData = {
      title,address,addedPhotos,
      description,perks,extraInfo,
      checkIn,checkOut,maxGuests,
    }
    if (id) {
      await axios.put("/places", {
        id, ...placeData
      });
      setRedirect(true);
    } else {
      await axios.post("/places",placeData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav></AccountNav>
      <form onSubmit={NewPlace}>
        {input(
          "Title",
          "Tittle for your place.should be short and cathy as in advertisement"
        )}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
        />

        {input("Address", "Address to this place")}
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="address"
        />

        {input("Photos", "more is better")}

        <PhotosUploader
          addedPhotos={addedPhotos}
          onChanges={setAddedPhotos}
        ></PhotosUploader>

        {input("Descriptions", "description of the place")}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {input("Perks", "select all the parks of your place")}
        <div className="mt-3 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks}></Perks>
        </div>

        {input("Extra info", "house rule, etc")}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />

        {input(
          "Check in&out times",
          "Check in and out times for better time management"
        )}
        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              type="text"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
};

export default PlacesForm;
