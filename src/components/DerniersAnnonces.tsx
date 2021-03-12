import { Button, Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';

import { Appel } from '../App';
import CardDernieresAnnonces from './CardDernieresAnnonces';


type Props = {
    type: Appel
};

const DerniersAnnonces: React.FC<Props> =({type})=>{
    return(
        <Wrapper>
            <Grid container direction='column' alignItems="center" style={{textAlign:'center', paddingTop: '50px'}}>
                {type===Appel.OFFRE ?
                <Grid item xs={3}>
                    <Typography variant="h4">Tu es à la recherche de ton stage de fin d'etudes?</Typography>
                </Grid> :
                <Grid item xs={4}>
                    <Typography variant="h4">Votre futur stagiaire se trouve ici.</Typography>
                </Grid>
                }    
                <Grid item xs={3}>
                    <Typography style={{color: 'darkgray'}}>Lorem Ipsum dolor sit amet, consectetur adipiscing elit, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
                </Grid>
            </Grid>
            <Grid container justify='center' style={{marginTop: '50px', padding: '0 120px 0 120px'}}>
                <Grid item xs={3}>
                    <CardDernieresAnnonces type={type}/>
                </Grid>
                <Grid item xs={3}>
                    <CardDernieresAnnonces type={type}/>
                </Grid>
                <Grid item xs={3}>
                    <CardDernieresAnnonces type={type}/>
                </Grid>
                <Grid item xs={3}>
                    <CardDernieresAnnonces type={type}/>
                </Grid>
            </Grid>
        
            <Grid container justify='center' style={{marginTop: '50px',paddingBottom: '50px'}}>
                <Grid item>
                    <Button variant="contained" size="medium" color="secondary" style={{borderRadius: '0',textTransform: 'none'}}>
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