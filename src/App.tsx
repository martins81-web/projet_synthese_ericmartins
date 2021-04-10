import './App.sass';

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
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
import DetailsAnnonces from './components/DetailsAnnonces';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login';
import NousJoindre from './components/NousJoindre';
import OffresDemandes from './components/OffresDemandes';
import { Appel, Size } from './Enum';
import BGImage from './images/accueil.jpg';
import { UtilisateursType } from './Types';
import 'react-toastify/dist/ReactToastify.css';

import { toast, ToastContainer } from 'react-toastify';
import FormSubmittedMerci from './components/formSubmittedMerci';

function App() {
  const [recherche, setRecherche]= useState<string>('');

  const offre = () => toast.error(<p>Vous devez vous connecter en tant qu'<b>ENTREPRISE</b> pour pouvoir publier une offre de stage!</p>);
  const demande = () => toast.error(<p>Vous devez vous connecter en tant que <b>STAGIAIRE</b> pour pouvoir publier une demande de stage!</p>);
  const loginToast = () =>toast.error(<><h5>Erreur</h5>
    <p>Votre courriel ou votre mot de passe est invalide.
    Assurez-vous d'avoir le bon courriel et le bon mot de passe et essayez à nouveau.</p></>);

  const auth = useAuth();
  const history = useHistory();
  const location = useLocation(); 
  //console.log(location.pathname); 

  //Ça fait scrollToTop dans tous les changements de route 
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
    handleConnectionfromCookie(); //appel de la fonction qui vérifie s'il y a un cookie de connection
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  //vérifie s'il y a un cookie de connexion et fait la connexion
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
      !location.pathname.includes('/dashboard') && !location.pathname.includes('/premiereConnexion')  &&
      <Header imageURL={getImage()} 
              imgSize={!location.pathname.includes('/merci') ?Size.BIG: Size.SMALLER}
              logout={logout}
              recherche={(recherche)=>setRecherche(recherche)}
      />
      } 
      <Switch>
        <Redirect exact from="/dashboard/update" to="/dashboard"/>
        <Redirect exact from="/" to="/accueil" />
        <Route exact path="/accueil"><Accueil toast={(type)=>type==='offre'? offre: demande} /></Route>
        <Route path="/contact" component={NousJoindre}/>
        <Route path="/confidentialite" component={Confidentialite}/>
        <Route path="/apropos" component={APropos}/>
        <Route path="/accueil/offres"><OffresDemandes type={Appel.OFFRE} recherche={recherche}/></Route>
        <Route path="/accueil/offre/:id"><DetailsAnnonces history={history} type={Appel.OFFRE}/></Route>
        <Route path="/accueil/Demandes"><OffresDemandes type={Appel.DEMANDE} recherche={recherche} /></Route>
        <Route path="/accueil/demande/:id"><DetailsAnnonces history={history} type={Appel.DEMANDE}/></Route> 
        <Route exact path="/merci" component={FormSubmittedMerci}></Route>
        <PrivateRoute path="/dashboard/"><Dashboard logout={logout}/></PrivateRoute>
        <ProtectedLogin path="/login" ><Login login={true} toast={loginToast}/></ProtectedLogin>
        <ProtectedLogin path="/register" ><Login login={false}/></ProtectedLogin> 
      </Switch>
      <ToastContainer limit={1}/>

      {
      !location.pathname.includes('/dashboard') && !location.pathname.includes('/premiereConnexion') &&< Footer/>
      } 
      
      
    </>
  );
}
export default App;


