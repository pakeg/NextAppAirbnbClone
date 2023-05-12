"use client";

import { SafeUser } from "../../types/index";
import { IconType } from "react-icons";
import useCountries from "../../hooks/useCountries";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../Map"), { ssr: false });

interface IListingInfoProps {
  user: SafeUser;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  description: number;
  roomCout: number;
  guestCount: number;
  bathRoomCount: number;
  locationValue: string;
}

const ListingInfo: React.FC<IListingInfoProps> = ({
  user,
  category,
  description,
  roomCout,
  guestCount,
  bathRoomCount,
  locationValue,
}) => {
  const { getByValues } = useCountries();
  const coordinates = getByValues(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>
            <span className="text-sm text-neutral-500">Hosted by</span>
            {user?.name}
          </div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCout} rooms</div>
          <div>{bathRoomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
