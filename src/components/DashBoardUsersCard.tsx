import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { UtilisateursType } from '../Types';

type Props = {
    user: UtilisateursType;
    usersType: string
    supprimer :()=>void
};

const DashBoardUsersCard: React.FC<Props> =({user, supprimer,usersType})=>{
    const history= useHistory();

    const handleEdit = (user: UtilisateursType) =>{

        history.push({
            pathname: '/dashboard/edit/user/'+user._id,
            state: { data: user}
        });
    }

    return(
        <>
          <Card variant="outlined" style={{textAlign:'center'}}>
                <CardContent>
                    <Typography variant='h5'>
                        {usersType === 'candidats' ? user.Prenom+' '+user.Nom:
                        user.NomEntreprise
                        }
                    </Typography>
                    <Typography variant='subtitle1'  className='dashboardColor'>
                        {user.Ecole}
                    </Typography>
                    <Typography variant='subtitle2'  className='dashboardColor'>
                        {user.Ville}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Grid container justify='center' spacing={2}>
                        <Grid item>
                            <Button variant="outlined" size="small" 
                            onClick={()=>handleEdit(user)}
                            startIcon={  <FontAwesomeIcon icon={faEdit} color="green"/>}
                            >
                                Modifier
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button 
                                onClick={supprimer}
                                variant="outlined" 
                                size="small"  
                                startIcon={<FontAwesomeIcon icon={faTimes} color="red"/>}
                            >
                                Supprimer
                            </Button>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card> 
        </>
    )
}

export default DashBoardUsersCard;