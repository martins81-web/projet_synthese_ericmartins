import { faLevelDownAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';

import { fetchOffresDemandes } from '../../Api';
import { AccessLevel } from '../../Enum';
import { OffresDemandesType } from '../../Types';
import useAuth from '../auth/useAuth';
import DashboardCardOffre from './DashboardCardOffre';

type Props = {
};



const DashboardOffres: React.FC<Props> =()=>{
    const auth = useAuth();

    const [offres, setOffres] = useState<OffresDemandesType[]>([]);
    

    useEffect(()=>{
        getOffres();
       
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

    const getOffres = async () => {
        let offres : OffresDemandesType[] | undefined = await fetchOffresDemandes();
        offres = offres.filter(offre=> offre.Supprime===false && offre.Type==='offre');

        //si entreprise tu vois tes offres seulement
        if(auth?.user?.NiveauAcces===AccessLevel.entreprise){
            offres= offres.filter(offre=> offre.Auteur===auth?.user?._id)
        }

        //si stagiaire tu vois toutes les offres validées
        if(auth?.user?.NiveauAcces===AccessLevel.entreprise){
            offres= offres.filter(offre=> offre.Valide===true)
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
                        <DashboardCardOffre key={offre._id} offre={offre} updateOffre={()=>getOffres()}/>
                        )):null
                    }
            </Grid>
        </Grid>
      
        </>
    )
}

export default DashboardOffres;


