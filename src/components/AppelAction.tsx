import { Button, Grid, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Image from 'react-bootstrap/Image';
import styled from 'styled-components';

import { Appel } from '../Enum';
import imgDemande from '../images/demande.jpg';
import imgOffre from '../images/offre.jpg';

type Props = {
    type: Appel
};



const AppelAction: React.FC<Props> =({type})=>{

    //MediaQueries
    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

    return(
        <Wrapper>
        <Grid container>
            {type===Appel.OFFRE ?  
            <Grid item  xs={12} sm={12} md={6}  
                style={{backgroundColor: '#4d6d81', paddingTop: matchesMD? '20px': '0',paddingBottom: matchesMD? '20px': '0'}} 
                className='zoneText'>
                
                <Grid container  alignContent='center' direction='column'>
                    <Grid item xs={9} >
                        <Typography variant={matchesMD? 'h4': 'h3'} style={{fontWeight: 'bold', color: 'white'}}>Pourquoi publier une offre de stage?</Typography>
                    </Grid>
                    <Grid item xs={9} style={{marginTop: '5px', marginBottom: '15px'}}>
                        <Typography style={{color: 'Gainsboro'}}>Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
                    </Grid>
                    <Grid item xs={9} style={{marginBottom: '25px'}}>
                        <li><span>Lorem Ipsum dolor sit amet</span></li>
                        <li><span>Consectetur adipiscing elit</span></li>
                        <li><span>Ut enim ad minim veniam</span></li>
                    </Grid>
                    <Grid item xs={9} >
                        <Button variant="contained" size="medium"  style={{borderRadius: '0',textTransform: 'none'}}>
                                Publier une offre de stage maintenant!
                        </Button>
                    </Grid>
                       
                </Grid>
            </Grid>
            : null}
            
            <Grid item  xs={12} sm={12} md={6} >
            {
                type===Appel.DEMANDE ?
                <Image src={imgDemande} fluid alt="demande de stage" style={{width: '100%'}}/> :
                <Image src={imgOffre} fluid alt="offre de stage" style={{width: '100%'}}/> 
            }
            </Grid>
            {type===Appel.DEMANDE ?  
            <Grid item xs={12} sm={12} md={6} style={{backgroundColor: '#4d6d81', paddingTop: matchesMD? '20px': '0',paddingBottom: matchesMD? '20px': '0'}} 
            className='zoneText'>
                    <Grid container alignContent='center' direction='column'>
                        <Grid item xs={9}>
                            <Typography variant={matchesMD? 'h4': 'h3'} style={{fontWeight: 'bold', color: 'white'}}>Pourquoi publier une demande de stage?</Typography>
                        </Grid>
                        <Grid item xs={9} style={{marginTop: '5px', marginBottom: '15px'}} >
                            <Typography style={{color: 'Gainsboro'}}>Lorem Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
                        </Grid>
                        <Grid item xs={9}  style={{marginBottom: '25px'}}>
                            <li><span>Lorem Ipsum dolor sit amet</span></li>
                            <li><span>Consectetur adipiscing elit</span></li>
                            <li><span>Ut enim ad minim veniam</span></li>
                        </Grid>
                        <Grid item xs={9} >
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