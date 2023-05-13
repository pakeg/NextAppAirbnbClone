import getReservation from "../../actions/getReservation";
import EmptyState from "../../components/EmptyState";
import ReservationPage from "../../components/ReservationPage";

export default function index({ currentUser, reservation, userId }) {
  if (!currentUser) {
    return (
      <EmptyState showReset title="Unauthorized" subtitle="Please login!" />
    );
  }

  if (reservation.length == 0 || currentUser.id != userId) {
    return (
      <EmptyState
        showReset
        title="No reservations founded"
        subtitle="Looks like you haven't reservations on your properties."
      />
    );
  }

  return (
    <ReservationPage currentUser={currentUser} reservation={reservation} />
  );
}

export async function getServerSideProps(req, res) {
  const { authorId } = req.query;
  const reservation = JSON.parse(await getReservation({ authorId }));

  return {
    props: { reservation, userId: authorId },
  };
}
