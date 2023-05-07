"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { useState, useCallback } from "react";
import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "../../hooks/useLoginModal";
import { SafeUser } from "../../types/index";
import { signOut } from "next-auth/react";

interface IUsermenuProps {
  currentUser?: SafeUser | null;
}

const Usermenu: React.FC<IUsermenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((isOpen) => !isOpen);
  }, []);
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full
          hover:bg-neutral-100 transition cursor-pointer"
        >
          Home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border border-neutral-200
        flex flex-row items-center gap-3 rouded-full cursor-pointer hover:shadow-md 
        transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar image={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="absolute rouded-xl shadow-md w-[40vw] w-fit bg-white overflow-hidden
      right-0 top-12 text-sm"
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label="My trips" />
                <MenuItem onClick={() => {}} label="My favorites" />
                <MenuItem onClick={() => {}} label="My reservations" />
                <MenuItem onClick={() => {}} label="My properties" />
                <MenuItem onClick={() => {}} label="My home" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Usermenu;
