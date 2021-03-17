import { Button, Grid, IconButton, InputBase, Typography } from '@material-ui/core';
import GestureIcon from '@material-ui/icons/Gesture';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';




type Props = {
    imageURL: string;
    imgSize: number;
    logout: () => void;
}


const Header: React.FC<Props> =({imageURL,imgSize,logout})=>{
    const history= useHistory();

    const handleLogin =()=>{
            history.push('/login');
    }

    const token = Cookies.get('connected');


    return(
    <Wrapper backgroundUrl={imageURL}>
        <div className='filter'  style={{height: imgSize+'px' }}>
            <Grid   container 
                    direction="row"
                    alignItems="center"
                    className="topBlock"
            >
                <Grid item xl={3} lg={2} md={12} sm={12} xs={12}  style={{textAlign: 'center'}}>
                    <Grid container justify='center' spacing={2} alignItems='center' >
                        <IconButton onClick={()=>history.push('/accueil')}>
                            <Grid item>
                                <GestureIcon style={{color: 'white', fontSize: '3rem'}}/>
                            </Grid>
                            <Grid item>
                                <Typography variant="h3" style={{color:'white'}}>eStage</Typography>
                            </Grid>
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item xl={6} lg={5} md={6} sm={7} xs={12}  style={{marginTop: '10px'}}>
                    <Grid container style={{marginLeft: '10px', marginRight: '10px'}}
                            direction="row"
                            justify="center"
                            spacing={1}
                    >
                        <Grid item>
                            <Button variant="contained" size="medium" style={{backgroundColor: 'limegreen', color: 'white', textTransform: 'none'}}>
                                Trouvez votre stage
                            </Button>
                        </Grid>
                        <Grid item >
                            <Button variant="contained" size="medium"  style={{backgroundColor: 'limegreen', color: 'white', textTransform: 'none'}}>
                                Trouvez votre futur stagiaire
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            
                <Grid item xl={3} lg={5} md={6} sm={5} xs={12} style={{marginTop: '10px'}}>
                    <Grid container
                                direction="row"
                                justify="center"
                                alignItems="center"
                               
                        >
                            <Grid item >
                                {token ?
                                (<>
                                <Grid container spacing={1}  alignItems="center">
                                    {/* <Grid item>
                                        <Typography style={{color: 'red', fontSize: '1rem'}}>Salut {auth?.user}!</Typography>
                                        <Link to="/dashboard" style={{color: 'dodgerblue', fontSize: '1rem'}}>Dashboard</Link>
                                    </Grid> */}
                                    
                                    <Grid item>
                                        <Button variant="contained" 
                                                size="medium"  
                                                style={{textTransform: 'none'}}
                                                color='secondary'
                                                onClick={logout}
                                        >
                                            Déconnexion
                                        </Button>
                                    </Grid>
                                </Grid>
                                </>
                                ) 
                                :
                                
                                <Button variant="contained" 
                                        size="medium"  
                                        style={{backgroundColor: 'white', color: 'dimgray', textTransform: 'none'}}
                                        onClick={handleLogin}
                                >
                                    Connexion
                                </Button>
                                }
                                
                                
                            </Grid>
                            <Grid item style={{marginLeft: '10px', marginRight: '10px'}}>
                                
                                <Button variant="contained" size="medium"  style={{backgroundColor: 'dimgray', color: 'white', textTransform: 'none'}}>
                                    Inscription
                                </Button>
                            </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container justify="center"  className="centerBlock">
                <Grid item >
                    <Grid container  
                        direction="column"
                        alignItems="center"
                        spacing={5}
                    >
                        <Grid item>
                            <Typography variant="h3" style={{color:'white', textAlign:'center'}}>Trouvez votre stage!</Typography>
                        </Grid>
                        <Grid item>
                                <Grid container  alignItems="center" 
                                style={{borderRadius: '0',textTransform: 'none', backgroundColor: 'white', padding: '5px', width: '50vw'}}>
                                    <Grid item xl={9} lg={8} md={8} sm={7} xs={12}>
                                        <InputBase 
                                            fullWidth
                                            placeholder="Mot clé"
                                        />
                                    </Grid>
                                    <Grid item xl={3} lg={4} md={4} sm={5} xs={12}>
                                        <Button fullWidth variant="contained" color="primary" style={{borderRadius: '0',textTransform: 'none'}}>
                                            Rechercher
                                        </Button>
                                    </Grid>
                                </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    
    </Wrapper>
    )
}


export default Header;





export const Wrapper = styled.div<{backgroundUrl: string}>`
    background-image: url(${props => props.backgroundUrl});
    background-size: cover;
    background-repeat:no-repeat;
    background-position:  center;
    
    
    .filter{
        background:rgba(0,0,0,0.6);
        display: flex;
        flex-direction: column;
        padding-top: 15px
    }

    .topBlock{
        flex:1;
        align-content: flex-start;

    }
    .centerBlock{
       flex:2;
       align-content: flex-start;

    }
    
    
`