import '../../App.sass';

import { Grid, InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useAuth from '../auth/useAuth';

import { fetchUtilisateurs, updateUtilisateur } from '../../Api';
import { UtilisateursType } from '../../Types';
import DashBoardUsersCard from './DashBoardUsersCard';

type Props = {
    usersType: string
};

//liste des utilisateurs
const DashboardCandidats: React.FC<Props> =({usersType})=>{
    const auth = useAuth();

    const [utilisateurs, setUtilisateurs] = useState<UtilisateursType[]>([]);
    const [recherche, setRecherche]= useState<String>('');

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

    const getFullName = (user: UtilisateursType) => {
        return (user.Prenom+" "+user.Nom).toLowerCase();
    }
    
    return(
        <Wrapper>     
            <Grid container direction='column' spacing={3} alignItems='center' >
                <Grid item>
                        <TextField
                            data-testid="rechercheUsers"
                            placeholder="Rechercher"
                            onChange={(e)=>setRecherche(e.target.value)}
                            InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                        <SearchIcon/>
                                </InputAdornment>
                            )
                            }}
                            variant="outlined"
                        />
                </Grid>
             </Grid> 
            <Grid container spacing={2} className='dashboardContent' >
            {utilisateurs.length > 0 ?
                utilisateurs.map((user,index)=>( 
                    user.Supprime === false && user._id !== auth?.user?._id &&
                    (user?.NomEntreprise?.toLowerCase().includes(recherche?.toLowerCase()) || getFullName(user).includes(recherche?.toLowerCase())  )                
                    ?
                    <Grid item xs={12} sm={6} md={4} lg={3} key={user._id} >
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