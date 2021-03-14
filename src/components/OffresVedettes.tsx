import { Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';

import { Appel } from '../App';
import CardDernieresAnnonces from './CardDernieresAnnonces';

type Props = {
    
};

const OffresVedettes: React.FC<Props> =()=>{
    return(
        <Wrapper>
            <Grid container  justify='center' >
                <Grid item>
                    <Typography variant='h3' className='title'>Offres de stage en vedette</Typography>
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
    background-color: #4d6d81;
    padding-bottom: 50px;
    
    .title{
        color: #e1e1e1;
        font-weight: bold;
        padding-top: 50px;
        padding-bottom: 50px;
        text-transform: uppercase;
        text-align: center;
    }
`