import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { UtilisateursType } from '../../Types';
import useAuth from '../auth/useAuth';
import { AccessLevel } from '../../Enum';

type Props = {
    user: UtilisateursType;
    usersType: string
    supprimer :()=>void
};

//card pour les utilisateursa
const DashBoardUsersCard: React.FC<Props> =({user, supprimer,usersType})=>{
    const history= useHistory();
    const auth = useAuth();

    const handleEdit = (user: UtilisateursType) =>{

        history.push({
            pathname: '/dashboard/edit/'+(user.NiveauAcces===AccessLevel.admin?'admin':user.NiveauAcces===AccessLevel.stagiaire? 'candidat':'entreprise')+'/'+user._id,
            state: {data: user}
        });
    }

    return(
        <Wrapper>
          <Card variant="outlined" className='card'  
          onClick={()=>{history.push({
              pathname:'/dashboard/'+(user.NiveauAcces===AccessLevel.admin?'admin':user.NiveauAcces===AccessLevel.stagiaire? 'candidat':'entreprise')+'/'+user._id,
              state: {data: user}
                })}}   
                style={{display: 'flex',justifyContent: 'space-between', flexDirection: 'column', height: '100%', width:'100%'}}   
          >
                <CardContent>
                    <Typography variant='h5'>
                        {usersType !== 'entreprises' ? user.Prenom+' '+user.Nom:
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
                            onClick={(event)=>{
                                event.stopPropagation();
                                event.preventDefault();
                                handleEdit(user);
                            }}
                            startIcon={  <FontAwesomeIcon icon={faEdit} color="green"/>}
                            >
                                Modifier
                            </Button>
                        </Grid>
                        { auth?.user?._id!==user._id &&
                        <Grid item>
                            <Button 
                                onClick={(event)=>{
                                        event.stopPropagation();
                                        event.preventDefault();
                                        supprimer();
                                }}
                                variant="outlined" 
                                size="small"  
                                startIcon={<FontAwesomeIcon icon={faTimes} color="red"/>}
                            >
                                Supprimer
                            </Button>
                        </Grid>
                        }
                    </Grid>
                </CardActions>
            </Card> 
        </Wrapper>
    )
}

export default DashBoardUsersCard;


export const Wrapper = styled.div`

height: 100%;
.card{
    text-align:center;
 
}

.card:hover{
    background-color: #E8E8E8;
    cursor: pointer;
}

`