"use client";

import { SafeListing, SafeUser } from "../types/index";
import Container from "./Container";
import Heading from "./Heading";
import ListingsCard from "./listings/ListingsCard";

interface IFavoriteListingPageProps {
  favoriteListing: SafeListing;
  currentUser: SafeUser;
}

const FavoriteListingPage: React.FC<IFavoriteListingPageProps> = ({
  favoriteListing,
  currentUser,
}) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="List of places what you have favorited."
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {favoriteListing.map((listing) => {
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
};

export default FavoriteListingPage;
