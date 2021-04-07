import Cookies from 'js-cookie';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import useAuth from './useAuth';

interface PrivateRouteProps extends RouteProps { 

}



const PrivateRoute: React.FC<PrivateRouteProps> = ({...rest}) => { 
const auth = useAuth();
//console.log(auth?.user);

const token = Cookies.get('connected');

//Private route utilisé pour le dashboard - si pas d'utilisateur connecté redirectionne vers login sinon ça continue son chemin 
    if (auth?.user === null && !token) return <Redirect to="/login" /> 
    else return (
            <Route {...rest} />
        )
    
};

export default PrivateRoute;