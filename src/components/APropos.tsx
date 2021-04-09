import { Container, Grid, Typography } from '@material-ui/core';
import GestureIcon from '@material-ui/icons/Gesture';
import Image from 'react-bootstrap/Image';

import apropos1 from '../images/apropos1.jpg';
import apropos2 from '../images/apropos2.jpg';
import apropos3 from '../images/apropos3.jpg';
import apropos4 from '../images/apropos4.jpg';

type Props = {
    
};

const APropos: React.FC<Props> =()=>{
    return(
        <Container>
            <Grid container style={{marginTop: '50px'}}>
                <Grid item xs={5}>
                    <Typography id='apropos-1' variant='h1' style={{fontWeight: 'bold'}}><GestureIcon style={{fontSize: '5rem'}} />eStage</Typography>
                </Grid>
                <Grid item xs={6}>
                    <p id='apropos-1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </Grid>
            </Grid>
            <Grid container spacing={2} style={{marginTop: '50px'}}>
                <Grid item xs={4}>
                    <Grid container direction='column' spacing={4}>
                        <Grid item>
                            <Image src={apropos1} rounded fluid/>

                        </Grid>
                        <Grid item style={{textAlign: 'center'}}><Typography variant='h5' style={{fontWeight: 'bold'}}>FORCES AVENIR</Typography></Grid>
                        <Grid item style={{textAlign: 'center'}}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet. </p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                <Grid container direction='column' spacing={4}>
                        <Grid item> <Image src={apropos2} rounded fluid /></Grid>
                        <Grid item style={{textAlign: 'center'}}><Typography variant='h5' style={{fontWeight: 'bold'}}>CENTRE AIDE</Typography></Grid>
                        <Grid item style={{textAlign: 'center'}}>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet. </p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                <Grid container direction='column' spacing={4}>
                        <Grid item> <Image src={apropos3} rounded fluid/></Grid>
                        <Grid item style={{textAlign: 'center'}}><Typography variant='h5' style={{fontWeight: 'bold'}}>FONDATION RÉNO-JOUET</Typography></Grid>
                        <Grid item style={{textAlign: 'center'}}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet. </p>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container style={{marginTop: '50px',marginBottom: '50px'}} >
                <Grid item xs={12} className='dashBackgroundColor' style={{padding: '50px', color:'white'}} >
                    <Grid container spacing={3}>
                        <Grid item xs={12}>     
                            <Typography variant='h5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>   
                         </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Image src={apropos4} rounded fluid/>
                        </Grid>
                        <Grid item xs={6} style={{backgroundColor: '#404040', color: 'white',padding: '50px', display: 'flex', alignItems:'center'}}>
                            <Typography variant='h5'> Donec magna dolor, venenatis ac hendrerit eget, gravida vulputate arcu. Nullam mollis eros quis nulla dapibus sagittis. 
                            Morbi tortor nisi, volutpat et nulla ac, vulputate aliquet erat. Sed sit amet augue arcu.</Typography>
                        </Grid>
                    </Grid>
                </Grid>    
                
            </Grid>
        </Container>
    )
}

export default APropos;