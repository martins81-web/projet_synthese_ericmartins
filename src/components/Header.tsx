import { Button, Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';


type Props = {
    imageURL: string,
    imgSize: number
}

const Header: React.FC<Props> =({imageURL,imgSize})=>{
  
    return(
    <Wrapper backgroundUrl={imageURL}>
        <div className='filter'  style={{height: imgSize+'px' }}>
            <Grid   container 
                    direction="row"
                    alignItems="center"
                    className="topBlock"
            >
                <Grid item xs={3} style={{textAlign: 'center'}} >
                    <Typography variant="h3"  style={{color:'white'}}>eStage</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Grid container
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                    >
                        <Grid item >
                            <Button variant="contained" size="medium" style={{backgroundColor: 'limegreen', color: 'white', textTransform: 'none'}}>
                                Trouvez votre stage
                            </Button>
                        </Grid>
                        <Grid item style={{marginLeft: '10px'}}>
                            <Button variant="contained" size="medium"  style={{backgroundColor: 'limegreen', color: 'white', textTransform: 'none'}}>
                                Trouvez votre futur stagiaire
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            
                <Grid item xs={3}>
                    <Grid container
                                direction="row"
                                justify="center"
                                alignItems="center"
                        >
                            <Grid item >
                                <Button variant="contained" size="medium"  style={{backgroundColor: 'white', color: 'dimgray', textTransform: 'none'}}>
                                    Connexion
                                </Button>
                            </Grid>
                            <Grid item style={{marginLeft: '10px'}}>
                                <Button variant="contained" size="medium"  style={{backgroundColor: 'dimgray', color: 'white', textTransform: 'none'}}>
                                    Inscription
                                </Button>
                            </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container justify="center"  className="centerBlock">
                <Grid item>
                    <Grid container  
                        direction="column"
                        alignItems="center"
                        spacing={5}
                    >
                        <Grid item>
                            <Typography variant="h3" style={{color:'white'}}>Trouvez votre stage!</Typography>
                        </Grid>
                        <Grid item>
                            <div className="input-group" style={{padding: '3px', backgroundColor: 'white', width: '40vw'}}>
                                <input type="text" className="form-control" placeholder="Mot clé" aria-label="recherche" aria-describedby="basic-addon2" style={{border: 'none'}}/>
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button" style={{borderRadius: '0', width: '150px'}}>Rechercher</button>
                                </div>
                            </div>
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