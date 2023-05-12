"use client";

import { SafeReservation, SafeUser } from "../types/index";
import Heading from "./Heading";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingsCard from "./listings/ListingsCard";

interface ITripsCardProps {
  currentUser?: SafeUser | null;
  reservation: SafeReservation[];
}

const TripsCard: React.FC<ITripsCardProps> = ({ currentUser, reservation }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservation${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.reload();
        })
        .catch(() => {
          toast.error("Reservation not cancelled");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <>
      <Heading
        title="Trips"
        subtitle="Where you have been and where you are going."
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservation.map((item) => (
          <ListingsCard
            key={item.id}
            data={item.listing}
            reservation={item}
            actionId={item.id}
            onAction={onCancel}
            disabled={deletingId === item.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </>
  );
};

export default TripsCard;
