import { faLevelDownAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';

import { fetchOffreDemande } from '../../Api';
import { AccessLevel } from '../../Enum';
import { OffreDemandeType } from '../../Types';
import useAuth from '../auth/useAuth';
import DashboardCardOffre from './DashboardCardOffre';

type Props = {
};



const DashboardOffres: React.FC<Props> =()=>{
    const auth = useAuth();

    const [offres, setOffres] = useState<OffreDemandeType[]>([]);
    
    useEffect(()=>{
        getOffres();
       
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

    const getOffres = async () => {
        let offres : OffreDemandeType[] | undefined = await fetchOffreDemande();
        offres = offres.filter(offre=> offre.Supprime===false && offre.Type==='offre');
        if(auth?.user?.NiveauAcces!==AccessLevel.admin){
            offres= offres.filter(offre=> offre.Auteur===auth?.user?._id)
        }
        //console.log(offres);
        setOffres(offres);  
    }


    return(
        <>
         <Grid container alignItems='center' spacing={3} > 
            <Grid item xs={12}>    
                <Grid container spacing={2}>
                    <Grid item>
                        <Typography variant={'h4'}>Offres de stage</Typography>
                    </Grid>
                    <Grid item style={{position: 'relative'}}>
                        <FontAwesomeIcon icon={faLevelDownAlt}  size='lg'  style={{position: 'absolute', top: '30px'}} />
                    </Grid>
                </Grid>
            </Grid>
            
            <Grid item xs={12}>
                {offres ? 
                    offres.map(offre =>(
                        <DashboardCardOffre offre={offre} key={offre._id}/>
                        )):null
                    }
            </Grid>
        </Grid>
      
        </>
    )
}

export default DashboardOffres;