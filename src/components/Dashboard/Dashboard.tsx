/* eslint-disable react-hooks/exhaustive-deps */
import {
    faArrowAltCircleLeft,
    faArrowAltCircleRight,
    faBriefcase,
    faHome,
    faMapMarkedAlt,
    faSignOutAlt,
    faUserGraduate,
    faUserNinja,
    faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import GestureIcon from '@material-ui/icons/Gesture';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { fetchUtilisateur } from '../../Api';
import { Menu } from '../../Enum';
import { UtilisateursType } from '../../Types';
import useAuth from '../auth/useAuth';
import Footer from '../Footer';
import DashboardContent from './DashBoardContent';
import DashboardEditProfil from './DashboardEditProfil';
import DashboardHeader from './DashBoardHeader';

//items du menu, routes et permissions
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
        accessLevel: [111,333,999]
    },
    {
        name: Menu.demandes,
        icon: faArrowAltCircleLeft,
        link: "/dashboard/demandes",
        accessLevel: [111,333,999]
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
    },
    {
        name: Menu.admins,
        icon: faUserNinja,
        link: "/dashboard/admins",
        accessLevel: [999]
    },
    {
        name: Menu.regions,
        icon: faMapMarkedAlt,
        link: "/dashboard/regions",
        accessLevel: [999]
    },
    {
        name: Menu.secteurs,
        icon: faBriefcase,
        link: "/dashboard/secteurs",
        accessLevel: [999]
    }
];

type Props = {
    logout: () => void;
};



