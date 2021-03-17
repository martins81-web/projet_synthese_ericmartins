import { faLevelDownAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Typography } from '@material-ui/core';
import { Redirect, Route } from 'react-router-dom';

import useAuth from './auth/useAuth';
import DashboardAccueil from './DashboardAccueil';
import DashBoardUsers from './DashBoardUsers';



type Props = {
    menuItemSelected: string;
};

const DashboardContent: React.FC<Props> =({menuItemSelected})=>{
    const auth = useAuth();




    const renderMenuTitleArrow = (subtitle: string, variant: any, iconsize : any) => {
        return (
            
                <Grid container alignItems='center' spacing={3}> 
                    <Grid item>
                        <Typography variant={variant}>{subtitle}</Typography>
                    </Grid>
                    <Grid item>
                        <FontAwesomeIcon icon={faLevelDownAlt}  size={iconsize} />
                    </Grid>
                </Grid>
        )
    }

    const renderAccueil =(menuItem: string)=>{

        return (

            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='h3'> 
                        En attende de validation 
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    {renderMenuTitleArrow('Demandes de stage', 'h6', 'lg')}
                </Grid>
                <Grid item xs={6}>
                    {renderMenuTitleArrow('Offres de stage', 'h6', 'lg')}
                </Grid>  
            </Grid>
        );
    }

    const renderOffres =(menuItem: string)=>{
        return (
            <Grid container>
                {renderMenuTitleArrow(menuItem, 'h3', '3x')}
            </Grid>
        );
    }

    const renderDemandes =(menuItem: string)=>{
        return (
            <Grid container>
                {renderMenuTitleArrow(menuItem, 'h3', '3x')}
            </Grid>
        );
    }

    const renderCandidats =(menuItem: string)=>{
        return (
            <Grid container>
                {renderMenuTitleArrow(menuItem, 'h3', '3x')}
            </Grid>
        );
    }

    const renderEntreprises =(menuItem: string)=>{
        return (
            <Grid container>
                {renderMenuTitleArrow(menuItem, 'h3', '3x')}
            </Grid>
        );
    }

    const renderProfil =(menuItem: string)=>{
        return (
            <Grid container>
                Profil
            </Grid>
        );
    }

    return(
        <>
            
            <Route path="/dashboard/accueil"><DashboardAccueil/></Route>
            <Route path="/dashboard/offres">{renderOffres(menuItemSelected)}</Route>
            <Route path="/dashboard/demandes">{renderDemandes(menuItemSelected)}</Route>
            <Route path="/dashboard/candidats"><DashBoardUsers usersType='candidats'/></Route>
            <Route path="/dashboard/entreprises"><DashBoardUsers usersType='entreprises'/></Route>
            <Route path="/dashboard/profil">{renderProfil(menuItemSelected)}</Route>
        </>
    )
}

export default DashboardContent;