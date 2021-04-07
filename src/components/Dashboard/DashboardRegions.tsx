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

import { addRegion, fetchRegions, updateRegion } from '../../Api';
import { RegionsType } from '../../Types';

type Props = {
    
};

//Liste des regions et respective crud dans le dashboard

const DashboardSecteurs: React.FC<Props> =()=>{
    const [regions, setRegions] = useState<RegionsType[]>([]);
    const [edit, setEdit] = useState<RegionsType | undefined >(undefined);
    const [oldValue, setOldValue] = useState<string >('');
    const [update, setUpdate]= useState<String>('');
    const [updatingRegion, setUpdatingRegion] = useState(true);
    const [addingRegion, setAddingRegion] = useState(true);
    const [recherche, setRecherche]= useState<String>('');
    const [error, setError]= useState<boolean | undefined>(false);
    const [add, setAdd]= useState<RegionsType | undefined>(undefined);
    const [newRegion, setNewRegion]= useState<RegionsType>({
        Actif: true,
        Supprime: false,
        Name:'',
        _id:''
    });

    useEffect(()=>{
        getRegions();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

    const getRegions = async () => {
        let regions : RegionsType[] | undefined = await fetchRegions();
        regions = regions.filter(region=> region.Supprime===false);
        regions.sort((a, b) => (a.Name > b.Name) ? 1 : -1);

        setRegions(regions);  
    }

    
    async function regionUpdated(secteur: RegionsType) {
    try {
        setUpdatingRegion(true);
        const update=await updateRegion(secteur);
        setUpdate(update);
    } catch (e) {
    } finally {
        setUpdatingRegion(false);
        getRegions();
    }
  }

  const handleEditChange=(edit: RegionsType| undefined, region: RegionsType| undefined)=>{
    let regionOldValue: RegionsType| undefined = undefined;
    if(edit!==undefined)
    regionOldValue =regions.find(region=> region._id===edit._id);
    if(regionOldValue){
        regionOldValue.Name=oldValue;
    }
    if(region){
        setEdit(region);
    }
  }

  const handleAddRegion =(region: RegionsType)=>{
    setAdd(undefined);
    regionAdded(region);

  }

  async function regionAdded(region: RegionsType) {
    try {
        setAddingRegion(true);
        const update=await addRegion(region);
        setUpdate(update);
    } catch (e) {
    } finally {
        setAddingRegion(false);
        getRegions();
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
                            {regions.length>0 ?
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='left'><Typography variant='h6' style={{fontWeight:'bold'}}>Region</Typography></TableCell>
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
                                                   ()=> setAdd(newRegion)
                                                }
                                            >
                                                Ajouter region
                                            </Button> :
                                            <TextField  
                                                onChange={(e)=>{
                                                    add.Name=e.target.value;
                                                }}
                                                id="standard-basic" 
                                                label="Region" 
                                                fullWidth
                                                name={'Name'}
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
                                                    add && add.Name !== '' ? handleAddRegion(add): console.log('not updated');
                                                    add && add.Name !== '' ? setError(false) : setError(true);
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
                                    { regions.map(region => (
                                        region.Name.toLowerCase().includes(recherche.toLowerCase()) &&
                                    <TableRow key={region._id} hover 
                                            style={{backgroundColor: edit===region? 'PowderBlue': 'inherit'}}>
                                        <TableCell align='left'  >
                                            {
                                            edit===region?  
                                            <TextField  
                                                onChange={(e)=>{
                                                    region.Name=e.target.value;
                                                }}
                                                id="standard-basic" 
                                                defaultValue={region.Name} 
                                                label="Secteur" 
                                                fullWidth
                                                name={'Name'}
                                                required
                                                autoFocus
                                                error={error}
                                            />
                                            :
                                            region.Name
                                            }
                                        </TableCell>
                                        <TableCell align='center'>
                                            {edit===region? 
                                            <> 
                                                <Tooltip title='sauvegarder'>
                                                    <IconButton size="small" type='submit' onClick={(e) => {
                                                        e.stopPropagation();
                                                        console.log(region.Name);
                                                        region.Name !== '' ? updateRegion(region): console.log('not updated');
                                                        region.Name !== '' ? setEdit(undefined) : setError(true);
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
                                                            region.Name=oldValue;
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
                                                                edit===region? setEdit(undefined) : 
                                                                handleEditChange(edit,region);
                                                                setOldValue(region.Name);
                                                            }}
                                                    >
                                                        <EditIcon style={{color:'#3e99df'}}/>
                                                    </IconButton> 
                                                </Tooltip>
                                                <Tooltip title='supprimer'>
                                                    <IconButton size="small" onClick={(e) => {
                                                            e.stopPropagation();
                                                            region.Supprime=true;
                                                            console.log(region.Supprime);
                                                            regionUpdated(region);
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