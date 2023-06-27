import axios from "axios";
import { differenceInCalendarDays } from "date-fns/fp";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const BookWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");

  let nights = 0;
  if (checkIn && checkOut) {
    nights = differenceInCalendarDays(new Date(checkIn), new Date(checkOut));
  }

  async function handelBooking() {
    const response = await axios.post("/bookings", {
      checkIn,
      checkOut,
      guests,
      name,
      phone,
      place: place._id,
      price: nights * place.price,
    });

    const bookingId = response.data._id;

    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        price: ${place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check in:</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className=" border-l py-3 px-2">
            <label>Check out:</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>

        <div className="py-3 px-4 border-t">
          <label>Number of guests:</label>
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>

        {nights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Phone number:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        )}
      </div>

      <button onClick={handelBooking} className="primary">
        Book this place
        {nights > 0 && <span> ${nights * place.price}</span>}
      </button>
    </div>
  );
};

export default BookWidget;
