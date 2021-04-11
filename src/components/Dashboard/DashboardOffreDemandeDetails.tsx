import { faArrowAltCircleLeft, faArrowAltCircleRight, faEdit, faLevelDownAlt, faTimes, faUserGraduate, faUserNinja, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Grid, Typography } from '@material-ui/core';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { updateUtilisateur, updateOffreDemande, fetchRegion, fetchSecteur } from '../../Api';
import { AccessLevel } from '../../Enum';
import { UtilisateursType, OffresDemandesType, RegionsType, SecteursActiviteType } from '../../Types';
import useAuth from '../auth/useAuth';
import { useLastLocation } from 'react-router-last-location';
import userEvent from '@testing-library/user-event';

type Props = {
  history: any
};

const DashBoardOffreDemandeDetails: React.FC<Props> =({history})=>{
    const auth = useAuth();
    const lastLocation = useLastLocation();

    const [offreDemande, ] = useState<OffresDemandesType>(history.location.state.data);
    const [auteur, ] = useState<UtilisateursType>(history.location.state.auteur);
    const [region, setRegion] = useState<RegionsType | undefined>(undefined);
    const [secteur, setSecteur] = useState<SecteursActiviteType | undefined>(undefined);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [update, setUpdate]= useState<String>('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [updatingOffreDemande, setUpdatingOffreDemande] = useState(true);

    useEffect(()=>{
        getRegion(offreDemande.Region);
        getSecteur(offreDemande.SecteurActivite);
      },[])

    const handleEdit = (offreDemande: OffresDemandesType) =>{
        history.push({
            pathname: '/dashboard/edit/'+offreDemande.Type+'/'+offreDemande._id,
            state: {data: offreDemande}
        });
    }

    //mise à jour de l'utilisateur dans la DB après le delete (onClick)
    async function offreDemandeUpdated(offreDemande:OffresDemandesType) {
        try {
            const update=await updateOffreDemande(offreDemande);
            setUpdatingOffreDemande(true);
            setUpdate(update); 
             
        } catch (e) {
        } finally {
            setUpdatingOffreDemande(false);
            history.push("/dashboard/accueil/");
        }
      }
    
      //suppression (onClick) de l'utilisateur
    const handleSupprimer =()=>{
        offreDemande.Supprime=true;
        offreDemandeUpdated(offreDemande);
    }

    const getRegion=async(id:string)=>{
        let region: RegionsType| undefined = await fetchRegion(id); 
        setRegion(region);
    }

    const getSecteur=async(id:string)=>{
        let secteur: SecteursActiviteType| undefined = await fetchSecteur(id); 
        setSecteur(secteur);
    }

    function formatDate(date:Date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    return(
        <Wrapper>
          <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={2} alignItems='flex-end'> 
                        <Grid item>
                            <Typography variant='h4'>
                                {offreDemande.Type==='offre' ? "Détails de l'offre": "Détails de la demande"}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <FontAwesomeIcon icon={faLevelDownAlt} size="lg"/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                        <Button variant="contained" size="small" style={{color:'white',backgroundColor:'dimGray'}}
                        onClick={()=>history.push(lastLocation?.pathname)}
                        >
                            {lastLocation?.pathname==='/dashboard/accueil'? "Retour à l'accueil": "Retour à liste des "+offreDemande.Type+"s"}
                        </Button>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justify='flex-end' spacing={1}>
                        { (lastLocation?.pathname==='/dashboard/offres' || lastLocation?.pathname==='/dashboard/demandes') 
                        ?
                        ((auth?.user?.NiveauAcces!==AccessLevel.entreprise && offreDemande.Type==='demande')||
                        (auth?.user?.NiveauAcces!==AccessLevel.stagiaire && offreDemande.Type==='offre')) && 
                        <>
                        <Grid item>
                            <Button variant="outlined" size="small" 
                            onClick={()=>handleEdit(offreDemande)}
                            startIcon={  <FontAwesomeIcon icon={faEdit} color="green"/>}
                            >
                                Modifier
                            </Button>
                        </Grid>
                        
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
                        </> : auth?.user?.NiveauAcces===AccessLevel.admin &&
                         <>
                         <Grid item>
                            <Button variant="outlined" size="small" 
                            style={{textTransform: 'none', borderRadius: '0', backgroundColor: '#fa6980', color: 'white'}}
                            onClick={handleSupprimer}
                            >
                                Refuser
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button 
                                variant="outlined" 
                                size="small"  
                                style={{textTransform: 'none', borderRadius: '0', backgroundColor: '#72a84a', color: 'white'}}
                                onClick={()=>{ 
                                    offreDemande.Valide=true;
                                    offreDemandeUpdated(offreDemande);
                                }}
                            >
                                Accepter
                            </Button>
                        </Grid>
                         </> 
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
                                            icon={offreDemande?.Type==='offre'? faUserTie: faUserGraduate} 
                                            size="2x"  />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant='h5' style={{fontWeight: 'bold'}}>
                                                {offreDemande?.Titre}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                         {offreDemande?.Type==='offre' ?
                        <>
                        <Grid item xs={12} sm={4} className='background'>
                            <b>Nom entreprise:</b>
                        </Grid>
                        <Grid item xs={12} sm={8} className='background'>
                            {auteur.NomEntreprise}
                        </Grid>
                        <Grid item xs={12} sm={4} className='background'>
                            <b>Secteur activité:</b>
                        </Grid>
                        <Grid item xs={12} sm={8} className='background'>
                            {secteur?.Titre}
                        </Grid>
                        <Grid item xs={12} sm={4} className='background'>
                            <b>Courriel:</b>
                        </Grid>
                        <Grid item xs={12} sm={8} className='background'>
                            {auteur.Courriel}
                        </Grid>
                        <Grid item xs={12} sm={4} className='background'>
                            <b> Téléphone:</b>
                        </Grid>
                        <Grid item xs={12} sm={8} className='background'>
                            {auteur.Telephone}
                        </Grid>
                        </> 
                        : 
                        auth?.user?.NiveauAcces!==AccessLevel.entreprise &&
                        <>
                            <Grid item xs={12} sm={4} className='background'>
                                <b>Prénom et Nom:</b>
                            </Grid>
                            <Grid item xs={12} sm={8} className='background'>
                                {auteur.Prenom+" "+auteur.Nom}
                            </Grid>
                            
                            <Grid item xs={12} sm={4} className='background'>
                                <b>Téléphone:</b>
                            </Grid>
                            <Grid item xs={12} sm={8} className='background'>
                                {auteur.Telephone}
                            </Grid>
                            <Grid item xs={12} sm={4} className='background'>
                                <b>Courriel:</b>
                            </Grid>
                            <Grid item xs={12} sm={8} className='background'>
                                {auteur.Courriel}
                            </Grid>
                        </>
                        }
                        <Grid item xs={12} sm={4} className='background'>
                            <b>Ville:</b>
                        </Grid>
                        <Grid item xs={12} sm={8} className='background'>
                            {offreDemande.Ville}
                        </Grid>
                        <Grid item xs={12} sm={4} className='background'>
                            <b>Region:</b>
                        </Grid>
                        <Grid item xs={12} sm={8} className='background'>
                            {region?.Name}
                        </Grid>
                        
                        <Grid item xs={12} sm={4} className='background'>
                            <b>Date parution:</b>
                        </Grid>
                        <Grid item xs={12} sm={8} className='background'>
                            {formatDate(offreDemande.DateParution)}
                        </Grid>
                        <Grid item xs={12} sm={4} className='background'>
                            <b>Date de début:</b>
                        </Grid>
                        <Grid item xs={12} sm={8} className='background'>
                            {formatDate(offreDemande.DateDebut)}
                        </Grid>
                        <Grid item xs={12} sm={4} className='background'>
                            <b>Date de fin:</b>
                        </Grid>
                        <Grid item xs={12} sm={8} className='background'>
                            {formatDate(offreDemande.DateFin)}
                        </Grid>
                        <Grid item xs={12} sm={4} className='background'>
                            <b>Dureé:</b>
                        </Grid>
                        <Grid item xs={12} sm={8} className='background'>
                            {offreDemande.DureeSemaines+" semaines"}
                        </Grid>

    
                        { offreDemande.Type==='demande' &&
                        <>
                        <Grid item xs={12} sm={4} className='background'>
                            <b>Formation:</b>
                        </Grid>
                        <Grid item xs={12} sm={8} className='background'>
                            {offreDemande.ProgrammesSuivi}
                        </Grid>
                        <Grid item xs={12} sm={4} className='background'>
                            <b>Établissement scolaire:</b>
                        </Grid>
                        <Grid item xs={12} sm={8} className='background'>
                            {auteur.Ecole}
                        </Grid>
                        </>
                        }
                        <Grid item xs={12} sm={4} className='background'>
                            <b>Description:</b>
                        </Grid>
                        <Grid item xs={12} sm={8} className='background'>
                            {offreDemande.Description}
                        </Grid>
                        <Grid item xs={12} sm={4} className='background'>
                            <b>{offreDemande.Type==='offre'? 'Competences recherches:' : 'Competences Acquises:'}</b>
                        </Grid>
                        <Grid item xs={12} sm={8} className='background'>
                            {offreDemande.Type==='offre'? offreDemande.CompetencesRecherches: offreDemande.CompetencesAcquises}
                        </Grid>
                        <Grid item xs={12} sm={4} className='background'>
                            <b>Rémuneration</b>
                        </Grid>
                        <Grid item xs={12} sm={8} className='background'>
                            {offreDemande.Remuneration}
                        </Grid>
                    </Grid> 
                </Grid> 
          </Grid>
        </Wrapper>
    )
}

export default DashBoardOffreDemandeDetails;

export const Wrapper = styled.div`

.bold{
    font-weight: bold
}

.background{
    background-color: white;
    border: 1px solid gainsboro
}
`