const Dashboard: React.FC<Props> =({logout})=>{
    const auth = useAuth();
    const history= useHistory();
    const [menuItemSelected, setMenuItemSelected] = useState('accueil');
    const [user, setUser] =  useState<UtilisateursType|null|undefined>(auth?.user);
    //MediaQueries
    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
    //console.log(matchesXS)


    useEffect(()=>{
        let location = history.location.pathname;
        if (location === '/dashboard' || location === '/dashboard/') {
         history.push('/dashboard/accueil');
         location='/dashboard/accueil';
        }
        updateMenu();

        // eslint-disable-next-line react-hooks/exhaustive-deps
        getUser();
      },[])

      const getUser= async()=>{
        let id='';
        if(auth?.user!==undefined && auth?.user!==null)
        id = auth?.user._id;
        let user : UtilisateursType | undefined = await fetchUtilisateur(id);
        //console.log(user);
        setUser(user);
    } 

    const updateMenu =()=>{
        let location = history.location.pathname;
        // eslint-disable-next-line array-callback-return
        menuItems.map(item =>{
            if (location === item.link) {
             setMenuItemSelected(item.name);
             history.push(location);
            } else if(location.includes('ffre') && item.name===Menu.offres){
                setMenuItemSelected(item.name);
            }
            else if(location.includes('emande') && item.name===Menu.demandes){
                setMenuItemSelected(item.name);
            }
            else if(location.includes('candidat') && item.name===Menu.candidats){
                setMenuItemSelected(item.name);
            }
            else if(location.includes('entreprise') && item.name===Menu.entreprises){
                setMenuItemSelected(item.name);
            }
            else if(location.includes('admin') && item.name===Menu.admins){
                setMenuItemSelected(item.name);
            }
        })
    }

    return(
      
       <Wrapper>
            {user  &&
            <Grid container>
                
                <Grid item xs={2}>
                    <Grid container direction='column' 
                    style={{backgroundColor: '#3e99df', 
                    color: 'white', minHeight: '100vh', height: '100%', 
                    borderBottom:  '7px solid #a0c3da'}}
                    >
                        <Grid item style={{ padding: matchesSM? '0px' :matchesMD? '10px':'30px'}}>
                            <Grid container className='logo' justify='center' spacing={matchesSM? 0: 2} alignItems='center' onClick={()=>history.push("/accueil")}>
                                <Grid item>
                                    <GestureIcon style={{color: 'white', fontSize: '3rem'}}/>
                                </Grid>
                                {matchesXS===false&&
                                <Grid item>
                                    <Typography variant={matchesSM? 'h6': matchesMD? 'h4': 'h3'} >eStage</Typography>
                                </Grid>
                                }
                            </Grid>
                        </Grid>
                        <Grid item style={{ marginBottom: '60px', marginTop: '60px'}}>
                            <List>
                                {menuItems.map((item, index) => (
                                    auth?.user ?
                                    item.accessLevel.includes(auth?.user.NiveauAcces) ?
                                        <ListItem  key={'Menu'+item.name+index} 
                                        button 
                                        onClick={()=>{
                                            setMenuItemSelected(item.name);
                                            history.push(item.link);
                                        }}
                                        style={{
                                        boxSizing: 'border-box',
                                        borderLeft: matchesSM? '0px': menuItemSelected === item.name ? '7px solid #a0c3da' : 'none', 
                                        backgroundColor:  menuItemSelected === item.name ? "#4589b7" : 'inherit',
                                        paddingLeft:  matchesSM ?'0px': menuItemSelected !== item.name  ? '14px': '7px'
                                        }}
                                        disableGutters
                                        className={'listItem'}
                                    >
                                        <Grid container alignItems='center' >
                                            <Grid item xs={12} sm={12} md={12} lg={3}>
                                                <Grid container justify='center'  >
                                                    <ListItemIcon style={{justifyContent: matchesMD?'center': 'flex-start'}} > 
                                                        <FontAwesomeIcon icon={item.icon}  size="lg" color="white" />
                                                    </ListItemIcon>
                                                </Grid>
                                            </Grid>
                                            {matchesXS===false&&
                                            <Grid item xs={12} sm={12} md={12} lg={9}>
                                                <Grid container style={{textAlign:matchesMD?'center': 'left'}}>
                                                    <ListItemText disableTypography
                                                    style={{fontSize: matchesSM?'0.9em':'1.3em', flexWrap: 'wrap'}}
                                                    >
                                                    {
                                                        item.name
                                                    }
                                                    </ListItemText >
                                                </Grid>
                                            </Grid>
                                            }
                                        </Grid>
                                    </ListItem> : null :null
                                    ))}
                            </List>
                        </Grid>
                        <Grid item>
                            <List >
                                <ListItem className='listItem' button
                                    disableGutters={matchesSM}
                                    onClick={logout}
                                >
                                    <Grid container alignItems='center' justify='center'>
                                            <Grid item xs={12} sm={12} md={12} lg={3}>
                                                <Grid container justify='center'  >
                                                    <ListItemIcon style={{justifyContent: matchesMD?'center': 'flex-start'}}> 
                                                        <FontAwesomeIcon icon={faSignOutAlt} size="lg" color="white"/> 
                                                    </ListItemIcon>
                                               </Grid>
                                            </Grid>
                                            {matchesXS===false&&
                                                <Grid item xs={12} sm={12} md={12} lg={9}>
                                                    <Grid container style={{textAlign:matchesMD?'center': 'left'}}>
                                                        <ListItemText 
                                                        disableTypography	
                                                        style={{fontSize: matchesSM?'1em':'1.3em',flexWrap: 'wrap'}}>D??connexion</ListItemText >
                                                    </Grid>
                                                </Grid>
                                                 }
                                            </Grid>
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid item xs={10} style={{position: 'relative'}}>
                    
                    <Grid container direction='column'  style={{padding: '30px', marginBottom: 'auto'}}>
                        <Grid item>
                            <DashboardHeader logout={logout} 
                                profil={()=>{
                                            setMenuItemSelected('Profil');
                                            history.push({
                                                pathname: '/dashboard/profil',
                                                state: { data: auth?.user}
                                            });
                                        }}
                        />
                        </Grid>
                        {/*PREMI??RE CONNEXION*/}
                        <Grid item>
                            {user && user.PremierConnexion ?
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant='h4'>Premi??re connexion - Veuillez compl??ter votre profil</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <DashboardEditProfil history={history}/>
                                </Grid>
                            </Grid> 
                            :
                            <Grid container direction='column'>
                                <Grid item xs>
                                    <DashboardContent />
                                </Grid>
                            </Grid>
                            }
                            
                        </Grid>
                     
                    </Grid>
                </Grid>
            </Grid> }
            <Footer/>
        </Wrapper>

    )
}

export default Dashboard;


export const Wrapper = styled.div`
 
 .listItem:hover{
     background-color: #70aedd !important
 }

.logo:hover{
    cursor: pointer;
 }
    
`
