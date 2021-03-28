import React, {useEffect} from "react";
import jwt_decode from "jwt-decode";
import {useState} from "react";
import isAuthenticated from "../src/utils/isAuthenticated";
import {constants} from "../constants";
import httpClient from "../src/utils/httpClient";


interface IUser {
    name: string;
    [propName: string]: any;
}

interface IProfile {
    user?: IUser | null;
    isLoggedIn: boolean;
    setUserData: (values: any) => void;
    getCurrentUser: () => void;
}
export const ProfileContext = React.createContext<IProfile>(
    {
        isLoggedIn: isAuthenticated(),
        // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
        setUserData: values => {},
        user: null,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        getCurrentUser: () => {},
    });

export const ProfileProvider = ({children}: any) =>{
    const [user, setUser] = useState<any>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=>{
        setIsLoggedIn(isAuthenticated())
        if(isAuthenticated()){
            getCurrentUser();
        }
    },[])

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const getCurrentUser = () =>{
        if(typeof window !== 'undefined') {
            const accessToken = localStorage.getItem('access_token');
            if ([undefined, null, ''].includes(accessToken)) {
                return null;
            }
            try {

                if (accessToken !== null) {
                    const decodedToken = jwt_decode(accessToken);
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    httpClient.get(`${constants.BASE_URL}/user/${decodedToken.id}`)
                        .then(r =>{
                            console.log(r)
                            setUser(r.data);
                        })
                        .catch(e=>console.log(e))
                }
            } catch (e) {
                return null;
            }
        }
        return  null
    }

    const setUserData = (values: any) => {
        setUser(values);
    }
    return(
        <ProfileContext.Provider value={{isLoggedIn, user, setUserData, getCurrentUser}}>
            {children}
        </ProfileContext.Provider>
    );
};

