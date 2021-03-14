import './App.css';

import { Redirect, Route, Switch } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Accueil from './components/Accueil';
import APropos from './components/APropos';
import PrivateRoute from './components/auth/PrivateRoute';
import ProtectedLogin from './components/auth/ProtectedLogin';
import Confidentialite from './components/Confidentialite';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login';
import NousJoindre from './components/NousJoindre';
import BGImage from './images/accueil.jpg';


export enum Size {
  SMALL = 300,
  BIG = 800
}

export enum Appel {
  DEMANDE = 'demande',
  OFFRE = 'offre'
}

function App() {
  const location = useLocation(); 
  //console.log(location.pathname); 

  const getImage = ()=>{
    if(location.pathname === "/accueil")
    return BGImage;
    else return BGImage;
  }
  
  return (
    <>
      {
      location.pathname !== "/dashboard" &&
      <Header imageURL={getImage()} 
              imgSize={location.pathname === "/accueil" ? Size.BIG : Size.SMALL}
      />
      }
      
      <Switch>
        <Redirect exact from="/" to="/accueil" />
        <Route path="/accueil" component={Accueil}/>
        <Route path="/contact" component={NousJoindre}/>
        <Route path="/confidentialite" component={Confidentialite}/>
        <Route path="/apropos" component={APropos}/>
        <PrivateRoute path="/dashboard"  component={Dashboard} />
        <PrivateRoute path="/dashboard/:id"  component={Dashboard} />
        <ProtectedLogin path="/login"  component={Login} />
      </Switch>
      {
      location.pathname !== "/dashboard" && < Footer/>
      }
      
    </>
  );
}
export default App;


