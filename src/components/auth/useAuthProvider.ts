import { useState } from 'react';

import { UtilisateursType } from '../../Types';
import dashboardAuth from './dashboardAuth';

export interface IUseAuthProvider {
    signIn: (user: UtilisateursType) => void;
    signOut: () => void;
    user: null | UtilisateursType;
}


const useAuthProvider =() : IUseAuthProvider =>{
    const [user, setUser] = useState<null |UtilisateursType>(null);

    

    const signIn = (user: UtilisateursType) =>{
        dashboardAuth.signIn(()=>{
            setUser(user);
            //history.push('/dashboard');
            
        })
    };
    const signOut = () =>{
        dashboardAuth.signOut(()=>{
            setUser(null);
            //Cookies.remove(user);
        })
    };

    return {
        user,
        signIn, 
        signOut
    }
};

export default useAuthProvider;