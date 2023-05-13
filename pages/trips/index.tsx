import getReservation from "../../actions/getReservation";

import Container from "../../components/Container";
import EmptyState from "../../components/EmptyState";
import TripsCard from "../../components/TripsCard";

export default function index({ currentUser, userId, reservation }) {
  if (!currentUser) {
    return (
      <EmptyState showReset title="Unauthorized" subtitle="Please login!" />
    );
  }

  if (reservation.length == 0 || currentUser.id != userId) {
    return (
      <EmptyState
        showReset
        title="No trips founded"
        subtitle="Looks like you haven't reserved any trips."
      />
    );
  }

  return (
    <Container>
      <TripsCard currentUser={currentUser} reservation={reservation} />
    </Container>
  );
}

export async function getServerSideProps(req, res) {
  const { userId } = req.query;
  const reservation = JSON.parse(await getReservation({ userId }));

  return {
    props: { reservation, userId },
  };
}
