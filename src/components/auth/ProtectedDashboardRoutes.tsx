import Cookies from 'js-cookie';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import useAuth from './useAuth';

interface ProtectedDashboardProps extends RouteProps { 

}

const ProtectedDashboardRoutes: React.FC<ProtectedDashboardProps> = ({...rest}) => {
     
const auth = useAuth();
//console.log(auth?.user);

const token = Cookies.get('connected');

if (!token ) {
       return <Redirect to="/accueil"></Redirect>;
}
return (
        <Route {...rest} />
    )
    
};

export default ProtectedDashboardRoutes;