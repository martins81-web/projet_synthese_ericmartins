import { Button, Grid, IconButton, InputBase, Typography } from '@material-ui/core';
import GestureIcon from '@material-ui/icons/Gesture';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { Appel } from '../Enum';




type Props = {
    imageURL: string;
    imgSize: number;
    logout: () => void;
    recherche: (recherche:string) => void;
}


const Header: React.FC<Props> =({imageURL,imgSize,logout, recherche})=>{
    const history= useHistory();

    const handleLogin =()=>{
            history.push('/login');
    }

    const token = Cookies.get('connected');


    return(
    <Wrapper backgroundUrl={imageURL}>
        <div className='filter'  style={{height: imgSize+"px" }}>
            <Grid   container 
                    direction="row"
                    alignItems="center"
                    className="topBlock"
            >
                <Grid item xl={3} lg={2} md={12} sm={12} xs={12}  style={{textAlign: 'center'}}>
                    <Grid container justify='center' alignItems='center' >
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
                <Grid item xl={6} lg={5} md={6} sm={7} xs={12} >
                    <Grid container 
                            direction="row"
                            justify="center"
                    >
                        <Grid item>
                            <Button 
                            variant="contained" 
                            size="medium" 
                            style={{backgroundColor: 'limegreen', color: 'white', textTransform: 'none', marginTop: '10px'}}
                            onClick={()=>history.push({
                                pathname: '/accueil/offres',
                                state: {type: Appel.OFFRE}
                            
                            })}
                            >
                                Trouvez votre stage
                            </Button>
                        </Grid>
                        <Grid item style={{marginLeft: '5px', marginTop: '10px'}}>
                            <Button variant="contained" size="medium"  
                            style={{backgroundColor: 'limegreen', color: 'white', textTransform: 'none'}}
                            onClick={()=>history.push({
                                pathname: '/accueil/demandes',
                                state: {type: Appel.DEMANDE}
                            })}
                            >
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
                                    
                                    
                                    <Grid item style={{marginTop: '10px'}}>
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
                                <Grid item style={{marginTop: '10px'}}>

                                <Button variant="contained" 
                                        size="medium"  
                                        style={{backgroundColor: 'white', color: 'dimgray', textTransform: 'none'}}
                                        onClick={handleLogin}
                                >
                                    Connexion
                                </Button>
                                </Grid>
                                }
                                
                                
                            </Grid>
                            <Grid item style={{marginLeft: '10px', marginRight: '10px', marginTop: '10px'}}>
                            {token ? 
                                <Button variant="contained" size="medium" color='primary' style={{textTransform: 'none'}} 
                                onClick={()=>{history.push('/dashboard')}}>
                                    Dashboard
                                </Button>
                            :    <Button variant="contained" size="medium"  
                                    style={{backgroundColor: 'dimgray', color: 'white', textTransform: 'none'}}
                                    onClick={()=>history.push('/register')}
                                    >
                                    Inscription
                                </Button>
                            }
                            </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container justify="center"  className="centerBlock">
                <Grid item >
                    <Grid container  
                        direction="column"
                        alignItems="center"
                    >
                        <Grid item>
                            <Typography variant="h3" style={{color:'white', textAlign:'center', marginBottom: '20px'}}>Trouvez votre stage!</Typography>
                        </Grid>
                        <Grid item>
                                <Grid container  alignItems="center" 
                                style={{borderRadius: '0',textTransform: 'none', backgroundColor: 'white', padding: '5px', width: '50vw'}}>
                                    <Grid item xl={9} lg={8} md={8} sm={7} xs={12}>
                                        <InputBase 
                                            fullWidth
                                            placeholder="Mot clé"
                                            onChange={(e)=>recherche(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xl={3} lg={4} md={4} sm={5} xs={12}>
                                        <Button 
                                        data-testid="button-recherche"
                                        onClick={()=>history.push('/accueil/offres')}
                                        fullWidth variant="contained" color="primary" style={{borderRadius: '0',textTransform: 'none'}}>
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