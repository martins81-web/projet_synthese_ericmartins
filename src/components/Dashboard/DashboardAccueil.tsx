import { faLevelDownAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';

import { fetchOffresDemandes } from '../../Api';
import { AccessLevel } from '../../Enum';
import { OffresDemandesType } from '../../Types';
import useAuth from '../auth/useAuth';
import DashboardCardDemande from './DashboardCardDemande';
import DashboardCardOffre from './DashboardCardOffre';

type Props = {
    
};

const DashboardAccueil: React.FC<Props> =()=>{
    const auth = useAuth();

    const [offres, setOffres] = useState<OffresDemandesType[]>([]);
    const [demandes, setDemandes] = useState<OffresDemandesType[]>([]);

    useEffect(()=>{
        getDemandes();
        getOffres();

      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

      //cherche les demandes dans l'api
    const getDemandes = async () => {
        let demandes : OffresDemandesType[] | undefined = await fetchOffresDemandes();
        demandes = demandes.filter(demande=> demande.Supprime===false && demande.Type==='demande' && demande.Valide===false);
        setDemandes(demandes);  
    }

    //cherche les offres dans l'api
    const getOffres = async () => {
        let offres : OffresDemandesType[] | undefined = await fetchOffresDemandes();
        offres = offres.filter(offre=> offre.Supprime===false && offre.Type==='offre' && offre.Valide===false);
        setOffres(offres);  
    }

   
    //affiche les offres et demandes à être validés par l'admin
    return(
        <> {auth?.user?.NiveauAcces === AccessLevel.admin ?
           <Grid container spacing={2}>
                { (demandes.length>0 || offres.length>0)?
                <Grid item xs={12}>
                    <Typography variant='h3'> 
                        En attende de validation 
                    </Typography>
                </Grid> :
                <Grid item xs={12}>
                    <Typography variant='h3'> 
                        Rien à valider
                    </Typography>
                </Grid>
                }
                {demandes.length>0 ?
                <Grid item xs={12} sm={12} md={6}>
                    <Grid container alignItems='center' spacing={2}> 
                        <Grid item>
                            <Typography variant={'h6'}>Demandes de stage</Typography>
                        </Grid>
                        <Grid item style={{position: 'relative'}}>
                            <FontAwesomeIcon icon={faLevelDownAlt}  size='lg' style={{position: 'absolute', top: '10px'}}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                            {
                            demandes.map(demande=>(
                                <Grid item key={demande._id}>
                                    <DashboardCardDemande demande={demande} type='attente'  updateDemande={getDemandes} />
                                </Grid>
                            ))
                            }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid> :null
                }
                {offres.length>0 ?
                <Grid item xs={12} sm={12} md={6}>
                    <Grid container alignItems='center' spacing={2}> 
                        <Grid item>
                            <Typography variant={'h6'}>Offres de stage</Typography>
                        </Grid>
                        <Grid item style={{position: 'relative'}}>
                            <FontAwesomeIcon icon={faLevelDownAlt}  size='lg'  style={{position: 'absolute', top: '10px'}}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                            {
                            offres.map(offre=>(
                                <Grid item key={offre._id}>
                                    <DashboardCardOffre offre={offre} type='attente'  updateOffre={getOffres}/>    
                                </Grid>    
                            ))
                            }
                            </Grid>
                        </Grid>
                    </Grid> 
                </Grid> :
                null
                }
            </Grid>:
            <Grid item xs={12}>
            <Typography variant='h4'>{auth?.user && <><b>Bonjour</b> {auth?.user.Prenom + " " + auth?.user.Nom +'!'}</>}</Typography>
            </Grid> 
            }
        </>
    )
}

export default DashboardAccueil;