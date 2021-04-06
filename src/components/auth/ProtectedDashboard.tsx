import Cookies from 'js-cookie';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import useAuth from './useAuth';

interface ProtectedDashboardProps extends RouteProps { 

}

const ProtectedLogin: React.FC<ProtectedDashboardProps> = ({...rest}) => {
     
const auth = useAuth();
//console.log(auth?.user);

const token = Cookies.get('connected');



if (auth?.user !== null && token ) {
       return <Redirect to="/dashboard"></Redirect>;
}
return (
        <Route {...rest} />
    )
    
};

export default ProtectedLogin;