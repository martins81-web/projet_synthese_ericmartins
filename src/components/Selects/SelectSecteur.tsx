import { FormControl, MenuItem, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';

import { fetchSecteursActivite } from '../../Api';
import { SecteursActiviteType } from '../../Types';

type Props = {
    selectedId?: string,
    onChange: (secteur: SecteursActiviteType | undefined)=>void
};

const SelectSecteur: React.FC<Props> =({selectedId,onChange})=>{
    const [secteurs, setSecteurs] = useState<SecteursActiviteType[]>([]);
    const [selectedSecteur, setSelectedsecteur] = useState<string|undefined>(selectedId);

    useEffect(()=>{
        getsecteurs();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

    const getsecteurs = async () => {
        let secteurs : SecteursActiviteType[] | undefined = await fetchSecteursActivite();
        secteurs = secteurs.filter(secteur=> secteur.Supprime===false);
        secteurs.sort((a, b) => (a.Titre > b.Titre) ? 1 : -1);

        setSecteurs(secteurs);  
    }


    const handleChange =(event: React.ChangeEvent<{ value: unknown }>)=>{
        setSelectedsecteur(event.target.value as string);
        let secteur= secteurs.find(secteur=> secteur._id===event.target.value);
        onChange(secteur);
    }


    return(
        <>
        {secteurs.length > 0?
        <FormControl style={{minWidth: '200px', maxWidth: '350px'}}>
            <TextField
                variant="outlined"
                select
                label="Secteur"
                id="selectsecteur"
                defaultValue={selectedId}
                value={selectedSecteur||""}
                onChange={(event)=>handleChange(event)}
                required
                margin='dense'

            >
                {
                secteurs.map(secteur => (
                    <MenuItem key={secteur._id} value={secteur._id}><div style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{secteur.Titre}</div></MenuItem>
                ))
                }
            </TextField> 
        </FormControl> : null
        }
       </>
    )
}

export default SelectSecteur;
