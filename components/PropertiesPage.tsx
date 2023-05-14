"use client";

import { SafeListing, SafeUser } from "../types/index";
import Heading from "./Heading";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingsCard from "./listings/ListingsCard";

interface IPropertiesPageProps {
  currentUser?: SafeUser | null;
  listings: SafeListing[];
}

const PropertiesPage: React.FC<IPropertiesPageProps> = ({
  currentUser,
  listings,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete("/api/listing", { data: { listingId: id } })
        .then(() => {
          toast.success("Listing deleted");
          router.reload();
        })
        .catch(() => {
          toast.error("Listing not deteled");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <>
      <Heading title="Properties" subtitle="List of your properties." />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((item) => (
          <ListingsCard
            key={item.id}
            data={item}
            actionId={item.id}
            onAction={onCancel}
            disabled={deletingId === item.id}
            actionLabel="Cancel property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </>
  );
};

export default PropertiesPage;
