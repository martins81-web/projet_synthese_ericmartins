import { Grid } from '@material-ui/core';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

import { fetchOffresDemandes } from '../Api';
import { Appel } from '../Enum';
import { OffresDemandesType } from '../Types';
import CardDernieresAnnonces from './CardDernieresAnnonces';



type Props = {
    type: Appel
    selectedSecteurID?: string| undefined, 
    selectedRegionID?:  string| undefined,
    recherche: string,
    toast: (text: string)=> void

};

const ListOffresDemandes: React.FC<Props> =({type, selectedSecteurID, selectedRegionID,recherche, toast})=>{
    const [offresDemandes, setOffresDemandes] = useState<OffresDemandesType[]>([]);
    useEffect(()=>{
        getOffresDemandes();
       
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

    
    const getOffresDemandes = async () => {
        let offresDemandes : OffresDemandesType[] | undefined = await fetchOffresDemandes();
        // Filtre les offres valides
        offresDemandes = offresDemandes.filter(offreDemande=> offreDemande.Supprime===false  && offreDemande.Valide );
        // Trié par date
        offresDemandes.sort((a, b) => (a.DateParution < b.DateParution) ? 1 : -1);
        // Garde juste les 4 offre vedettes les plus récentes
        //console.log(offresDemandes);
        setOffresDemandes(offresDemandes);  
    }
    return(
        <Grid container spacing={3}>
            {offresDemandes.map( offreDemande => (
                offreDemande.SecteurActivite.includes(selectedSecteurID||"") && offreDemande.Region.includes(selectedRegionID||"") &&
                offreDemande.Titre.toLowerCase().includes(recherche.toLowerCase()) && offreDemande.Type===type &&
                <Grid item xs={12} key={offreDemande._id}>
                    <CardDernieresAnnonces type={type} offreDemande={offreDemande}  toast={(text)=>toast(text)}/>
                </Grid>
            ))}
        </Grid>
    )
}

export default ListOffresDemandes;


export const Wrapper = styled.div`
    

    
`