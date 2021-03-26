import { faLevelDownAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';

import { fetchOffreDemande } from '../../Api';
import { AccessLevel } from '../../Enum';
import { OffreDemandeType } from '../../Types';
import useAuth from '../auth/useAuth';
import DashboardCardDemande from './DashboardCardDemande';
import DashboardCardOffre from './DashboardCardOffre';

type Props = {
    
};

const DashboardAccueil: React.FC<Props> =()=>{
    const auth = useAuth();

    const [offres, setOffres] = useState<OffreDemandeType[]>([]);
    const [demandes, setDemandes] = useState<OffreDemandeType[]>([]);
    
    useEffect(()=>{
        getDemandes();
        getOffres();

      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

    const getDemandes = async () => {
        let demandes : OffreDemandeType[] | undefined = await fetchOffreDemande();
        demandes = demandes.filter(demande=> demande.Supprime===false && demande.Type==='demande' && demande.Valide===false);
        //console.log(demandes);
        setDemandes(demandes);  
    }

    const getOffres = async () => {
        let offres : OffreDemandeType[] | undefined = await fetchOffreDemande();
        offres = offres.filter(offre=> offre.Supprime===false && offre.Type==='offre' && offre.Valide===false);
        //console.log(offres);
        setOffres(offres);  
    }

    return(
        <> {auth?.user?.NiveauAcces === AccessLevel.admin &&
           <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h3'> 
                        En attende de validation 
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Grid container alignItems='center' spacing={2}> 
                        <Grid item>
                            <Typography variant={'h6'}>Demandes de stage</Typography>
                        </Grid>
                        <Grid item style={{position: 'relative'}}>
                            <FontAwesomeIcon icon={faLevelDownAlt}  size='lg' style={{position: 'absolute', top: '10px'}}/>
                        </Grid>
                        <Grid item xs={12}>
                            {
                            demandes.map(demande=>(
                                <DashboardCardDemande demande={demande} type='attente' key={demande._id}/>
                            ))
                            }
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Grid container alignItems='center' spacing={2}> 
                        <Grid item>
                            <Typography variant={'h6'}>Offres de stage</Typography>
                        </Grid>
                        <Grid item style={{position: 'relative'}}>
                            <FontAwesomeIcon icon={faLevelDownAlt}  size='lg'  style={{position: 'absolute', top: '10px'}}/>
                        </Grid>
                        <Grid item xs={12}>
                            {
                            offres.map(offre=>(
                                <DashboardCardOffre offre={offre} type='attente' key={offre._id}/>
                            ))
                            }
                        </Grid>
                        
                    </Grid> 
                </Grid>  
            </Grid>
            }
        </>
    )
}

export default DashboardAccueil;