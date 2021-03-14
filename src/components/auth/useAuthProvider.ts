import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import dashboardAuth from './dashboardAuth';

export interface IUseAuthProvider {
    signIn: (nom: string) => void;
    signOut: (nom: string) => void;
    user: null | string;
}


const useAuthProvider =() : IUseAuthProvider =>{
    const [user, setUser] = useState<null |string>(null);

    useEffect(()=>{
        const token = Cookies.get('Eric');
        if(token) setUser('Eric');
        //console.log(user);
    },[])


    const signIn = (nom: string) =>{
        dashboardAuth.signIn(()=>{
            setUser(nom);
            //history.push('/dashboard');
            
        })
    };
    const signOut = (nom: string) =>{
        dashboardAuth.signOut(()=>{
            setUser(null);
            Cookies.remove(nom);
        })
    };

    return {
        user,
        signIn, 
        signOut
    }
};

export default useAuthProvider;