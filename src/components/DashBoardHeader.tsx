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
import { useState } from 'react';

import { AccessLevel } from '../Enum';
import useAuth from './auth/useAuth';


type Props = {
    logout: () => void;
    profil: () => void;
};

const DashboardHeader: React.FC<Props> =({logout,profil})=>{
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const auth = useAuth();
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
        return auth?.user?.Prenom+ ' ' + auth?.user?.Nom;
    }

    const getAccessLevel =()=> {
        const userAccessLevel = auth?.user?.NiveauAcces;
        if(userAccessLevel === AccessLevel.admin)
            return 'Admin';
        else if (userAccessLevel === AccessLevel.entreprise)
            return 'Entreprise';
            else if (userAccessLevel === AccessLevel.stagiaire)
            return 'Étudiant';
     }

     const getInitials =()=> {
        const initialePrenom = auth?.user?.Prenom !== undefined ? auth?.user?.Prenom.charAt(0) : "";
        const initialeNom = auth?.user?.Nom !== undefined ? auth?.user?.Nom.charAt(0) : "";

        return initialePrenom + initialeNom;
    }

    return(
        <Grid container alignItems='center'>
            <Grid item xs={6}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Button variant="outlined" startIcon={<FontAwesomeIcon icon={faPlus}  size="lg"/>}
                        style={{textTransform: 'none'}}
                        >
                            Ajouter une offre de stage
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" startIcon={<FontAwesomeIcon icon={faPlus}  size="lg"/>}
                        style={{textTransform: 'none'}}
                        >
                            Ajouter une demande de stage
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <Grid container justify='flex-end'>
                    <Box>
                        <Grid container spacing={2} alignItems='center'>
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
            <Grid item xs={2}>
                <Grid container justify='flex-end'>
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

