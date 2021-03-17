import Cookies from 'js-cookie';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import useAuth from './useAuth';

interface PrivateRouteProps extends RouteProps { 

}

const PrivateRoute: React.FC<PrivateRouteProps> = ({...rest}) => { 
const auth = useAuth();
console.log(auth?.user);

const token = Cookies.get('connected');


    if (auth?.user === null && !token) return <Redirect to="/login" /> 
    else return (
            <Route {...rest} />
        )
    
};

export default PrivateRoute;