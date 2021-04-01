import './App.sass';

import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useLayoutEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { fetchUtilisateurs } from './Api';
import Accueil from './components/Accueil';
import APropos from './components/APropos';
import PrivateRoute from './components/auth/PrivateRoute';
import ProtectedLogin from './components/auth/ProtectedLogin';
import useAuth from './components/auth/useAuth';
import Confidentialite from './components/Confidentialite';
import Dashboard from './components/Dashboard/Dashboard';
import PremierConnexion from './components/Dashboard/PremierConnexion';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login';
import NousJoindre from './components/NousJoindre';
import OffresDemandes from './components/OffresDemandes';
import { Appel, Size } from './Enum';
import BGImage from './images/accueil.jpg';
import { UtilisateursType } from './Types';

function App() {

  const auth = useAuth();
  const history = useHistory();
  const location = useLocation(); 
  //console.log(location.pathname); 

  //Ça fait scrollToTop on all route changes
  useLayoutEffect(() => {
    if(location.pathname!=='/login' && location.pathname!=='/register')
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const getImage = ()=>{
    if(location.pathname === "/accueil")
    return BGImage;
    else return BGImage;
  }

  const logout = () => {
    //console.log('logout');
    Cookies.remove('connected');
    auth?.signOut();
    history.push('/accueil');
  }

  useEffect(()=>{
    handleConnectionfromCookie();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleConnectionfromCookie = async () => {
    const token = Cookies.get('connected');
    //console.log(token);
    const utilisateurs : UtilisateursType[] | undefined = await fetchUtilisateurs();
    const utilisateur=utilisateurs.find(utilisateur => utilisateur._id === token);

    if (utilisateur) {
        auth?.signIn(utilisateur);
        Cookies.set('connected', utilisateur._id);  
    }
  
  }



  return (
    <>
      {
      !location.pathname.includes('/dashboard') && !location.pathname.includes('/premiereConnexion') &&
      <Header imageURL={getImage()} 
              imgSize={Size.BIG}
              logout={logout}
      />
      } 
      <Switch >

        <Redirect exact from="/dashboard/update" to="/dashboard"/>
        <Redirect exact from="/" to="/accueil" />
        <Route exact path="/accueil" component={Accueil}/>
        <Route path="/contact" component={NousJoindre}/>
        <Route path="/confidentialite" component={Confidentialite}/>
        <Route path="/apropos" component={APropos}/>
        <Route path="/accueil/offres"><OffresDemandes type={Appel.OFFRE}/></Route>
        <Route  path="/accueil/Demandes"><OffresDemandes type={Appel.DEMANDE}/></Route>
        <Route path="/premiereConnexion"><PremierConnexion/></Route>
        <PrivateRoute path="/dashboard/"><Dashboard logout={logout}/></PrivateRoute>
        <ProtectedLogin path="/login" ><Login login={true}/></ProtectedLogin>
        <ProtectedLogin path="/register" ><Login login={false}/></ProtectedLogin>
      </Switch>
    
      {
      !location.pathname.includes('/dashboard') && !location.pathname.includes('/premiereConnexion') &&< Footer/>
      } 
      
      
    </>
  );
}
export default App;


