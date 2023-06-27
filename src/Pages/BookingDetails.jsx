import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import Dates from "../Dates";

const BookingDetails = () => {
  const [booking, setBooking] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((res) => {
        const findBooking = res.data.find(({ _id }) => _id === id);
        if (findBooking) {
          setBooking(findBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return "";
  }

  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex justify-between items-center">
        <div>
          <h2 className="text-2xl mb-2">Your booking information:</h2>
          <Dates booking={booking}></Dates>
        </div>

        <div className="bg-primary p-4 text-white rounded-2xl p-6">
          <div>Total price</div>
          <div className="text-3xl">${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place}></PlaceGallery>
    </div>
  );
};

export default BookingDetails;
