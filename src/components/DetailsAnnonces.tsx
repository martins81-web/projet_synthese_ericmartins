/* eslint-disable @typescript-eslint/no-unused-vars */
import { Breadcrumbs, Button, Grid, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { fetchUtilisateur, updateOffreDemande } from '../Api';
import { AccessLevel, Appel } from '../Enum';
import { OffresDemandesType, UtilisateursType } from '../Types';
import AppelAction from './AppelAction';
import ListRegions from './ListRegions';
import ListSecteurs from './ListSecteurs';
import useAuth from './auth/useAuth';

type Props = {
    history: any,
    type: Appel,
    toast: (text: string)=> void
};

const DetailsAnnonces: React.FC<Props> =({history, type, toast})=>{
    const [selectedSecteurID, setSelectedSecteurID] = useState<string | undefined>(undefined);
    const [selectedRegionID, setSelectedRegionID] = useState<string | undefined>(undefined);
    const [offreDemande, setOffreDemande]=useState<OffresDemandesType>(history.location.state.data);
    const [auteur, setAuteur] = useState<UtilisateursType | undefined>(undefined);
    const auth = useAuth();

    useEffect(()=>{
        getAuteur();
       
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

      //fetch l'auteur
    const getAuteur = async () => {
        let auteur : UtilisateursType|null = await fetchUtilisateur(offreDemande.Auteur);
        setAuteur(auteur);  
    }

     //MediaQueries
     const theme = useTheme();
     const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

     //format date yyyy-mm-dd
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

    const handlePostulerContacter =()=>{
        if(auth?.user?.NiveauAcces===AccessLevel.stagiaire && type===Appel.OFFRE){
            let communication= {
                Date: new Date(),
                EnvoyeParID: auth.user._id,
                Message: 'Postulation',
                NbMessages: 0,
            };
            offreDemande?.Communications.push(communication);
            offreDemande && updateOffreDemande(offreDemande);   

        } else if ( auth?.user?.NiveauAcces===AccessLevel.entreprise && type===Appel.DEMANDE){
            console.log('contacter candidat');
        } else if (type===Appel.OFFRE && auth?.user?.NiveauAcces!==AccessLevel.stagiaire) {
            toast && toast('Vous devez être connecté en tant que stagiaire pour pouvoir postuler sur une offre de stage.');
            if(!auth?.user)
            history.push('/login');
        } else {
            toast && toast("Vous devez être connecté en tant qu'entreprise pour pouvoir contacter le candidat d'une demande de stage.");
            if(!auth?.user)
            history.push('/login');
        }
    }


    return(
        <Wrapper>
        <Grid container>
            <Grid item xs={12}>
                <Grid container style={{padding: '50px'}} spacing={matchesMD? 4:0}>
                    <Grid item xs={12} sm={12} md={8}>
                        <Grid container direction='column' spacing={4}>
                            <Grid item xs={12}>
                                <Breadcrumbs  separator={<NavigateNextIcon fontSize="small" />}  aria-label="breadcrumb">
                                    <Link color="inherit" to="/accueil">
                                        Accueil
                                    </Link>
                                    {type===Appel.OFFRE?
                                    <Link color="inherit" to="/accueil/offres">{'Offres'}</Link> :
                                    <Link color="inherit" to="/accueil/demandes">{'Demandes'}</Link>
                                    }
                                    <Typography color="textPrimary">{offreDemande.Titre}</Typography>
                                </Breadcrumbs>
                            </Grid>                                
                            <Grid item xs={12}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12} md={5} lg={5}>
                                        <Grid container  justify='center'
                                        style={{height: '100%',display: 'flex', alignItems:'center',  border: '1px solid black',
                                        padding: '15px', textAlign:'center'}}>
                                            {auteur&&
                                            <Grid item xs={12}>
                                                <Grid container >
                                                    <Grid item xs={12}>
                                                        <Typography variant='h4'>{auteur?.Entreprise? auteur?.Logo: auteur.Ecole}</Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                    <Typography variant='h6'>{auteur?.Entreprise? auteur?.NomEntreprise: offreDemande.ProgrammesSuivi}</Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        {offreDemande.Ville}
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            }
                                        </Grid>    
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={7} lg={7} >
                                        <Grid container  style={{display: 'flex', alignItems:'center',  border: '1px solid black',padding: '15px'}}>
                                            <Grid item>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <Typography variant='h4'>{offreDemande.Titre}</Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Grid container>
                                                            <Grid item xs={12} sm={6} md={12} lg={6}><b>Date de parution: </b>{formatDate(offreDemande.DateParution)}</Grid>
                                                            <Grid item xs={12} sm={6} md={12} lg={6}><b>Durée: </b>{offreDemande.DureeSemaines + ' semaines'}</Grid>
                                                            <Grid item xs={12} sm={6} md={12} lg={6}><b>Date de début: </b>{formatDate(offreDemande.DateDebut)}</Grid>
                                                            <Grid item xs={12} sm={6} md={12} lg={6}><b>Heures: </b>{offreDemande.NombreHeuresSemaine+'/semaine'}</Grid>
                                                            <Grid item xs={12} sm={6} md={12} lg={6}><b>Date de fin: </b>{formatDate(offreDemande.DateFin)}</Grid>
                                                            { auteur?.Entreprise &&
                                                            <Grid item xs={12} sm={6} md={12} lg={6}><b>Possibilité d'emploi: </b>{offreDemande.EmploiApresStage ? 'oui':'non'}</Grid>
                                                            }
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Button variant="contained" color="primary" fullWidth className='button'
                                                        onClick={handlePostulerContacter}
                                                        >
                                                            {type===Appel.OFFRE?'Postuler':'Contacter le candidat'}
                                                        </Button> 
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} style={{marginTop: '50px'}}>
                                        <Grid container spacing={8}>
                                        {auteur?.Entreprise ?
                                            <>
                                            <Grid item xs={12}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12}>
                                                        <Typography className='upperCaseTitle' variant='h4'>Description de l'offre de stage</Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        {offreDemande.Description}
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12}>
                                                        <Typography className='upperCaseTitle' variant='h4'>Compétences recherchées</Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        {offreDemande.CompetencesRecherches}
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12}>
                                                        <Typography variant='h4' className='upperCaseTitle'>À propos de l'entreprise</Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        {offreDemande.InformationsSuplementaires}
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            </> : 
                                            <>
                                            <Grid item xs={12}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12}>
                                                        <Typography className='upperCaseTitle' variant='h4'>Description de la demande de stage</Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        {offreDemande.Description}
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12}>
                                                        <Typography className='upperCaseTitle' variant='h4'>Compétences acquises</Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        {offreDemande.CompetencesAcquises}
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12}>
                                                        <Typography variant='h4' className='upperCaseTitle'>Autres informations</Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        {offreDemande.AutresInformations}
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            </>
                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>    
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={6} md={12} >
                                <ListSecteurs selectedSecteurId={setSelectedSecteurID}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={12}>
                                <ListRegions selectedRegionId={setSelectedRegionID}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <AppelAction type={offreDemande.Type === Appel.OFFRE ? Appel.DEMANDE: Appel.OFFRE}/>
            </Grid>
        </Grid>
        </Wrapper>
    )
}

export default DetailsAnnonces;


export const Wrapper = styled.div`
    
.button{
    border-radius:0;
    text-transform: none;
}

.upperCaseTitle{
    text-transform: uppercase;
    font-weight: bold;
}
    
`