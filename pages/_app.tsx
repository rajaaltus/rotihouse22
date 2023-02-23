import "../styles/globals.css";
import type { AppProps } from "next/app";
import AuthContextProvider from "../context/auth/AuthContext";
import axios from "axios";
import CommonContextProvider from "../context/CommonContext";
import CartContextProvider from "../context/CartContext";
import "../i18n";

function MyApp({ Component, pageProps }: AppProps) {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
  return (
    <CommonContextProvider>
      <CartContextProvider>
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      </CartContextProvider>
    </CommonContextProvider>
  );
}

export default MyApp;
