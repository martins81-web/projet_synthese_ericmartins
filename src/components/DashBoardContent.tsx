import { faLevelDownAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import { Route } from 'react-router-dom';

import DashboardAccueil from './DashboardAccueil';
import DashboardEditUsers from './DashboardEditUsers';
import DashBoardUsers from './DashBoardUsers';



type Props = {
    menuItemSelected: string;
};

const DashboardContent: React.FC<Props> =({menuItemSelected})=>{
    const history = useHistory();


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
            <Route path="/dashboard/edit/user/:id"><DashboardEditUsers history={history}/></Route>
        </>
    )
}

export default DashboardContent;