import { useHistory } from 'react-router';
import { Route } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';

import DashboardAccueil from './DashboardAccueil';
import DashboardDemandes from './DashboardDemandes';
import DashboardEditDemande from './DashboardEditDemande';
import DashboardEditOffre from './DashboardEditOffre';
import DashboardProfil from './DashboardEditProfil';
import DashboardEditUsers from './DashboardEditUsers';
import DashboardNouveauUser from './DashboardNouveauUser';
import DashboardNouvelleDemande from './DashboardNouvelleDemande';
import DashboardNouvelleOffre from './DashboardNouvelleOffre';
import DashboardOffres from './DashBoardOffres';
import DashboardRegions from './DashboardRegions';
import DashboardSecteurs from './DashboardSecteurs';
import DashBoardUsers from './DashBoardUsers';


type Props = {
};

const DashboardContent: React.FC<Props> =()=>{
    const history = useHistory();
    //const auth = useAuth();
    return(
        <div  style={{backgroundColor: '#F8F8F8', padding: '20px'}}>  
            <LastLocationProvider>
                <Route path="/dashboard/accueil"><DashboardAccueil/></Route>
                <Route path="/dashboard/offres"><DashboardOffres/></Route>
                <Route path="/dashboard/demandes"><DashboardDemandes/></Route>
                <Route path="/dashboard/candidats"><DashBoardUsers usersType='candidats'/></Route>
                <Route path="/dashboard/entreprises"><DashBoardUsers usersType='entreprises'/></Route>
                <Route path="/dashboard/admins"><DashBoardUsers usersType='admins'/></Route>
                <Route path="/dashboard/profil" ><DashboardProfil history={history}/></Route>
                <Route path="/dashboard/secteurs"><DashboardSecteurs/></Route>
                <Route path="/dashboard/regions"><DashboardRegions/></Route>
                <Route path="/dashboard/newUser"><DashboardNouveauUser/></Route>
                <Route path="/dashboard/newOffre"><DashboardNouvelleOffre/></Route>
                <Route path="/dashboard/newDemande"><DashboardNouvelleDemande/></Route>
                <Route path="/dashboard/edit/user/:id"><DashboardEditUsers history={history}/></Route>
                <Route path="/dashboard/edit/offre/:id"><DashboardEditOffre history={history}/></Route>
                <Route path="/dashboard/edit/demande/:id"><DashboardEditDemande history={history}/></Route>
            </LastLocationProvider>
        </div>
    )
}

export default DashboardContent;