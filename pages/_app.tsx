import "../styles/globals.css";
import type { AppProps } from "next/app";
import AuthContextProvider from "../context/auth/AuthContext";
import axios from "axios";
import CommonContextProvider from "../context/CommonContext";
import CartContextProvider from "../context/CartContext";

function MyApp({ Component, pageProps }: AppProps) {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
  return (
    <CartContextProvider>
      <CommonContextProvider>
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      </CommonContextProvider>
    </CartContextProvider>
  );
}

export default MyApp;
