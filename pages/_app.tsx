import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/navbar/Navbar";
import Modal from "../components/modals/Modal";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Modal isOpen={true} />
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
