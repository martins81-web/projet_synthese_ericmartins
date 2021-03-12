import './App.css';

import { Redirect, Route, Switch } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Accueil from './components/Accueil';
import APropos from './components/APropos';
import Confidentialite from './components/Confidentialite';
import Footer from './components/Footer';
import Header from './components/Header';
import NousJoindre from './components/NousJoindre';
import BGImage from './images/accueil.png';


export enum Size {
  SMALL = 400,
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
    <Header imageURL={getImage()} 
            imgSize={location.pathname === "/accueil" ? Size.BIG : Size.SMALL}
    />
    <Switch>
      <Redirect exact from="/" to="/accueil" />
      <Route path="/" exact component={Accueil}/>
      <Route path="/accueil" component={Accueil}/>
      <Route path="/contact" component={NousJoindre}/>
      <Route path="/confidentialite" component={Confidentialite}/>
      <Route path="/apropos" component={APropos}/>
    </Switch>
    <Footer/>
    </>
  );
}
export default App;

