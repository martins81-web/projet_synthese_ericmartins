/* eslint-disable react-hooks/exhaustive-deps */
import { faAngleDown, faBell, faPlus, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Avatar,
    Badge,
    Box,
    Button,
    Grid,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Typography,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { fetchUtilisateur } from '../../Api';
import { AccessLevel } from '../../Enum';
import { UtilisateursType } from '../../Types';
import useAuth from '../auth/useAuth';

type Props = {
    logout: () => void;
    profil: () => void;
};

const DashboardHeader: React.FC<Props> =({logout,profil})=>{
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const auth = useAuth();
    const history= useHistory();


    const [user, setUser] =  useState<UtilisateursType|null|undefined>(auth?.user);
    const theme = useTheme();

    //mediaQueries
    const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    //console.log(matchesSM);


    useEffect(()=>{
      getUser();
      },[])

      const getUser= async()=>{
        const token = Cookies.get('connected');
        //console.log(token);
        
        let user:UtilisateursType | undefined;
        if(token)
        user  = await fetchUtilisateur(token);
       // console.log(user);
        setUser(user);
    } 
  
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleProfil = () => {
        handleClose();
        profil();
      };

    const getUserName =()=> {
        return user?.Prenom+ ' ' + user?.Nom;
    }

    const getAccessLevel =()=> {
        const userAccessLevel = user?.NiveauAcces;
        if(userAccessLevel === AccessLevel.admin)
            return 'Admin';
        else if (userAccessLevel === AccessLevel.entreprise)
            return 'Entreprise';
            else if (userAccessLevel === AccessLevel.stagiaire)
            return 'Étudiant';
     }

     const getInitials =()=> {
        const initialePrenom = user?.Prenom !== undefined ? user?.Prenom.charAt(0) : "";
        const initialeNom = user?.Nom !== undefined ? user?.Nom.charAt(0) : "";

        return initialePrenom + initialeNom;
    }

    return(
        <Grid container alignItems='center'>
            <Grid item xs={12} sm={12} md={6}>
                { (history.location.pathname==='/dashboard/admins' 
                || history.location.pathname==='/dashboard/entreprises'
                || history.location.pathname==='/dashboard/candidats') &&  auth?.user?.NiveauAcces === AccessLevel.admin?
                <Grid container>
                    <Grid item>
                        <Button variant="outlined" startIcon={<FontAwesomeIcon icon={faPlus}  size={matchesSM ? "sm": 'lg'}/>}
                        style={{textTransform: 'none'}}
                        onClick={()=>history.push('/dashboard/newUser')}
                        >
                            Nouveau utilisateur
                        </Button>
                    </Grid>
                </Grid>
                :<Grid container spacing={2} justify={matchesSM? 'center':'flex-end'}>
                    {(auth?.user?.NiveauAcces === AccessLevel.entreprise || auth?.user?.NiveauAcces === AccessLevel.admin) &&
                    <Grid item>
                        <Button variant="outlined" startIcon={<FontAwesomeIcon icon={faPlus}  size={matchesSM ? "sm": 'lg'}/>}
                        style={{textTransform: 'none'}}
                        onClick={()=>history.push('/dashboard/newOffre')}
                        >
                            Offre de stage
                        </Button>
                    </Grid>
                    }
                    {(auth?.user?.NiveauAcces === AccessLevel.stagiaire || auth?.user?.NiveauAcces === AccessLevel.admin) &&
                    <Grid item>
                        <Button variant="outlined" startIcon={<FontAwesomeIcon icon={faPlus}  size="lg"/>}
                        style={{textTransform: 'none'}}
                        onClick={()=>history.push('/dashboard/newDemande')}
                        >
                            Demande de stage
                        </Button>
                    </Grid>
                    }
                </Grid>
                }
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Grid container justify={matchesXS? 'center':'flex-end'}>
                    <Box>
                        <Grid container spacing={1} alignItems='center'>
                            <Grid item>
                                <Grid container direction='column' alignItems='flex-end'>
                                    <Typography variant="caption" style={{textTransform: 'none', fontWeight: 'bold'}}>{getUserName()}</Typography> 
                                    <Typography variant="caption" style={{textTransform: 'none', color: 'darkgray'}}>{getAccessLevel()}</Typography>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Avatar>{getInitials()}</Avatar>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={handleClick}>
                                    <FontAwesomeIcon icon={faAngleDown} color="darkgray" />
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleProfil}>
                                        <ListItemIcon>
                                            <FontAwesomeIcon icon={faUser} color="#3e99df" />
                                        </ListItemIcon>
                                        <ListItemText primary="Profil" />
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                    </MenuItem>
                                    <MenuItem 
                                        onClick={logout}>
                                        <ListItemIcon>
                                            <FontAwesomeIcon icon={faSignOutAlt} color="#3e99df" />
                                        </ListItemIcon>
                                        <ListItemText primary="Déconnexion" /> 
                                    </MenuItem>
                                </Menu>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <Grid container justify={matchesXS?'center':matchesSM? 'flex-start':'flex-end'}>
                    <Grid item>
                        <IconButton>
                            <Badge color="primary" variant="dot" overlap="circle">
                                <FontAwesomeIcon icon={faBell}  color="darkgray"/>
                            </Badge>  
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={logout}>
                            <FontAwesomeIcon icon={faSignOutAlt} color="darkgray"/> 
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default DashboardHeader;

