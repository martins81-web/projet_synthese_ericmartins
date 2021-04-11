import { Button, Grid, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { fetchOffresDemandes } from '../Api';
import { Appel } from '../Enum';
import { OffresDemandesType } from '../Types';
import CardDernieresAnnonces from './CardDernieresAnnonces';


type Props = {
    type: Appel,
    toast: (text: string)=> void
};

const DerniersAnnonces: React.FC<Props> =({type, toast})=>{
    const history= useHistory();

    const [offresDemandes, setOffresDemandes] = useState<OffresDemandesType[]>([]);
    
    useEffect(()=>{
        getOffresDemandes();
       
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])


      //fetch les offres/demandes dans l'api
    const getOffresDemandes = async () => {
        let offresDemandes : OffresDemandesType[] | undefined = await fetchOffresDemandes();
        
        // Filtre les offres valides
        offresDemandes = offresDemandes.filter(offreDemande=> offreDemande.Supprime===false && offreDemande.Type===type && offreDemande.Valide );
        // Trié par date
        offresDemandes.sort((a, b) => (a.DateParution < b.DateParution) ? 1 : -1);
         // Garde juste les 4 offre vedettes les plus récentes
         offresDemandes.splice(4,offresDemandes.length-4);

        console.log(offresDemandes);
        setOffresDemandes(offresDemandes);  
    }

    return(
        <Wrapper>
            <Grid container direction='column' alignItems="center" style={{textAlign:'center', paddingTop: '50px'}}>
                {type===Appel.OFFRE ?
                <Grid item xs={10} sm={8} md={6} lg={4}>
                    <Typography variant="h4">Tu es à la recherche de ton stage de fin d'etudes?</Typography>
                </Grid> :
                <Grid item xs={10} sm={8} md={6} lg={4}>
                    <Typography variant="h4">Votre futur stagiaire se trouve ici.</Typography>
                </Grid>
                }    
                <Grid item xs={10} sm={8} md={6} lg={3}>
                    <Typography style={{color: 'darkgray'}}>Lorem Ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
                </Grid>
            </Grid>
            <Grid container justify='center' >
                <Grid item xs={11} lg={9} style={{marginTop: '50px'}}>
                    <Grid container spacing={2} justify='center' >
                {offresDemandes.length>0 &&
                    offresDemandes.map(offreDemande=>(
                        <Grid item xs={12} sm={6} md={4} lg={3} key={offreDemande._id}>
                            <Grid container style={{height: '100%'}} >
                                <CardDernieresAnnonces type={type} offreDemande={offreDemande} cardType='mini' toast={(text)=>toast(text)}/>
                            </Grid>
                        </Grid>
                ))
                }
                    </Grid>
                </Grid>
            </Grid>
        
            <Grid container justify='center' style={{marginTop: '50px',paddingBottom: '50px'}}>
                <Grid item>
                    <Button variant="contained" size="medium" color="secondary" style={{borderRadius: '0',textTransform: 'none'}}
                    onClick={()=>{
                        history.push('/accueil/'+type+'s');
                    }}
                    >
                    {type===Appel.OFFRE? 'Voir toutes les offres de stage' : 'Voir tous les candidats'} 
                    </Button>
                </Grid>
            </Grid>
            </Wrapper>
    )
}

export default DerniersAnnonces;



export const Wrapper = styled.div`
    background-color: WhiteSmoke;
    
`