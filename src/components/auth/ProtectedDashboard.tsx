import { Redirect, Route, RouteProps } from 'react-router-dom';

import PremierConnexion from '../Dashboard/PremierConnexion';
import useAuth from './useAuth';

interface ProtectedDashboardProps extends RouteProps { 

}

const ProtectedLogin: React.FC<ProtectedDashboardProps> = ({...rest}) => {
     
const auth = useAuth();
//console.log(auth?.user);




if (auth?.user !== null ) {
       return <Redirect to="/dashboard"></Redirect>;
}
return (
        <Route {...rest} />
    )
    
};

export default ProtectedLogin;