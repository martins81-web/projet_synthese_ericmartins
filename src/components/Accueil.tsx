import { Appel } from '../Enum';
import AppelAction from './AppelAction';
import DerniersAnnonces from './DerniersAnnonces';
import OffresVedettes from './OffresVedettes';

type Props = {
    
};

const Accueil: React.FC<Props> =()=>{
    return(
        <>
            <OffresVedettes/>
            <DerniersAnnonces type={Appel.OFFRE}/>
            <AppelAction type={Appel.OFFRE}/>
            <DerniersAnnonces type={Appel.DEMANDE}/>
            <AppelAction type={Appel.DEMANDE}/>
        </>
    )
}

export default Accueil;