import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";

import { SafeUser } from "../types/index";
import useLoginModal from "./useLoginModal";

interface IuseFavorites {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorites = ({ listingId, currentUser }: IuseFavorites) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) return loginModal.onOpen();

      try {
        let request;
        if (hasFavorite) {
          request = () => axios.delete("/api/favorites/" + listingId);
        } else {
          request = () => axios.post("/api/favorites/" + listingId);
        }
        await request();
        if (hasFavorite) toast.success("Success unliked");
        else toast.success("Success liked");
        router.reload();
      } catch (error) {
        toast.error("Failed to liked");
      }
    },
    [currentUser, hasFavorite, listingId, loginModal, router]
  );

  return {
    hasFavorite,
    toggleFavorite,
  };
};

export default useFavorites;
