import { faLevelDownAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, InputAdornment, TextField, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useEffect, useState } from 'react';

import { fetchOffresDemandes } from '../../Api';
import { AccessLevel } from '../../Enum';
import { OffresDemandesType } from '../../Types';
import useAuth from '../auth/useAuth';
import DashboardCardDemande from './DashboardCardDemande';

type Props = {
};



const DashboardDemandes: React.FC<Props> =()=>{
    const auth = useAuth();

    const [demandes, setDemandes] = useState<OffresDemandesType[]>([]);
    const [recherche, setRecherche]= useState<String>('');
    useEffect(()=>{
        getDemandes();
       
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

      //cherche les demandes dans l'api
    const getDemandes = async () => {
        let demandes : OffresDemandesType[] | undefined = await fetchOffresDemandes();
        //filtre les demandes qui ne sont pas supprimées
        demandes = demandes.filter(demande=> demande.Supprime===false && demande.Type==='demande');
        //si stagiaire tu vois tes demandes
        if(auth?.user?.NiveauAcces===AccessLevel.stagiaire){
            demandes= demandes.filter(demande=> demande.Auteur===auth?.user?._id)
        } 
        //si entreprises tu vois toutes les demandes validées
        if(auth?.user?.NiveauAcces===AccessLevel.entreprise){
            demandes= demandes.filter(demande=> demande.Valide===true)
        } 
        setDemandes(demandes);  

      

    }


    return(
    
        <>
         <Grid container spacing={3} alignItems='center' justify='center' >
                <Grid item>
                    <TextField
                        label="Rechercher"
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
         <Grid container alignItems='center' spacing={3} > 
            <Grid item xs={12}>    
                <Grid container spacing={2}>
                    <Grid item>
                        <Typography variant={'h4'}> {auth?.user?.NiveauAcces===AccessLevel.stagiaire? 'Mes demandes de stage':'Demandes de stage'}</Typography>
                    </Grid>
                    <Grid item style={{position: 'relative'}}>
                        <FontAwesomeIcon icon={faLevelDownAlt}  size='lg'  style={{position: 'absolute', top: '30px'}} />
                    </Grid>
                </Grid>
            </Grid>
            
            <Grid item xs={12}>
                {demandes? 
                    demandes.map(demande =>(
                        demande.Titre.toLowerCase().includes(recherche.toLowerCase())  &&
                            <DashboardCardDemande demande={demande} key={demande._id} updateDemande={()=>getDemandes()}/>
                        )):null
                    }
            </Grid>
        </Grid>
      
        </> 
    )
}

export default DashboardDemandes;