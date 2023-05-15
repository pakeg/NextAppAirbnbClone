import getListings from "../../actions/getListings";

import Container from "../../components/Container";
import EmptyState from "../../components/EmptyState";
import PropertiesPage from "../../components/PropertiesPage";

export default function index({ currentUser, userId, listings }) {
  if (!currentUser) {
    return (
      <EmptyState showReset title="Unauthorized" subtitle="Please login!" />
    );
  }

  if (listings.length == 0 || currentUser.id != userId) {
    return (
      <EmptyState
        showReset
        title="No properties founded"
        subtitle="Looks like you haven't any properties."
      />
    );
  }

  return (
    <Container>
      <PropertiesPage currentUser={currentUser} listings={listings} />
    </Container>
  );
}

export async function getServerSideProps(req, res) {
  const { userId } = req.query;
  const listings = JSON.parse(await getListings({ userId }));

  return {
    props: { listings, userId },
  };
}
