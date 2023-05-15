"use client";

import Modal from "./Modal";
import useSearchModal from "../../hooks/useSearchModal";
import { useRouter } from "next/router";
import { useState, useMemo, useCallback } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelectInput, {
  CountrySelectInputValue,
} from "../inputs/CountrySelectInput";
import qs from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import CalendarInput from "../inputs/CalendarInput";
import CounterInput from "../inputs/CounterInput";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = router.asPath;
  let body;
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathRoomCount, setBathRoomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [location, setLocation] = useState<CountrySelectInputValue>();

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  );

  const onBack = useCallback(() => {
    setStep(step - 1);
  }, [step]);

  const onNext = useCallback(() => {
    setStep(step + 1);
  }, [step]);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) return onNext();

    let currentQuery = {};

    if (params) currentQuery = qs.parse(params.toString());

    const updatedQuery = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathRoomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    step,
    searchModal,
    location,
    router,
    guestCount,
    roomCount,
    bathRoomCount,
    dateRange,
    onNext,
    params,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) return "Search";
    return "Next";
  }, [step]);
  const secondaryLabel = useMemo(() => {
    if (step === STEPS.LOCATION) return undefined;
    return "Back";
  }, [step]);

  switch (step) {
    case STEPS.LOCATION:
      body = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Where do you wanna go?"
            subtitle="Find a perfect location."
          />
          <CountrySelectInput
            value={location}
            onChange={(value) => setLocation(value as CountrySelectInputValue)}
          />
          <hr />
          <Map center={location?.latlng} />
        </div>
      );
      break;
    case STEPS.DATE:
      body = (
        <div className="flex flex-col gap-8">
          <Heading
            title="When do you plan to go?"
            subtitle="Make sure everywhere is free!"
          />
          <CalendarInput
            value={dateRange}
            onChange={(value) => {
              setDateRange(value.selection);
            }}
          />
        </div>
      );
      break;
    case STEPS.INFO:
      body = (
        <div className="flex flex-col gap-8">
          <Heading
            title="More information"
            subtitle="Find your perfect place!"
          />
          <CounterInput
            title="Guests"
            subtitle="How many guests are coming?"
            value={guestCount}
            onChange={(value) => setGuestCount(value)}
          />
          <CounterInput
            title="Rooms"
            subtitle="How many Rooms do you need?"
            value={roomCount}
            onChange={(value) => setRoomCount(value)}
          />
          <CounterInput
            title="Bathrooms"
            subtitle="How many bathrooms do you need?"
            value={bathRoomCount}
            onChange={(value) => setBathRoomCount(value)}
          />
        </div>
      );
      break;
  }
  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filters"
      actionLabel={actionLabel}
      secondaryLabel={secondaryLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      onClose={searchModal.onClose}
      body={body}
      onSubmit={onSubmit}
    />
  );
};

export default SearchModal;
