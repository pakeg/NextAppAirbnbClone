"use client";

import Container from "../Container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiWindmill,
  GiIsland,
  GiBoatFishing,
  GiCastle,
  GiForestCamp,
  GiCaveEntrance,
  GiCactus,
  GiBarn,
} from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import CategoryBox from "../CategoryBox";
import { useSearchParams, usePathname } from "next/navigation";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "Beach description description description Beach",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "Windmills description description description Windmills",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "Modern description Modern description Modern",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "Countryside Countryside Countryside description Countryside",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "TbPool TbPool description description TbPool",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "Islands description description Islands description",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "Lake description description Lake description",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "Skiing description description Skiing description Skiing",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "Castles description description Castles description Castles",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "Camping Camping Camping",
  },
  {
    label: "Artic",
    icon: BsSnow,
    description: "Artic description Artic description",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "Cave Cave Cave Cave",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "description description description description Desert",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "description Barns description description Barns",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "description Lux description Lux Lux",
  },
];

export default function Categories() {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) return null;

  return (
    <Container>
      <div
        className="pt-4 flex flex-row items-center 
      justify-between overflow-x-auto"
      >
        {categories.map((items) => (
          <CategoryBox
            key={items.label}
            label={items.label}
            icon={items.icon}
            selected={category === items.label}
          />
        ))}
      </div>
    </Container>
  );
}
