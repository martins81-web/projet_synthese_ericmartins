import DateFnsUtils from '@date-io/date-fns';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { differenceInWeeks } from 'date-fns';
import { useState } from 'react';

import { updateOffreDemande } from '../../Api';
import { AccessLevel } from '../../Enum';
import { OffresDemandesType } from '../../Types';
import useAuth from '../auth/useAuth';
import SelectRegion from '../Selects/SelectRegion';
import SelectRemuneration from '../Selects/SelectRemuneration';
import SelectSecteur from '../Selects/SelectSecteur';
import SelectStagiaire from '../Selects/SelectStagiaire';

type Props = {
    history: any
};




const DashboardEditDemande: React.FC<Props> =({history})=>{
    const auth = useAuth();
    const [demande, setDemande]=useState<OffresDemandesType>(history.location.state.data) 

    const [, setUpdate]= useState<String>('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [updatingDemande, setUpdatingDemande] = useState(true);
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDemande({ ...demande, [event.target.name]: event.target.value });   
    };
    
    const handleSave = async (e:any)=>{
        e.preventDefault();
        demandeUpdated();
    }
   

    async function demandeUpdated() {
        try {
            setUpdatingDemande(true);
            const update=await updateOffreDemande(demande);
          setUpdate(update);
        } catch (e) {
        } finally {
            setUpdatingDemande(false);
            history.push('/dashboard/demandes')

        }
      }

      console.log(demande.DureeSemaines)

    return(
        <form onSubmit={(e)=>handleSave(e)}>
        <Grid container spacing={2} alignItems='center'>
            <Grid item xs={12}>
                <Typography variant='h4'>Créer une demande de stage</Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={5}>
                    <TextField
                        fullWidth
                        id="input-Titre"
                        label="Titre"
                        variant="outlined"
                        required
                        name='Titre'
                        onChange={handleChange}
                        margin='dense'
                        defaultValue={demande.Titre}
                    />
            </Grid>
            { auth?.user?.NiveauAcces===AccessLevel.admin&&
            <Grid item>
                <Grid container alignItems='flex-end' spacing={2}>
                    <Grid item>
                        <SelectStagiaire onChange={(selected)=>setDemande({ ...demande, Auteur: selected?._id||'' })} selectedId={demande.Auteur}/>
                    </Grid>
                </Grid>
            </Grid>
            }
            <Grid item >
                <Grid container alignItems='flex-end' spacing={2}>
                    <Grid item>
                        <SelectSecteur onChange={(selected)=>setDemande({ ...demande, SecteurActivite: selected?._id ||'' })} selectedId={demande.SecteurActivite}/>
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
                        onChange={handleChange}
                        margin='dense'
                        defaultValue={demande.Ville}
                    />
            </Grid>
            <Grid item>
                <SelectRegion onChange={(selected)=>setDemande({ ...demande, Region: selected?._id||''  })} selectedId={demande.Region}/>
            </Grid>
            <Grid item >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        label="Date de début"
                        format="dd/MM/yyyy"
                        value={demande.DateDebut}
                        InputAdornmentProps={{ position: "start" }}
                        onChange={(selected)=>{
                            var date: Date|null= selected;
                            setDemande({ ...demande, 
                                DateDebut: selected || new Date(), 
                                DureeSemaines: differenceInWeeks( new Date(demande?.DateFin), date || new Date())
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
                        value={demande.DateFin}
                        InputAdornmentProps={{ position: "start" }}
                        onChange={(selected)=>{
                            var date: Date|null= selected;
                            setDemande({ ...demande, 
                                DateFin: selected || new Date(), 
                                DureeSemaines: differenceInWeeks(date || new Date(), new Date(demande?.DateDebut))
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
                    margin='dense'
                    type='text'
                    //defaultValue={demande.DureeSemaines.toString()+ ' semaines'}
                    value={demande.DureeSemaines+ ' semaines'}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                    <TextField
                        fullWidth
                        id="input-heures"
                        label="Nombre d'heures par semaine"
                        type='number'
                        variant="outlined"
                        required
                        name='NombreHeuresSemaine'
                        onChange={handleChange}
                        margin='dense'
                        defaultValue={demande.NombreHeuresSemaine}
                    />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                    <SelectRemuneration onChange={(remu)=>setDemande({...demande, Remuneration: remu||''})} selected={demande.Remuneration}/>
            </Grid>
           
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    label="Description poste recherche"
                    required
                    multiline
                    rows={4}
                    variant="outlined"
                    name='Description'
                    onChange={handleChange}
                    margin='dense'
                    defaultValue={demande.Description}
                />
            </Grid>
            <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="input-Competences"
                        label="Programmes suivis"
                        type='text'
                        variant="outlined"
                        required
                        name='ProgrammesSuivi'
                        onChange={handleChange}
                        margin='dense'
                        defaultValue={demande.ProgrammesSuivi}
                    />
            </Grid>
            <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="input-Competences"
                        label="Competences acquises"
                        type='text'
                        variant="outlined"
                        name='CompetencesAcquises'
                        required
                        onChange={handleChange}
                        margin='dense'
                        defaultValue={demande.CompetencesAcquises}
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
                        rows={3}
                        onChange={handleChange}
                        defaultValue={demande.InformationsSuplementaires}

                    />
            </Grid>
            <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="input-infos"
                        label="Autres formations"
                        type='text'
                        variant="outlined"
                        name='AutresFormations'
                        multiline
                        rows={3}
                        onChange={handleChange}
                        defaultValue={demande.AutresFormations}

                    />
            </Grid>
            
            <Grid item xs={12}>
                <Grid container justify='flex-start' spacing={2}>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            type='submit'
                        >
                            <Typography variant="subtitle1">Sauvegarder la demande</Typography>
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            onClick={()=>history.push('/dashboard/demandes')}
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

export default DashboardEditDemande;
