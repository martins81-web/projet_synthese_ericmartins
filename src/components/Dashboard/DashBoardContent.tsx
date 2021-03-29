import { useHistory } from 'react-router';
import { Redirect, Route } from 'react-router-dom';

import ProtectedDashboard from '../auth/ProtectedDashboard';
import useAuth from '../auth/useAuth';
import DashboardAccueil from './DashboardAccueil';
import DashboardDemandes from './DashboardDemandes';
import DashboardEditProfil from './DashboardEditProfil';
import DashboardProfil from './DashboardEditProfil';
import DashboardEditUsers from './DashboardEditUsers';
import DashboardOffres from './DashBoardOffres';
import DashboardRegions from './DashboardRegions';
import DashboardSecteurs from './DashboardSecteurs';
import DashBoardUsers from './DashBoardUsers';


type Props = {
};

const DashboardContent: React.FC<Props> =()=>{
    const history = useHistory();
    //const auth = useAuth();

    //console.log(history.location.pathname)
    return(
        <div  style={{backgroundColor: '#F8F8F8', padding: '20px'}}>  
            
            <Route path="/dashboard/accueil"><DashboardAccueil/></Route>
            <Route path="/dashboard/offres"><DashboardOffres/></Route>
            <Route path="/dashboard/demandes"><DashboardDemandes/></Route>
            <Route path="/dashboard/candidats"><DashBoardUsers usersType='candidats'/></Route>
            <Route path="/dashboard/entreprises"><DashBoardUsers usersType='entreprises'/></Route>
            <Route path="/dashboard/profil" ><DashboardProfil history={history}/></Route>
            <Route path="/dashboard/secteurs"><DashboardSecteurs/></Route>
            <Route path="/dashboard/regions"><DashboardRegions/></Route>
            <Route path="/dashboard/edit/user/:id"><DashboardEditUsers history={history}/></Route>
            
        </div>
    )
}

export default DashboardContent;