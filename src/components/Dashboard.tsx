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
import GestureIcon from '@material-ui/icons/Gesture';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { Menu } from '../Enum';
import useAuth from './auth/useAuth';
import DashboardContent from './DashBoardContent';
import DashboardHeader from './DashBoardHeader';
import Footer from './Footer';

const menuItems =[
    {
        name: Menu.accueil,
        icon: faHome,
        link: "/dashboard/accueil",
        accessLevel: [111,333,999]
    },
    {
        name: Menu.offres,
        icon: faArrowAltCircleRight,
        link: "/dashboard/offres",
        accessLevel: [333,999]
    },
    {
        name: Menu.demandes,
        icon: faArrowAltCircleLeft,
        link: "/dashboard/demandes",
        accessLevel: [111,999]
    },
    {
        name: Menu.candidats,
        icon: faUserGraduate,
        link: "/dashboard/candidats",
        accessLevel: [999]
    },
    {
        name: Menu.entreprises,
        icon: faUserTie,
        link: "/dashboard/entreprises",
        accessLevel: [999]
    }
];

type Props = {
    logout: () => void;
};

const Dashboard: React.FC<Props> =({logout})=>{
    const [menuItemSelected, setMenuItemSelected] = useState('');
    const auth = useAuth();
    const history = useHistory();

    useEffect(()=>{
        let location = history.location.pathname;
        if (location === '/dashboard' || location === '/dashboard/') {
         history.push('/dashboard/accueil');
         location='/dashboard/accueil';
        }
        menuItems.map(item =>{
             // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            if (location === item.link) {
             setMenuItemSelected(item.name);
             history.push(location);
            }         
        })
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

    return(
        auth?.user ?
        <Wrapper>
            <Grid container>
                <Grid item  xs={2} style={{backgroundColor: '#3e99df', color: 'white', minHeight: '100vh'}}>
                    <Grid container direction='column'>
                        <Grid item style={{ padding: '30px'}}>
                            <Grid container justify='center' spacing={2} alignItems='center'>
                                <Grid item>
                                    <GestureIcon style={{color: 'white', fontSize: '3rem'}}/>
                                </Grid>
                                <Grid item>
                                    <Typography variant='h3' >eStage</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item style={{ marginBottom: '60px'}}>
                            <List>
                                {menuItems.map((item, index) => (
                                    auth?.user ?
                                    item.accessLevel.includes(auth?.user.NiveauAcces) ?
                                        <ListItem className='listItem'  key={'Menu'+item.name+index} 
                                        button 
                                        onClick={()=>{
                                            setMenuItemSelected(item.name);
                                            history.push(item.link);
                                        }}
                                        style={{paddingLeft: menuItemSelected !== item.name ? '40px': '33px', 
                                        borderLeft: menuItemSelected === item.name ? '7px solid #a0c3da' : 'none' , 
                                        backgroundColor:  menuItemSelected === item.name ? "#4589b7" : 'inherit',
                                    }}
                                    >
                                        <ListItemIcon> 
                                            <FontAwesomeIcon icon={item.icon}  size="lg" color="white"/>
                                        </ListItemIcon>
                                        <ListItemText primary={item.name} />
                                    </ListItem> : null :null
                                    ))}
                            </List>
                        </Grid>
                        <Grid item>
                            <List>
                                <ListItem className='listItem' button style={{ paddingLeft: '40px'}}
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
                            <DashboardHeader logout={logout} 
                            profil={()=>{
                                            setMenuItemSelected('Profil');
                                            history.push('profil')
                                        }}
                        />
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
        </Wrapper>
   : null
    )
}

export default Dashboard;


export const Wrapper = styled.div`
 
 .listItem:hover{
     background-color: #70aedd !important
 }
    
    
`
