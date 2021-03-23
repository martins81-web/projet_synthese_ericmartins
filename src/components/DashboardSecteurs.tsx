import {
    Grid,
    IconButton,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import SearchIcon from '@material-ui/icons/Search';
import { useEffect, useState } from 'react';

import { fetchSecteursActivite, updateSecteurActivite } from '../Api';
import { SecteursActiviteType } from '../Types';

type Props = {
    
};


const DashboardSecteurs: React.FC<Props> =()=>{
    const [secteursActivites, setSecteursActivites] = useState<SecteursActiviteType[]>([]);
    const [edit, setEdit] = useState<SecteursActiviteType | undefined >(undefined);
    const [oldValue, setOldValue] = useState<string >('');
    const [update, setUpdate]= useState<String>('');
    const [updatingSecteur, setUpdatingSecteur] = useState(true);
    const [recherche, setRecherche]= useState<String>('');


    useEffect(()=>{
        getSecteursActivites();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

    const getSecteursActivites = async () => {
        let secteursActivites : SecteursActiviteType[] | undefined = await fetchSecteursActivite();
        secteursActivites = secteursActivites.filter(secteur=> secteur.Supprime===false)
        setSecteursActivites(secteursActivites);
    }

    
async function secteurUpdated(secteur: SecteursActiviteType) {
    try {
        setUpdatingSecteur(true);
        const update=await updateSecteurActivite(secteur);
        setUpdate(update);
    } catch (e) {
    } finally {
        setUpdatingSecteur(false);
        getSecteursActivites();
    }
  }

  const handleEditChange=(edit: SecteursActiviteType| undefined, secteur: SecteursActiviteType| undefined)=>{
    let secteurOldValue: SecteursActiviteType| undefined = undefined;
    if(edit!==undefined)
    secteurOldValue =secteursActivites.find(secteur=> secteur._id===edit._id);
    if(secteurOldValue){
        secteurOldValue.Titre=oldValue;
    }
    if(secteur)
    setEdit(secteur);
  }

    return(
        <Grid container justify='center' style={{marginBottom: '100px'}}>
            <Grid item style={{padding: '20px', backgroundColor: 'whitesmoke'}}>
            <Grid container direction='column' spacing={3} alignItems='center' >
                <Grid item>
                        <TextField
                            label="Rechercher"
                            onChange={(e)=>setRecherche(e.target.value)}
                            InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                        <SearchIcon/>
                                </InputAdornment>
                            )
                            }}
                            variant="outlined"
                        />
                </Grid>
                <Grid item>
                    <Grid container >
                        <Grid item>
                            {secteursActivites.length>0 ?
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='left'><Typography variant='h6' style={{fontWeight:'bold'}}>Secteur d'activité</Typography></TableCell>
                                        <TableCell align='center'><Typography variant='h6' style={{fontWeight:'bold'}}>Actions</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    { secteursActivites.map(secteur => (
                                        secteur.Titre.toLowerCase().includes(recherche.toLowerCase()) &&
                                    <TableRow key={secteur._id} hover 
                                            style={{backgroundColor: edit===secteur? 'PowderBlue': 'inherit'}}>
                                        <TableCell align='left'  >
                                            {
                                            edit===secteur?  
                                            <TextField  
                                                onChange={(e)=>{
                                                    secteur.Titre=e.target.value;
                                                }}
                                                id="standard-basic" 
                                                defaultValue={secteur.Titre} 
                                                label="Secteur" 
                                                fullWidth
                                                name={'Titre'}
                                                required
                                                autoFocus
                                            />
                                            :
                                            secteur.Titre
                                            }
                                        </TableCell>
                                        <TableCell align='center'>
                                            {edit===secteur? 
                                            <> 
                                                <Tooltip title='sauvegarder'>
                                                    <IconButton size="small" onClick={(e) => {
                                                        e.stopPropagation();
                                                        updateSecteurActivite(secteur);
                                                        setEdit(undefined);
                                                        }}
                                                    >
                                                        <SaveIcon style={{color:'seagreen'}}/>
                                                    </IconButton>
                                                </Tooltip> 
                                                <Tooltip title='Annuler'>
                                                    <IconButton size="small" 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setEdit(undefined);
                                                            secteur.Titre=oldValue;
                                                        }}
                                                    >
                                                        <CancelIcon style={{color: 'crimson'}}/>
                                                    </IconButton> 
                                                </Tooltip> 
                                            </> : 
                                            <>
                                                <Tooltip title='éditer'>
                                                    <IconButton size="small" 
                                                        onClick={(e) => {
                                                                e.stopPropagation();
                                                                edit===secteur? setEdit(undefined) : 
                                                                handleEditChange(edit,secteur);
                                                                setOldValue(secteur.Titre);
                                                            }}
                                                    >
                                                        <EditIcon style={{color:'#3e99df'}}/>
                                                    </IconButton> 
                                                </Tooltip>
                                                <Tooltip title='supprimer'>
                                                    <IconButton size="small" onClick={(e) => {
                                                            e.stopPropagation();
                                                            secteur.Supprime=true;
                                                            console.log(secteur.Supprime);
                                                            secteurUpdated(secteur);
                                                        }}>
                                                        <DeleteIcon style={{color: 'crimson'}}/>
                                                    </IconButton>
                                                </Tooltip> 
                                            </>
                                            } 
                                        </TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            :null
                            }  
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            </Grid>
        </Grid>
    )
}

export default DashboardSecteurs;