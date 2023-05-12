import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import getListings from "../actions/getListings";
import ListingsCard from "../components/listings/ListingsCard";

export default function index({ listings, currentUser }) {
  const isEmpty = listings.length == 0;
  if (isEmpty) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div
        className="pt-24 grid grid-cols-1 sm:grid-cols-2
  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
      >
        {listings.map((listing) => {
          return (
            <ListingsCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
}

export async function getServerSideProps(req, res) {
  const listings = JSON.parse(await getListings());

  return {
    props: {
      listings,
    },
  };
}
