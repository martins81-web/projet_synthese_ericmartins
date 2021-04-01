import '../../App.sass';

import { Grid } from '@material-ui/core';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { fetchUtilisateurs, updateUtilisateur } from '../../Api';
import { UtilisateursType } from '../../Types';
import DashBoardUsersCard from './DashBoardUsersCard';

type Props = {
    usersType: string
};

const DashboardCandidats: React.FC<Props> =({usersType})=>{

    const [utilisateurs, setUtilisateurs] = useState<UtilisateursType[]>([]);
    
    useEffect(()=>{
        getUtilisateurs();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

    

    const getUtilisateurs = async () => {
        let users : UtilisateursType[] | undefined = await fetchUtilisateurs();
        users =users.filter(user=> 
            user.NiveauAcces=== (usersType === 'candidats' ? 111: usersType === 'entreprises' ? 333 : 999 ) && user.Supprime=== false);
        //console.log(usersType);
        setUtilisateurs(users);
    }
    
    const handleSupprimer = (user: UtilisateursType) => {
        let users= utilisateurs;
        user.Supprime=true;
        users=users.filter(user=> user.Supprime=== false);
        setUtilisateurs(users);
        //console.log(utilisateurs);
        updateUtilisateur(user);
    }

   
    
    return(
        <Wrapper>     
            <Grid container spacing={2} className='dashboardContent'>
            {utilisateurs.length > 0 ?
                utilisateurs.map((user,index)=>( 
                    user.Supprime === false ?
                <Grid item xs={12} sm={6} md={4} lg={3} key={user._id}>
                    <DashBoardUsersCard user={user} usersType={usersType} supprimer={()=>handleSupprimer(user)} />
                </Grid> 
                :null
                ))
                : 
                null
                }
            </Grid>
        </Wrapper>
    )
}

export default DashboardCandidats;

export const Wrapper = styled.div`
 

    
`