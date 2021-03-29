import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';

import { fetchUtilisateurs } from '../../Api';
import { UtilisateursType } from '../../Types';

type Props = {
    selectedId?: string,
    onChange: (entreprise: UtilisateursType | undefined)=>void
};

const SelectEntreprise: React.FC<Props> =({selectedId,onChange})=>{
    const [entreprises, setEntreprises] = useState<UtilisateursType[]>([]);
    const [selectedEntreprise, setSelectedEntreprise] = useState<string|undefined>(selectedId);

    useEffect(()=>{
        getEntreprises();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

    const getEntreprises = async () => {
        let entreprises : UtilisateursType[] | undefined = await fetchUtilisateurs();
        entreprises = entreprises.filter(entreprise=> entreprise.Supprime===false && entreprise.Entreprise);
        entreprises.sort((a, b) => (a.NomEntreprise > b.NomEntreprise) ? 1 : -1);

        setEntreprises(entreprises);  
    }


    const handleChange =(event: React.ChangeEvent<{ value: unknown }>)=>{
        setSelectedEntreprise(event.target.value as string);
        let entreprise= entreprises.find(entreprise=> entreprise._id===event.target.value);
        onChange(entreprise);
    }


    return(
        <>
        {entreprises.length > 0?
        <FormControl style={{minWidth: '200px'}}>
            <InputLabel id="selectEntrepriseLabel">Entreprise</InputLabel>
            <Select
                displayEmpty
                defaultValue={selectedId}
                labelId="selectEntrepriseLabel"
                id="selectEntreprise"
                value={selectedEntreprise||""}
                onChange={(event)=>handleChange(event)}
            >
                {
                entreprises.map(entreprise => (
                    <MenuItem key={entreprise._id} value={entreprise._id}>{entreprise.NomEntreprise}</MenuItem>
                ))
                }
            </Select> 
        </FormControl> : null
        }
       </>
    )
}

export default SelectEntreprise;

