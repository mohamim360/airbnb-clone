import { useParams } from "react-router-dom";

const BookingDetails = () => {
  const {id} = useParams()
  return (
    <div>
      single {id}
    </div>
  );
};

export default BookingDetails;