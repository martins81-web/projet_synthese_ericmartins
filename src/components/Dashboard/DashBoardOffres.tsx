import { faLevelDownAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkbox, FormControlLabel, Grid, InputAdornment, TextField, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useEffect, useState } from 'react';

import { fetchOffresDemandes } from '../../Api';
import { AccessLevel } from '../../Enum';
import { OffresDemandesType } from '../../Types';
import useAuth from '../auth/useAuth';
import DashboardCardOffre from './DashboardCardOffre';

type Props = {
};


//Liste des offres de stage dans le dashboard
const DashboardOffres: React.FC<Props> =()=>{
    const auth = useAuth();

    const [offres, setOffres] = useState<OffresDemandesType[]>([]);
    const [recherche, setRecherche]= useState<String>('');
    const [vedette, setVedette]= useState<boolean>(false);

    useEffect(()=>{
        getOffres(false);
       
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

    const getOffres = async (vedette: boolean) => {
        let offres : OffresDemandesType[] | undefined = await fetchOffresDemandes();
        offres = offres.filter(offre=> offre.Supprime===false && offre.Type==='offre');

        //si entreprise tu vois tes offres seulement
        if(auth?.user?.NiveauAcces===AccessLevel.entreprise){
            offres= offres.filter(offre=> offre.Auteur===auth?.user?._id)
        }

        if(vedette){
            offres=offres.filter(offre=>offre.Vedette===true)
        }
        //si stagiaire tu vois toutes les offres validées
        /* if(auth?.user?.NiveauAcces===AccessLevel.entreprise){
            offres= offres.filter(offre=> offre.Valide===true)
        }  */
        //console.log(offres);
        setOffres(offres);  
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVedette(!vedette);
        getOffres(!vedette);
      };
   

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
                {auth?.user?.NiveauAcces===AccessLevel.admin &&
                <Grid item>
                    <FormControlLabel
                        control={<Checkbox checked={vedette} onChange={(e)=>handleChange(e)} name="Vedette" />}
                        label="Vedette"
                    />
                </Grid>
                }
             </Grid> 
         <Grid container alignItems='center' spacing={3} > 
            <Grid item xs={12}>    
                <Grid container spacing={2}>
                    <Grid item>
                        <Typography variant={'h4'}>{auth?.user?.NiveauAcces===AccessLevel.entreprise? 'Mes offres de stage'
                        :'Offres de stage'}</Typography>
                    </Grid>
                    <Grid item style={{position: 'relative'}}>
                        <FontAwesomeIcon icon={faLevelDownAlt}  size='lg'  style={{position: 'absolute', top: '30px'}} />
                    </Grid>
                </Grid>
            </Grid>
            
            <Grid item xs={12}>
                {offres ? 
                    offres.map(offre =>(
                        offre.Titre.toLowerCase().includes(recherche.toLowerCase())&&
                        <DashboardCardOffre key={offre._id} offre={offre} updateOffre={()=>getOffres(vedette)}/>
                        )):null
                    }
            </Grid>
        </Grid>
      
        </>
    )
}

export default DashboardOffres;


