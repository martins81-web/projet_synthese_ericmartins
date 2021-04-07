import { Redirect, Route, RouteProps } from 'react-router-dom';

import useAuth from './useAuth';

interface ProtectedLoginProps extends RouteProps { 

}

const ProtectedLogin: React.FC<ProtectedLoginProps> = ({...rest}) => {
     
const auth = useAuth();
//console.log(auth?.user);

// utilisé quand on essaye d'acceder au composant login, si utilisateur la route redirectionne vers le dashboard sinon ça va vers login
if (auth?.user !== null) {
       return <Redirect to="/dashboard/" />;
}
return (
        <Route {...rest} />
    )
    
};

export default ProtectedLogin;