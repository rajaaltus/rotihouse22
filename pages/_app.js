import axios from 'axios'
import { AuthContextProvider } from '../context/auth/AuthContext'
import CartContextProvider from '../context/CartContext'
import { CommonContextProvider } from '../context/CommonContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL
  return (
    <CartContextProvider>
      <AuthContextProvider>
          <CommonContextProvider>
            <Component {...pageProps} />
          </CommonContextProvider>
        </AuthContextProvider>
    </CartContextProvider>
  )
}

export default MyApp
