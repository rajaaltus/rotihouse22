import { AuthContext } from "../context/auth/AuthContext";
import { useContext } from 'react';


export const useAuth = () => {
  const ctx = useContext(AuthContext);
  return {
    ...ctx
  }
}