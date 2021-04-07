/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Button,
    FormGroup,
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
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import SearchIcon from '@material-ui/icons/Search';
import { useEffect, useState } from 'react';

import { addSecteurActivite, fetchSecteursActivite, updateSecteurActivite } from '../../Api';
import { SecteursActiviteType } from '../../Types';

type Props = {
    
};

//Liste des secteurs et respective crud dans le dashboard
const DashboardSecteurs: React.FC<Props> =()=>{
    const [secteursActivites, setSecteursActivites] = useState<SecteursActiviteType[]>([]);
    const [edit, setEdit] = useState<SecteursActiviteType | undefined >(undefined);
    const [oldValue, setOldValue] = useState<string >('');
    const [update, setUpdate]= useState<String>('');
    const [updatingSecteur, setUpdatingSecteur] = useState(true);
    const [addingSecteur, setAddingSecteur] = useState(true);
    const [recherche, setRecherche]= useState<String>('');
    const [error, setError]= useState<boolean | undefined>(false);
    const [add, setAdd]= useState<SecteursActiviteType | undefined>(undefined);
    const [newSecteur, setNewSecteur]= useState<SecteursActiviteType>({
        Actif: true,
        Supprime: false,
        Titre:'',
        _id:''
    });

    useEffect(()=>{
        getSecteursActivites();
      // eslint-disable-next-line react-hooks/exhaustive-deps
     
      },[])

    const getSecteursActivites = async () => {
        let secteursActivites : SecteursActiviteType[] | undefined = await fetchSecteursActivite();
        secteursActivites = secteursActivites.filter(secteur=> secteur.Supprime===false);
        secteursActivites.sort((a, b) => (a.Titre > b.Titre) ? 1 : -1);

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
    if(secteur){
        setEdit(secteur);
    }
  }

  const handleAddSecteurActivite =(secteur: SecteursActiviteType)=>{
    setAdd(undefined);
    secteurAdded(secteur);

  }

  async function secteurAdded(secteur: SecteursActiviteType) {
    try {
        setAddingSecteur(true);
        const update=await addSecteurActivite(secteur);
        setUpdate(update);
    } catch (e) {
    } finally {
        setAddingSecteur(false);
        getSecteursActivites();
    }
  }

    return(
        <FormGroup >
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
                                    <TableRow>
                                        <TableCell colSpan={add?1:2}>
                                            { !add ?
                                            <Button 
                                                variant="outlined" 
                                                color="primary"  
                                                startIcon={<AddIcon />}
                                                onClick={
                                                   ()=> setAdd(newSecteur)
                                                }
                                            >
                                                Ajouter secteur d'activité
                                            </Button> :
                                            <TextField  
                                                onChange={(e)=>{
                                                    add.Titre=e.target.value;
                                                }}
                                                id="standard-basic" 
                                                label="Secteur" 
                                                fullWidth
                                                name={'Titre'}
                                                required
                                                autoFocus
                                                error={error}
                                            />
                                            }
                                        </TableCell>
                                        { add ?
                                        <TableCell>
                                            <Tooltip title='sauvegarder'>
                                                <IconButton size="small" type='submit' onClick={(e) => {
                                                    e.stopPropagation();
                                                    add && add.Titre !== '' ? handleAddSecteurActivite(add): console.log('not updated');
                                                    add && add.Titre !== '' ? setError(false) : setError(true);
                                                    }}
                                                >
                                                    <SaveIcon style={{color:'seagreen'}}/>
                                                </IconButton>
                                            </Tooltip> 
                                            <Tooltip title='Annuler'>
                                                <IconButton size="small" 
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setAdd(undefined);
                                                    }}
                                                >
                                                    <CancelIcon style={{color: 'crimson'}}/>
                                                </IconButton> 
                                            </Tooltip> 
                                        </TableCell> : null
                                    }      
                                    </TableRow>
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
                                                error={error}
                                            />
                                            :
                                            secteur.Titre
                                            }
                                        </TableCell>
                                        <TableCell align='center'>
                                            {edit===secteur? 
                                            <> 
                                                <Tooltip title='sauvegarder'>
                                                    <IconButton size="small" type='submit' onClick={(e) => {
                                                        e.stopPropagation();
                                                        console.log(secteur.Titre);
                                                        secteur.Titre !== '' ? updateSecteurActivite(secteur): console.log('not updated');
                                                        secteur.Titre !== '' ? setEdit(undefined) : setError(true);
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
        </FormGroup >
    )
}

export default DashboardSecteurs;