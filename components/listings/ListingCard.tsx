"use client";
import { Listing, Reservation } from "@prisma/client";
import { SafeUser } from "../../types/index";
import { useMemo } from "react";

import Container from "../Container";
import { categories } from "../navbar/Categories";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";

interface IListingCardProps {
  reservation?: Reservation;
  listing: Listing & {
    user: SafeUser;
  };
  currentUser: SafeUser;
}

const ListingCard: React.FC<IListingCardProps> = ({ listing, currentUser }) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label == listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCout={listing.roomCout}
              guestCount={listing.guestCount}
              bathRoomCount={listing.bathRoomCount}
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingCard;
