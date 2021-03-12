import { Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';

import { Appel } from '../App';
import CardDernieresAnnonces from './CardDernieresAnnonces';

type Props = {
    
};

const OffresVedettes: React.FC<Props> =()=>{
    return(
        <Wrapper>
            <Grid container  justify='center'>
                <Grid item>
                    <Typography variant='h2' className='title'>Offres de stage en vedette</Typography>
                </Grid>
            </Grid>
            <Grid container justify='center'>
                <Grid item xs={3}>
                    <CardDernieresAnnonces type={Appel.OFFRE}/>
                </Grid>
                <Grid item xs={3}>
                    <CardDernieresAnnonces type={Appel.OFFRE}/>
                </Grid>
                <Grid item xs={3}>
                    <CardDernieresAnnonces type={Appel.OFFRE}/>
                </Grid>
            </Grid>
       </Wrapper>
    )
}

export default OffresVedettes;

export const Wrapper = styled.div`
    background-color: goldenrod;
    padding-bottom: 50px;
    
    .title{
        color: white;
        font-weight: bold;
        padding-top: 50px;
        padding-bottom: 50px;
    }
`