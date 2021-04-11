

import { Appel } from '../Enum';
import AppelAction from './AppelAction';
import DerniersAnnonces from './DerniersAnnonces';
import OffresVedettes from './OffresVedettes';

type Props = {
    toast:(toastType: string)=> any
};

const Accueil: React.FC<Props> =({toast})=>{

    return(
        <div data-testid="accueil-1">
            <OffresVedettes toast={(text)=>toast(text)}/>
            <DerniersAnnonces type={Appel.OFFRE} toast={(text)=>toast(text)}/> 
            <AppelAction type={Appel.OFFRE} toast={toast('offre')}/>
            <DerniersAnnonces type={Appel.DEMANDE} toast={(text)=>toast(text)}/> 
            <AppelAction type={Appel.DEMANDE} toast={toast('demande')}/> 

        </div>
    )
}

export default Accueil;