import { faLevelDownAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Typography } from '@material-ui/core';

type Props = {
    
};

const DashboardAccueil: React.FC<Props> =()=>{

    return(
        <>
           <Grid container>
                <Grid item xs={12}>
                    <Typography variant='h3'> 
                        En attende de validation 
                    </Typography>
                </Grid>
                <Grid item xs={5}>
                    <Grid container alignItems='center' spacing={3}> 
                        <Grid item>
                            <Typography variant={'h6'}>Demandes de stage</Typography>
                        </Grid>
                        <Grid item>
                            <FontAwesomeIcon icon={faLevelDownAlt}  size='lg' />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={5}>
                    <Grid container alignItems='center' spacing={3}> 
                        <Grid item>
                            <Typography variant={'h6'}>Offres de stage</Typography>
                        </Grid>
                        <Grid item>
                            <FontAwesomeIcon icon={faLevelDownAlt}  size='lg' />
                        </Grid>
                    </Grid> 
                </Grid>  
            </Grid>
        </>
    )
}

export default DashboardAccueil;