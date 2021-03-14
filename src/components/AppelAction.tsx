import { Button, Grid, Typography } from '@material-ui/core';
import Image from 'react-bootstrap/Image';
import styled from 'styled-components';

import { Appel } from '../App';
import imgDemande from '../images/demande.jpg';
import imgOffre from '../images/offre.jpg';


type Props = {
    type: Appel
};



const AppelAction: React.FC<Props> =({type})=>{
    return(
        <Wrapper>
        <Grid container>
            {type===Appel.OFFRE ?  
            <Grid item xs={6} style={{backgroundColor: '#4d6d81'}} className='zoneText'>
                <Grid container spacing={3} direction='column' >
                    <Grid item>
                        <Typography variant="h2" style={{fontWeight: 'bold', color: 'white'}}>Pourquoi publier une offre de stage?</Typography>
                    </Grid>
                    <Grid item>
                        <Typography style={{color: 'Gainsboro'}}>Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
                    </Grid>
                    <Grid item>
                        <li><span>Lorem Ipsum dolor sit amet</span></li>
                        <li><span>Consectetur adipiscing elit</span></li>
                        <li><span>Ut enim ad minim veniam</span></li>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" size="medium"  style={{borderRadius: '0',textTransform: 'none'}}>
                                Publier une offre de stage maintenant!
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            : null}
            
            <Grid item xs={6}>
            {
                type===Appel.DEMANDE ?
                <Image src={imgDemande} fluid alt="demande de stage" style={{width: '100%'}}/> :
                <Image src={imgOffre} fluid alt="offre de stage" style={{width: '100%'}}/> 
            }
            </Grid>
            {type===Appel.DEMANDE ?  
            <Grid item xs={6} style={{backgroundColor: '#4d6d81'}} className='zoneText'>
                <Grid container spacing={3} direction='column' >
                    <Grid item>
                        <Typography variant="h2" style={{fontWeight: 'bold', color: 'white'}}>Pourquoi publier une demande de stage?</Typography>
                    </Grid>
                    <Grid item>
                        <Typography style={{color: 'Gainsboro'}}>Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
                    </Grid>
                    <Grid item>
                        <li><span>Lorem Ipsum dolor sit amet</span></li>
                        <li><span>Consectetur adipiscing elit</span></li>
                        <li><span>Ut enim ad minim veniam</span></li>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" size="medium" style={{borderRadius: '0',textTransform: 'none'}}>
                                Publier une demande de stage maintenant!
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            : null}
        </Grid>
        </Wrapper>
    )
}

export default AppelAction;

export const Wrapper = styled.div`

.zoneText{
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 11%;
    padding-right: 11%;
}

li { color: dodgerblue; } /* bullet */
li span { color: white; } /* text */

button{
    background-color: dodgerblue;
    color: white;
}

button:hover{
    color: black;
}
    
`