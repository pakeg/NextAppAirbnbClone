import EmptyState from "../../components/EmptyState";
import FavoriteListingPage from "../../components/FavoriteListingPage";
import getFavoriteListing from "../../actions/getFavoriteListing";

export default function index({ favoriteListing, currentUser, userId }) {
  if (!currentUser) {
    return (
      <EmptyState showReset title="Unauthorized" subtitle="Please login!" />
    );
  }

  if (favoriteListing.length == 0 || currentUser.id != userId) {
    return (
      <EmptyState
        showReset
        title="No favorites founded"
        subtitle="Looks like you haven't favorite listings."
      />
    );
  }

  return (
    <FavoriteListingPage
      favoriteListing={favoriteListing}
      currentUser={currentUser}
    />
  );
}

export async function getServerSideProps({ req, res, query }) {
  const { userId } = query;
  const favoriteListing = await getFavoriteListing(req, res);

  return {
    props: {
      favoriteListing,
      userId,
    },
  };
}
