import getListingById from "../../actions/getListingById";
import EmptyState from "../../components/EmptyState";
import ListingCard from "../../components/listings/ListingCard";

export default function index({ listing, currentUser }) {
  if (!listing) {
    return <EmptyState showReset />;
  }

  return <ListingCard listing={listing} currentUser={currentUser} />;
}

export async function getServerSideProps(req, res) {
  const { listingId } = req.query;
  const listing = JSON.parse(await getListingById(listingId));

  return {
    props: { listing },
  };
}
