import { faLevelDownAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';

import { fetchOffreDemande } from '../../Api';
import { AccessLevel } from '../../Enum';
import { OffreDemandeType } from '../../Types';
import useAuth from '../auth/useAuth';
import DashboardCardDemande from './DashboardCardDemande';

type Props = {
};



const DashboardDemandes: React.FC<Props> =()=>{
    const auth = useAuth();
    const [demandes, setDemandes] = useState<OffreDemandeType[]>([]);
    
    useEffect(()=>{
        getDemandes();
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

    const getDemandes = async () => {
        let demandes : OffreDemandeType[] | undefined = await fetchOffreDemande();
        demandes = demandes.filter(demande=> demande.Supprime===false && demande.Type==='demande');
        if(auth?.user?.NiveauAcces!==AccessLevel.admin){
            demandes= demandes.filter(demande=> demande.Auteur===auth?.user?._id)
        }
        //console.log(demandes);
        setDemandes(demandes);  
    }


    return(
        <>
         <Grid container alignItems='center' spacing={3} > 
            <Grid item xs={12}>    
                <Grid container spacing={2}>
                    <Grid item>
                        <Typography variant={'h4'}>Demandes de stage</Typography>
                    </Grid>
                    <Grid item style={{position: 'relative'}}>
                        <FontAwesomeIcon icon={faLevelDownAlt}  size='lg'  style={{position: 'absolute', top: '30px'}} />
                    </Grid>
                </Grid>
            </Grid>
            
            <Grid item xs={12}>
                {demandes ? 
                    demandes.map(demande =>(
                        <DashboardCardDemande demande={demande} key={demande._id}/>
                        
                        )):null
                    }
            </Grid>
        </Grid>
      
        </>
    )
}

export default DashboardDemandes;