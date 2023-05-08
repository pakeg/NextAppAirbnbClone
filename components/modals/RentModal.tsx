"use client";

import { useState, useCallback, useMemo } from "react";
import useRentModal from "../../hooks/useRentModal";
import { useRouter } from "next/navigation";

import Modal from "./Modal";
import Heading from "../Heading";
import toast from "react-hot-toast";

import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelectInput from "../inputs/CountrySelectInput";
import CounterInput from "../inputs/CounterInput";
import dynamic from "next/dynamic";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);
  const rentModal = useRentModal();
  const router = useRouter();
  let body;

  const onBack = () => {
    setStep(step - 1);
  };

  function onNext() {
    setStep(step + 1);
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) return "Create";
    return "Next";
  }, [step]);

  const secondaryLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined;
    return "Back";
  }, [step]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });
  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  );

  const setValueCustom = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  switch (step) {
    case STEPS.CATEGORY:
      body = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Which of these best describes your place?"
            subtitle="pick a category"
          />
          <div className="grid grid-cols md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
            {categories.map((cat) => (
              <div key={cat.label} className="col-span-1">
                <CategoryInput
                  onClick={(category) => setValueCustom("category", category)}
                  selected={category === cat.label}
                  label={cat.label}
                  icon={cat.icon}
                />
              </div>
            ))}
          </div>
        </div>
      );
      break;
    case STEPS.LOCATION:
      body = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Where is your place located?"
            subtitle="Help guest find you!"
          />
          <CountrySelectInput
            value={location}
            onChange={(location) => setValueCustom("location", location)}
          />
          <Map center={location?.latlng} />
        </div>
      );
      break;
    case STEPS.INFO:
      body = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Share some basics about your place"
            subtitle="What amenities do you have?"
          />
          <CounterInput
            title="Guests"
            subtitle="How many guests?"
            value={guestCount}
            onChange={(guestCount) => setValueCustom("guestCount", guestCount)}
          />
          <hr />
          <CounterInput
            title="Rooms"
            subtitle="How many Rooms?"
            value={roomCount}
            onChange={(roomCount) => setValueCustom("roomCount", roomCount)}
          />
          <hr />
          <CounterInput
            title="Bathrooms"
            subtitle="How many Bathrooms?"
            value={bathroomCount}
            onChange={(bathroomCount) =>
              setValueCustom("bathroomCount", bathroomCount)
            }
          />
        </div>
      );
      break;
    case STEPS.IMAGES:
      body = <div className="flex flex-col gap-8">IMAGES</div>;
      break;
  }

  const footer = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      title="Home"
      actionLabel={actionLabel}
      secondaryLabel={secondaryLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      onSumbit={onNext}
      body={body}
      footer={footer}
    />
  );
};
export default RentModal;
