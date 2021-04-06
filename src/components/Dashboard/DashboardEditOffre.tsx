import DateFnsUtils from '@date-io/date-fns';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { differenceInWeeks } from 'date-fns';
import { useState } from 'react';

import { updateOffreDemande } from '../../Api';
import { AccessLevel } from '../../Enum';
import { OffresDemandesType } from '../../Types';
import useAuth from '../auth/useAuth';
import SelectEntreprise from '../Selects/SelectEntreprise';
import SelectRegion from '../Selects/SelectRegion';
import SelectSecteur from '../Selects/SelectSecteur';

type Props = {
    history: any
};



const DashboardEditOffre: React.FC<Props> =({history})=>{
    const auth = useAuth();
    const [offre, setOffre]=useState<OffresDemandesType>(history.location.state.data) 

    const [, setUpdate]= useState<String>('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [updatingOffre, setUpdatingOffre] = useState(true);


 
   
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOffre({ ...offre, [event.target.name]: event.target.value });   
    }

   
    
    const handleChangeCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOffre({ ...offre, [event.target.name]: event.target.checked });
    }; 


    const handleSave = async (e:any)=>{
        e.preventDefault();
        OffreUpdated();
    }
    
    async function OffreUpdated() {
        try {
            setUpdatingOffre(true);
            const update=await updateOffreDemande(offre);
          setUpdate(update);
        } catch (e) {
        } finally {
            setUpdatingOffre(false);
            history.push('/dashboard/offres')

        }
      }
  
    return(
    <form onSubmit={(e)=>handleSave(e)}>
        <Grid container spacing={3} alignItems='center'>
            <Grid item xs={12}>
                <Typography variant='h4'>Édition offre de stage</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={5}>
                    <TextField
                        fullWidth
                        id="input-Titre"
                        label="Titre"
                        variant="outlined"
                        required
                        defaultValue={offre.Titre}
                        name='Titre'
                        onChange={handleChange}
                        margin='dense'

                    />
            </Grid>
            { auth?.user?.NiveauAcces===AccessLevel.admin&&
            <Grid item>
                <Grid container alignItems='flex-end' spacing={2}>
                    <Grid item>
                        <SelectEntreprise onChange={(selected)=>setOffre({ ...offre, Auteur: selected?._id || '' })} selectedId={offre.Auteur}/>
                    </Grid>
                </Grid>
            </Grid>
            }
            <Grid item >
                <Grid container alignItems='flex-end' spacing={2}>
                    <Grid item>
                        <SelectSecteur onChange={(selected)=>setOffre({ ...offre, SecteurActivite: selected?._id || ''})} selectedId={offre.SecteurActivite}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={10}>
                    <TextField
                        fullWidth
                        id="input-Ville"
                        label="Ville"
                        variant="outlined"
                        required
                        name='Ville'
                        defaultValue={offre.Ville}
                        onChange={handleChange}
                        margin='dense'

                    />
            </Grid>
            <Grid item>
                <SelectRegion onChange={(selected)=>setOffre({ ...offre, Region: selected?._id||'' })} selectedId={offre.Region}/>
            </Grid>
            <Grid item >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        label="Date de début"
                        format="dd/MM/yyyy"
                        value={offre.DateDebut}
                        InputAdornmentProps={{ position: "start" }}
                        onChange={(selected)=>{
                            var date: Date|null= selected;
                            setOffre({ ...offre, 
                                DateDebut: selected || new Date(), 
                                DureeSemaines: differenceInWeeks( new Date(offre?.DateFin), date || new Date())
                            }); 
                        }}
                        margin='dense'

                    />
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid item >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        label="Date de fin"
                        format="dd/MM/yyyy"
                        value={offre.DateFin}
                        InputAdornmentProps={{ position: "start" }}
                        onChange={(selected)=>{
                            var date: Date|null= selected;
                            setOffre({ ...offre, 
                                DateFin: selected || new Date(), 
                                DureeSemaines: differenceInWeeks(date || new Date(), new Date(offre?.DateDebut))
                            }); 
                        }}
                        margin='dense'

                    />
                </MuiPickersUtilsProvider>
            </Grid>
            <Grid item>
                <TextField
                    fullWidth
                    id="input-duree"
                    placeholder="Durée en semaines"
                    variant="outlined"
                    required
                    type='string'
                    value={offre.DureeSemaines+ ' semaines'}
                    margin='dense'

                />
            </Grid>
        
            <Grid item xs={12} sm={12} md={5}>
                    <TextField
                        fullWidth
                        id="input-heures"
                        label="Nombre d'heures par semaine"
                        type='number'
                        variant="outlined"
                        required
                        defaultValue={offre.NombreHeuresSemaine}
                        name='NombreHeuresSemaine'
                        onChange={handleChange}
                        margin='dense'

                    />
            </Grid>
            <Grid item xs={5}> 
                <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item xs={12}><b>Possibilité d'emploi aprés le stage?</b> </Grid>
                    <Grid item> Non</Grid>
                    <Grid item>
                        <Switch
                                    checked={offre.EmploiApresStage}
                                    onChange={handleChangeCheck}
                                    name="EmploiApresStage"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                        </Grid>
                    <Grid item>Oui</Grid>
                </Grid>    
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    defaultValue={offre.Description}
                    variant="outlined"
                    name='Description'
                    onChange={handleChange}
                    margin='dense'

                />
            </Grid>
            
            <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="input-Competences"
                        label="Competences recherches"
                        type='text'
                        variant="outlined"
                        required
                        defaultValue={offre.CompetencesRecherches}
                        name='CompetencesRecherches'
                        onChange={handleChange}
                        margin='dense'

                    />
            </Grid>
            <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="input-infos"
                        label="Informations suplementaires"
                        type='text'
                        variant="outlined"
                        multiline
                        name='InformationsSuplementaires'
                        defaultValue={offre.InformationsSuplementaires}
                        rows={3}
                        onChange={handleChange}
                        margin='dense'

                    />
            </Grid>
            <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="input-infos"
                        label="Rémunération"
                        type='text'
                        variant="outlined"
                        multiline
                        rows={3}
                        defaultValue={offre.Remuneration}
                        name='Remuneration'
                        onChange={handleChange}
                        margin='dense'

                    />
            </Grid>
            { auth?.user?.NiveauAcces===AccessLevel.admin&&
            <Grid item > 
                <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item xs={12}><b>Offre de stage vedette?</b> </Grid>
                    <Grid item> Non</Grid>
                    <Grid item>
                        <Switch
                                    checked={offre.Vedette}
                                    onChange={handleChangeCheck}
                                    name="Vedette"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                />
                        </Grid>
                    <Grid item>Oui</Grid>
                </Grid>    
            </Grid>
            }
            <Grid item xs={12}>
                <Grid container justify='flex-start' spacing={2}>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            type='submit'
                        >
                            <Typography variant="subtitle1">Sauvegarder l'offre</Typography>
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            onClick={()=>history.push('/dashboard/offres')}
                        >
                            <Typography variant="subtitle1">Annuler</Typography>
                        </Button>
                    </Grid>
                </Grid> 
            </Grid>
        </Grid>                  
    </form>
    )
}

export default DashboardEditOffre;
