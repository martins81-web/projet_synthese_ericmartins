import {
    faArrowAltCircleLeft,
    faArrowAltCircleRight,
    faHome,
    faSignOutAlt,
    faUserGraduate,
    faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import useAuth from './auth/useAuth';
import DashboardContent from './DashBoardContent';
import DashboardHeader from './DashBoardHeader';
import Footer from './Footer';

export enum Menu {
    accueil = 'Accueil',
    offres = 'Offres de stage',
    demandes = 'Demandes de stage',
    candidats = 'Candidats',
    entreprises = 'Entreprises',
    profil = 'Profil'
  }

const menuItems =[
    {
        name: Menu.accueil,
        icon: faHome,
    },
    {
        name: Menu.offres,
        icon: faArrowAltCircleRight,
    },
    {
        name: Menu.demandes,
        icon: faArrowAltCircleLeft,
    },
    {
        name: Menu.candidats,
        icon: faUserGraduate,
    },
    {
        name: Menu.entreprises,
        icon: faUserTie,
    }
];

type Props = {
};

const Dashboard: React.FC<Props> =()=>{
    const [menuItemSelected, setMenuItemSelected] = useState('Accueil');
    const auth = useAuth();
    const history = useHistory();

    const logout=()=>{
        auth?.signOut('Eric');
        history.push('/accueil');
    }

    return(
        <Grid container>
            <Grid item  xs={2} style={{backgroundColor: '#3e99df', color: 'white', minHeight: '100vh'}}>
                <Grid container direction='column'>
                    <Grid item style={{ marginBottom: '30px'}}>
                        <Typography variant='h4' >eStage</Typography>
                    </Grid>
                    <Grid item style={{ marginBottom: '60px'}}>
                        <List>
                            {menuItems.map((item, index) => (
                            <ListItem key={'Menu'+item.name+index} 
                                button onClick={()=>setMenuItemSelected(item.name)}
                                style={{paddingLeft: menuItemSelected !== item.name ? '40px': '33px', 
                                borderLeft: menuItemSelected === item.name ? '7px solid #a0c3da' : 'none' , 
                                backgroundColor:  menuItemSelected === item.name ? "#4589b7" : 'transparent'
                            }}
                            >
                                <ListItemIcon> <FontAwesomeIcon icon={item.icon}  size="lg" color="white"/> </ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItem>
                                ))}
                        </List>
                    </Grid>
                    <Grid item>
                        <List>
                            <ListItem button style={{ paddingLeft: '40px'}}
                                onClick={logout}
                            >
                                <ListItemIcon> <FontAwesomeIcon icon={faSignOutAlt}  size="lg" color="white"/> </ListItemIcon>
                                <ListItemText primary={'Déconnexion'} />
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={10} style={{position: 'relative'}}>
                <Grid container direction='column'  style={{padding: '30px'}}>
                    <Grid item>
                        <DashboardHeader logout={logout} profil={()=>setMenuItemSelected('Profil')}/>
                    </Grid>
                    <Grid item>
                        <DashboardContent menuItemSelected={menuItemSelected}/>
                    </Grid>
                </Grid>
                <Box style={{position: 'absolute',bottom: '0', width: '100%',borderLeft:  '7px solid #a0c3da'}}>
                    <Footer/>
                </Box>
            </Grid>
    </Grid>
    )
}

export default Dashboard;

