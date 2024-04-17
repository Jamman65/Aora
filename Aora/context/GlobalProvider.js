import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext
(GlobalContext);

const GlobalProvider = ({children}) =>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsloading] = useState(true);

    useEffect(() =>{
        getCurrentUser()
            .then((res) =>{
                if(res){
                    setIsLoggedIn(true);
                    setUser(res)
                } else{
                    setIsLoggedIn(false);
                    setUser(null);
                }
            })
            .catch((error) =>{
                console.log(error);
            })
            .finally(() =>{
                setIsloading(false);
            })
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                setUser,
                user,
                isLoading,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;