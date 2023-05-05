"use client";

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import Usermenu from "./Usermenu";
import { User } from "@prisma/client";

interface INavgarProps {
  currentUser?: User | null;
}

const Navgar: React.FC<INavgarProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row justify-between items-center gap-3 md:gap-0">
            <Logo />
            <Search />
            <Usermenu />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navgar;
