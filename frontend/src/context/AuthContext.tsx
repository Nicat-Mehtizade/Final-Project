import { createContext, ReactNode, useState } from "react";

type AuthContextType = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export const AuthContext=createContext<AuthContextType | undefined>(undefined)
  
type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider=({children}: AuthProviderProps)=>{
    const [token,setToken]=useState<string | null>(null)

    return(
        <AuthContext.Provider value={{token,setToken}}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider