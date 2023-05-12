import getListingById from "../../actions/getListingById";
import getReservation from "../../actions/getReservation";
import EmptyState from "../../components/EmptyState";
import ListingCard from "../../components/listings/ListingCard";

export default function index({ listing, currentUser, reservation }) {
  if (!listing) {
    return <EmptyState showReset />;
  }

  return (
    <ListingCard
      listing={listing}
      currentUser={currentUser}
      reservation={reservation}
    />
  );
}

export async function getServerSideProps(req, res) {
  const { listingId } = req.query;
  const listing = JSON.parse(await getListingById(listingId));
  const reservation = JSON.parse(await getReservation({ listingId }));

  return {
    props: { listing, reservation },
  };
}
