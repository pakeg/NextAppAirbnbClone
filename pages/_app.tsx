import "../styles/globals.css";
import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Navbar from "../components/navbar/Navbar";
import RegisterModal from "../components/modals/RegisterModal";
import LoginModal from "../components/modals/LoginModal";
import RentModal from "../components/modals/RentModal";
import ToasterProvider from "../providers/ToasterProvider";
import axios from "axios";

export default function App({ Component, pageProps }: AppProps) {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    axios
      .get("/api/get-current-user")
      .then((user) => setCurrentUser(user.data));
  }, []);

  return (
    <>
      <ToasterProvider />
      <RegisterModal />
      <LoginModal />
      <RentModal />
      <Navbar currentUser={currentUser} />
      <Component {...pageProps} />
    </>
  );
}
