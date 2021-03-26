import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';

import { fetchUtilisateurs } from '../../Api';
import { UtilisateursType } from '../../Types';

type Props = {
    selectedId?: string,
    onChange: (stagiaire: UtilisateursType | undefined)=>void
};

const SelectStagiaire: React.FC<Props> =({selectedId,onChange})=>{
    const [stagiaires, setStagiaires] = useState<UtilisateursType[]>([]);
    const [selectedStagiaire, setSelectedStagiaire] = useState<string|undefined>(selectedId);

    useEffect(()=>{
        getstagiaires();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

    const getstagiaires = async () => {
        let stagiaires : UtilisateursType[] | undefined = await fetchUtilisateurs();
        stagiaires = stagiaires.filter(stagiaire=> stagiaire.Supprime===false && stagiaire.Entreprise===false);
        stagiaires.sort((a, b) => (a.Nom > b.Nom) ? 1 : -1);

        setStagiaires(stagiaires);  
    }


    const handleChange =(event: React.ChangeEvent<{ value: unknown }>)=>{
        setSelectedStagiaire(event.target.value as string);
        let stagiaire= stagiaires.find(stagiaire=> stagiaire._id===event.target.value);
        onChange(stagiaire);
    }

    const NomComplet =(stagiaire:UtilisateursType )=>{
        return stagiaire.Prenom+" "+stagiaire.Nom;
    }

    return(
        <>
        {stagiaires.length > 0?
        <FormControl style={{minWidth: '200px'}}>
            <InputLabel id="selectstagiaireLabel">stagiaire</InputLabel>
            <Select
                displayEmpty
                labelId="selectstagiaireLabel"
                id="selectstagiaire"
                value={selectedStagiaire||""}
                onChange={(event)=>handleChange(event)}
            >
                {
                stagiaires.map(stagiaire => (
                    <MenuItem key={stagiaire._id} value={stagiaire._id}>{NomComplet(stagiaire)}</MenuItem>
                ))
                }
            </Select> 
        </FormControl> : null
        }
       </>
    )
}

export default SelectStagiaire;
