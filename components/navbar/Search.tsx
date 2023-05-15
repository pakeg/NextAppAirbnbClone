"use client";

import { BiSearch } from "react-icons/bi";
import useSearchModal from "../../hooks/useSearchModal";
import { useRouter } from "next/router";
import { useMemo } from "react";
import useCountries from "../../hooks/useCountries";
import { differenceInDays } from "date-fns";

const Search = () => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const { endDate, guestCount, locationValue, startDate } = router.query;
  const { getByValues } = useCountries();

  const locationLabel = useMemo(() => {
    if (locationValue) return getByValues(locationValue as string)?.label;
    return "Anywhere";
  }, [locationValue, getByValues]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let difference = differenceInDays(end, start);

      if (difference === 0) {
        difference = 1;
      }
      return `${difference} days`;
    }
    return "Any week";
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) return `${guestCount} Guests`;
    return "Add Guests";
  }, [guestCount]);

  return (
    <div
      onClick={searchModal.onOpen}
      className="border w-full md:w-auto py-2 rounded-full shadow-sm
    hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-row justify-between items-center">
        <div className="text-sm font-semibold px-6">{locationLabel}</div>
        <div
          className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1
        text-center"
        >
          {durationLabel}
        </div>
        <div
          className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center
        gap-3"
        >
          <div className="hidden sm:block">{guestLabel}</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
