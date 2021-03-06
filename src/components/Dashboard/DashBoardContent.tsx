import { useHistory } from 'react-router';
import { LastLocationProvider } from 'react-router-last-location';
import useAuth from '../auth/useAuth';

import ProtectedDashboardRoutes from '../auth/ProtectedDashboardRoutes';
import DashboardAccueil from './DashboardAccueil';
import DashboardDemandes from './DashboardDemandes';
import DashboardEditDemande from './DashboardEditDemande';
import DashboardEditOffre from './DashboardEditOffre';
import DashboardProfil from './DashboardEditProfil';
import DashboardEditUsers from './DashboardEditUsers';
import DashboardFicheUser from './DashboardFicheUser';
import DashboardNouveauUser from './DashboardNouveauUser';
import DashboardNouvelleDemande from './DashboardNouvelleDemande';
import DashboardNouvelleOffre from './DashboardNouvelleOffre';
import DashBoardOffreDemandeDetails from './DashboardOffreDemandeDetails';
import DashboardOffres from './DashBoardOffres';
import DashboardRegions from './DashboardRegions';
import DashboardSecteurs from './DashboardSecteurs';
import DashBoardUsers from './DashBoardUsers';



type Props = {
};

//Routage du contenu dans le dashboard
const DashboardContent: React.FC<Props> =()=>{
    const history = useHistory();
    const auth = useAuth();
    return(
        <div  style={{backgroundColor: '#F8F8F8', padding: '20px'}}>  
            <LastLocationProvider>
                {auth?.user ?
                <>
                <ProtectedDashboardRoutes path="/dashboard/accueil"><DashboardAccueil/></ProtectedDashboardRoutes>
                <ProtectedDashboardRoutes path="/dashboard/offres"><DashboardOffres/></ProtectedDashboardRoutes>
                <ProtectedDashboardRoutes path="/dashboard/demandes"><DashboardDemandes/></ProtectedDashboardRoutes>
                <ProtectedDashboardRoutes path="/dashboard/candidats"><DashBoardUsers usersType='candidats'/></ProtectedDashboardRoutes>
                <ProtectedDashboardRoutes path="/dashboard/entreprises"><DashBoardUsers usersType='entreprises'/></ProtectedDashboardRoutes>
                <ProtectedDashboardRoutes path="/dashboard/admins"><DashBoardUsers usersType='admins'/></ProtectedDashboardRoutes>
                <ProtectedDashboardRoutes path="/dashboard/profil" ><DashboardProfil history={history}/></ProtectedDashboardRoutes>
                <ProtectedDashboardRoutes path="/dashboard/secteurs"><DashboardSecteurs/></ProtectedDashboardRoutes>
                <ProtectedDashboardRoutes path="/dashboard/regions"><DashboardRegions/></ProtectedDashboardRoutes>
                <ProtectedDashboardRoutes path="/dashboard/newUser"><DashboardNouveauUser/></ProtectedDashboardRoutes>
                <ProtectedDashboardRoutes path="/dashboard/newOffre"><DashboardNouvelleOffre/></ProtectedDashboardRoutes>
                <ProtectedDashboardRoutes path="/dashboard/newDemande"><DashboardNouvelleDemande/></ProtectedDashboardRoutes>
                <ProtectedDashboardRoutes path="/dashboard/edit/candidat/:id"><DashboardEditUsers history={history}/></ProtectedDashboardRoutes>
                <ProtectedDashboardRoutes path="/dashboard/edit/entreprise/:id"><DashboardEditUsers history={history}/></ProtectedDashboardRoutes>
                <ProtectedDashboardRoutes path="/dashboard/edit/admin/:id"><DashboardEditUsers history={history}/></ProtectedDashboardRoutes>
                <ProtectedDashboardRoutes path="/dashboard/edit/offre/:id"><DashboardEditOffre history={history}/></ProtectedDashboardRoutes>
                <ProtectedDashboardRoutes path="/dashboard/edit/demande/:id"><DashboardEditDemande history={history}/></ProtectedDashboardRoutes>
                <ProtectedDashboardRoutes path="/dashboard/candidat/:id"><DashboardFicheUser  history={history}/></ProtectedDashboardRoutes>
                <ProtectedDashboardRoutes path="/dashboard/entreprise/:id"><DashboardFicheUser  history={history}/></ProtectedDashboardRoutes>
                <ProtectedDashboardRoutes path="/dashboard/admin/:id"><DashboardFicheUser  history={history}/></ProtectedDashboardRoutes>
                <ProtectedDashboardRoutes path="/dashboard/details/offre/:id"><DashBoardOffreDemandeDetails  history={history}/></ProtectedDashboardRoutes>
                <ProtectedDashboardRoutes path="/dashboard/details/demande/:id"><DashBoardOffreDemandeDetails  history={history}/></ProtectedDashboardRoutes>
                </>
                : 'loading...'
                }
            </LastLocationProvider>
        </div>
    )
}

export default DashboardContent;