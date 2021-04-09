import { faEdit, faLevelDownAlt, faTimes, faUserGraduate, faUserNinja, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Grid, Typography } from '@material-ui/core';
import { useState } from 'react';
import styled from 'styled-components';

import { updateUtilisateur } from '../../Api';
import { AccessLevel } from '../../Enum';
import { UtilisateursType } from '../../Types';
import useAuth from '../auth/useAuth';

type Props = {
  history: any
};

const DashBoardFicheUser: React.FC<Props> =({history})=>{
    const auth = useAuth();
    const [user, ] = useState<UtilisateursType>(history.location.state.data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [update, setUpdate]= useState<String>('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [updatingUser, setUpdatingUser] = useState(true);

    const handleEdit = (user: UtilisateursType) =>{

        history.push({
            pathname: '/dashboard/edit/user/'+user._id,
            state: {data: user}
        });
    }

    //mise à jour de l'utilisateur dans la DB après le delete (onClick)
    async function userUpdated(user:UtilisateursType) {
        try {
            const update=await updateUtilisateur(user);
            setUpdatingUser(true);
            setUpdate(update); 
             
        } catch (e) {
        } finally {
            setUpdatingUser(false);
            history.push(user.NiveauAcces===AccessLevel.admin? '/dashboard/admins' :
            user.NiveauAcces===AccessLevel.stagiaire? '/dashboard/candidats': '/dashboard/entreprises'
            )
        }
      }
    
      //suppression (onClick) de l'utilisateur
    const handleSupprimer =()=>{
        user.Supprime=true;
        userUpdated(user);
    }

    return(
        <Wrapper>
          <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={2} alignItems='flex-end'> 
                        <Grid item>
                            <Typography variant='h4'>
                                {user?.NiveauAcces===AccessLevel.entreprise?"Fiche de l'entreprise!":
                                user?.NiveauAcces===AccessLevel.stagiaire ? 'Fiche du candidat': "Fiche de l'administrateur"
                                
                                }</Typography>
                        </Grid>
                        <Grid item>
                            <FontAwesomeIcon icon={faLevelDownAlt} size="lg"/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                        <Button variant="contained" size="small" style={{color:'white',backgroundColor:'dimGray'}}
                        onClick={()=>history.push(user.NiveauAcces===AccessLevel.admin? '/dashboard/admins' :
                        user.NiveauAcces===AccessLevel.stagiaire? '/dashboard/candidats': '/dashboard/entreprises')}
                        >
                            Retour à la liste
                        </Button>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justify='flex-end' spacing={1}>
                        <Grid item>
                            <Button variant="outlined" size="small" 
                            onClick={()=>handleEdit(user)}
                            startIcon={  <FontAwesomeIcon icon={faEdit} color="green"/>}
                            >
                                Modifier
                            </Button>
                        </Grid>
                        { user?._id !== auth?.user?._id &&
                        <Grid item>
                            <Button 
                                //onClick={supprimer}
                                variant="outlined" 
                                size="small"  
                                startIcon={<FontAwesomeIcon icon={faTimes} color="red"/>}
                                onClick={handleSupprimer}
                            >
                                Supprimer
                            </Button>
                        </Grid> 
                        }
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} style={{borderTop: '5px solid #3e99df', marginTop: '20px', marginBottom: '20px', padding: '0'}}>
                            <Grid container  style={{borderBottom: '2px solid black', marginTop: '15px'}}>
                                <Grid item>
                                    <Grid container spacing={2} > 
                                        <Grid item style={{paddingBottom: '0px'}}>
                                            <FontAwesomeIcon 
                                            icon={user?.NiveauAcces===AccessLevel.stagiaire? faUserGraduate: user?.NiveauAcces===AccessLevel.entreprise ? faUserTie: faUserNinja} 
                                            size="2x"  />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant='h5' style={{fontWeight: 'bold'}}>
                                                {user?.Entreprise? user.NomEntreprise : user?.Prenom+" "+user?.Nom}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {user?.NiveauAcces===AccessLevel.stagiaire ?
                        <>
                        <Grid item xs={12} sm={4} className='background'>
                            <b>Nom et prénom du stagiaire:</b>
                        </Grid>
                        <Grid item xs={12} sm={8} className='background'>
                            {user?.Prenom+" "+user?.Nom}
                        </Grid>
                        
                        <Grid item xs={12} sm={4} className='background'>
                            <b>Établissement scolaire:</b>
                        </Grid>
                        <Grid item xs={12} sm={8} className='background'>
                            {user?.Ecole}
                        </Grid>
                        </> : user?.NiveauAcces===AccessLevel.entreprise ?
                        <>
                            <Grid item xs={12} sm={4} className='background'>
                                <b>Entreprise:</b>
                            </Grid>
                            <Grid item xs={12} sm={8} className='background'>
                                {user?.NomEntreprise}
                            </Grid>
                            
                            <Grid item xs={12} sm={4} className='background'>
                                <b>Prénom et nom de la personne responsable:</b>
                            </Grid>
                            <Grid item xs={12} sm={8} className='background'>
                                {user?.Prenom+" "+user?.Nom}
                            </Grid>
                        </>:<>
                             <Grid item xs={12} sm={4} className='background'>
                                <b>Nom et prénom de l'administrateur:</b>
                            </Grid>
                            <Grid item xs={12} sm={8} className='background'>
                                {user?.Prenom+" "+user?.Nom}
                            </Grid>
                        </>
                        }
                        <Grid item xs={12} sm={4} className='background'>
                            <b>Courriel:</b>
                        </Grid>
                        <Grid item xs={12} sm={8} className='background'>
                            {user?.Courriel}
                        </Grid>
                        <Grid item xs={12} sm={4} className='background'>
                            <b> Téléphone:</b>
                        </Grid>
                        <Grid item xs={12} sm={8} className='background'>
                            {user?.Telephone}
                        </Grid>
                        <Grid item xs={12} sm={4} className='background'>
                            <b> Ville:</b>
                        </Grid>
                        <Grid item xs={12} sm={8} className='background'>
                            {user?.Ville}
                        </Grid>
                    </Grid>
  
                </Grid>
          </Grid>
        </Wrapper>
    )
}

export default DashBoardFicheUser;

export const Wrapper = styled.div`

.bold{
    font-weight: bold
}

.background{
    background-color: white;
    border: 1px solid gainsboro
}
`