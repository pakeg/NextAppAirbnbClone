"use client";

import { useState, useCallback, useMemo } from "react";
import useRentModal from "../../hooks/useRentModal";
import { useRouter } from "next/navigation";

import Modal from "./Modal";
import Heading from "../Heading";

import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelectInput from "../inputs/CountrySelectInput";
import CounterInput from "../inputs/CounterInput";
import UploadImageInput from "../inputs/UploadImageInput";
import Input from "../inputs/Input";

import dynamic from "next/dynamic";
import axios from "axios";
import toast from "react-hot-toast";

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
      bathRoomCount: 1,
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
  const bathRoomCount = watch("bathRoomCount");
  const imageSrc = watch("imageSrc");
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) return onNext();
    setIsLoading(true);

    axios
      .post("/api/listing", data)
      .then(() => {
        toast.success("Listing created!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Listing not created! Try later...");
      })
      .finally(() => {
        setIsLoading(false);
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
            value={bathRoomCount}
            onChange={(bathRoomCount) =>
              setValueCustom("bathRoomCount", bathRoomCount)
            }
          />
        </div>
      );
      break;
    case STEPS.IMAGES:
      body = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Add photo"
            subtitle="Show guests how your place looks like."
          />
          <UploadImageInput
            value={imageSrc}
            onChange={(imageSrc) => setValueCustom("imageSrc", imageSrc)}
          />
        </div>
      );
      break;

    case STEPS.DESCRIPTION:
      body = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Describe your place"
            subtitle="Short and sweet works best!"
          />
          <Input
            id="title"
            label="Title"
            type="text"
            register={register}
            disabled={isLoading}
            errors={errors}
            required
          />
          <hr />
          <Input
            id="description"
            label="Description"
            register={register}
            disabled={isLoading}
            errors={errors}
            required
          />
        </div>
      );
      break;
    case STEPS.PRICE:
      body = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Set your price!"
            subtitle="How much do you charge per night?"
          />
          <Input
            id="price"
            label="Price"
            formatPrice
            type="number"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      );
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
      onSubmit={handleSubmit(onSubmit)}
      body={body}
      footer={footer}
    />
  );
};
export default RentModal;
