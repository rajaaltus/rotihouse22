import "../styles/globals.css";
import type { AppProps } from "next/app";
import AuthContextProvider from "../context/auth/AuthContext";
import axios from "axios";
import CommonContextProvider from "../context/CommonContext";
import CartContextProvider from "../context/CartContext";
import "../i18n";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  axios.defaults.baseURL = process.env.API_URL;
  return (
    <>
      <Script id="google-analytics" strategy="afterInteractive">
        {` (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.GTM_ID}'); `}
      </Script>
      <CommonContextProvider>
        <CartContextProvider>
          <AuthContextProvider>
            <Component {...pageProps} />
          </AuthContextProvider>
        </CartContextProvider>
      </CommonContextProvider>
    </>
  );
}

export default MyApp;
