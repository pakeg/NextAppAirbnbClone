"use client";

import toast from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { SafeReservation, SafeUser } from "../types/index";
import Heading from "./Heading";
import Container from "./Container";
import ListingsCard from "./listings/ListingsCard";

interface IReservationPageProps {
  currentUser?: SafeUser | null;
  reservation: SafeReservation[];
}

const ReservationPage: React.FC<IReservationPageProps> = ({
  currentUser,
  reservation,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete("/api/reservation", { data: { reservationId: id } })
        .then(() => {
          toast.success("Guest reservation cancelled");
          router.reload();
        })
        .catch(() => {
          toast.error("Guest reservation not cancelled");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Reservation" subtitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservation.map((item) => (
          <ListingsCard
            key={item.id}
            data={item.listing}
            reservation={item}
            actionId={item.id}
            onAction={onCancel}
            disabled={deletingId === item.id}
            actionLabel="Cancel quest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationPage;
