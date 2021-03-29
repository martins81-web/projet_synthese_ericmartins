import { Chip, FormControl, Input, InputLabel, MenuItem, Select } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';

import { fetchSecteursActivite } from '../../Api';
import { SecteursActiviteType } from '../../Types';



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: '45vw',
    },
  },
};


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 250,
      maxWidth: '45vw',
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
    input: {
        "&:invalid": {
          border: "red solid 2px"
        }
      }
  }),
);

type Props = {
    selectedIds?: string[],
    onChange: (secteursIds: string[] | undefined )=>void
};

const SelectSecteur: React.FC<Props> =({selectedIds,onChange})=>{
    const [secteursActivites, setSecteursActivites] = useState<SecteursActiviteType[]>([]);
    const [selected, setSelected] = useState<string[]>(selectedIds|| []);
    const classes = useStyles();
    onChange(selected);

    useEffect(()=>{
        getsecteurs();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

    const getsecteurs = async () => {
        let secteurs : SecteursActiviteType[] | undefined = await fetchSecteursActivite();
        secteurs = secteurs.filter(secteur=> secteur.Supprime===false);
        secteurs.sort((a, b) => (a.Titre > b.Titre) ? 1 : -1);

        setSecteursActivites(secteurs);  
    }



    const getTitres =(ids: string[])=>{
        let titres: string[]=[];
        // eslint-disable-next-line array-callback-return
        secteursActivites.map(secteur=> {
            // eslint-disable-next-line array-callback-return
            ids.map(id=>{
                if(secteur._id===id)
                titres.push(secteur.Titre);
            })
        })
        return titres;
    }


    return(
        <>
        {secteursActivites.length > 0 &&
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-chip-label">Secteurs d'activités</InputLabel>
            <Select
            labelId="demo-mutiple-chip-label"
            id="demo-mutiple-chip"
            multiple
            value={selected}
            onChange={(e)=>{
                setSelected(e.target.value as string[])
            }}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected) => (
                <div className={classes.chips}>
                {(getTitres(selected as string[]) as string[]).map((value) => (
                    <Chip key={value} label={value} className={classes.chip}/>
                ))}
                </div>
            )}
            MenuProps={MenuProps}
            >
            {secteursActivites.map((secteur) => (
                <MenuItem key={secteur._id} value={secteur._id}>
                    {secteur.Titre}     
                </MenuItem>
            ))}
            </Select>
       </FormControl> 
        }
       </>
    )
}

export default SelectSecteur;

 