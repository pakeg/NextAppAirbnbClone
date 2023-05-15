"use client";
import { Listing, Reservation } from "@prisma/client";
import { SafeUser } from "../../types/index";
import { useMemo, useState, useCallback, useEffect } from "react";
import { SafeReservation } from "../../types/index";

import Container from "../Container";
import { categories } from "../navbar/Categories";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import ListingReservation from "./ListingReservation";
import useLoginModal from "../../hooks/useLoginModal";
import { useRouter } from "next/router";
import { eachDayOfInterval, differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";

const ititialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface IListingCardProps {
  reservation?: SafeReservation[];
  listing: Listing & {
    user: SafeUser;
  };
  currentUser: SafeUser;
}

const ListingCard: React.FC<IListingCardProps> = ({
  listing,
  currentUser,
  reservation = [],
}) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label == listing.category);
  }, [listing.category]);
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservation.forEach((item) => {
      const range = eachDayOfInterval({
        start: new Date(item.startDate),
        end: new Date(item.endDate),
      });

      dates.push(...range);
    });

    return dates;
  }, [reservation]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(ititialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);
    axios
      .post("/api/reservation", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Listing reserved!");
        setDateRange(ititialDateRange);
        router.reload();
      })
      .catch(() => {
        toast.error("Listing not reserved! Something went wrong...");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

  useEffect(() => {
    let dayCount;
    if (dateRange.startDate && dateRange.endDate) {
      dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
    }

    if (dayCount && listing.price) {
      setTotalPrice(dayCount * listing.price);
    } else {
      setTotalPrice(listing.price);
    }
  }, [dateRange, listing.price]);

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
              roomCout={listing.roomCount}
              guestCount={listing.guestCount}
              bathRoomCount={listing.bathRoomCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingCard;
