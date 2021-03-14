import { Redirect, Route, RouteProps } from 'react-router-dom';

import useAuth from './useAuth';

interface PrivateRouteProps extends RouteProps { 

}

const PrivateRoute: React.FC<PrivateRouteProps> = ({...rest}) => { 
const auth = useAuth();
//console.log(auth?.user);

if (auth?.user === null) return <Redirect to="/login" /> 
return (
        <Route {...rest} />
    )
    
};

export default PrivateRoute;