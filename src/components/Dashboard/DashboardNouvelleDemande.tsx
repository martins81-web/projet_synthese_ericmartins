import DateFnsUtils from '@date-io/date-fns';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { differenceInWeeks } from 'date-fns';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLastLocation } from 'react-router-last-location';

import { addOffreDemande } from '../../Api';
import { AccessLevel } from '../../Enum';
import { OffresDemandesType } from '../../Types';
import useAuth from '../auth/useAuth';
import SelectRegion from '../Selects/SelectRegion';
import SelectRemuneration from '../Selects/SelectRemuneration';
import SelectSecteur from '../Selects/SelectSecteur';
import SelectStagiaire from '../Selects/SelectStagiaire';

type Props = {
};

interface State {
    Titre: string,
    SecteursActivite: string|undefined,
    Ville: string,
    Region: string|undefined,
    DateDebut: Date|null,
    DateFin: Date|null,
    Auteur:string|undefined,
    DureeStage: string,
    Description: string,
    NombreHeuresSemaine: number|undefined,
    ProgrammesSuivi:string,
    CompetencesAcquises: string,
    InformationsSuplementaires: string,
    AutresFormations: string,
    DateParution: Date, 
    DureeSemaines: number, 
    TypeStage: string,
    Remuneration: string
 }

//formulaire de création d'une nouvelle demande de stage
const DashboardNouvelleDemande: React.FC<Props> =()=>{
    const history= useHistory();
    const auth = useAuth();

    const [, setUpdate]= useState<String>('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [updatingDemande, setUpdatingDemande] = useState(true);
    const lastLocation = useLastLocation();

    const [values, setValues] = useState<State>({
        Titre: "",
        SecteursActivite: undefined,
        Ville: "",
        Region: undefined,
        DateDebut: null,
        DateFin: null,
        Auteur:auth?.user?.NiveauAcces===AccessLevel.stagiaire ? auth?.user._id: undefined,
        DureeStage: "",
        Description: "",
        NombreHeuresSemaine: 0,
        ProgrammesSuivi:"",
        CompetencesAcquises: "",
        InformationsSuplementaires: "",
        AutresFormations: "",
        DateParution: new Date(), 
        DureeSemaines: 0, 
        TypeStage: "",
        Remuneration:""
      });

   
    

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
        
    };
    
   


    const handleCreation= async (e:any)=>{
        e.preventDefault();
        console.log('created');
        let dif;
        if(values.DateFin!==null &&values.DateDebut!==null){
        dif= differenceInWeeks(values?.DateFin,values?.DateDebut);
        setValues({ ...values, DureeSemaines: dif,
            DureeStage: dif?.toString()+" semaines" 
        });
        }

        //console.log(dif);

        let nouvelleOffre: OffresDemandesType={
            _id:'',
            Titre: values.Titre,
            Type: 'demande',
            SecteurActivite: values.SecteursActivite || "",
            Ville: values.Ville,
            Region: values.Region ||"",
            DateDebut: values.DateDebut || new Date(),
            DateFin: values.DateFin|| new Date(),
            DureeStage: dif?.toString()+" semaines",
            Description: values.Description,
            NombreHeuresSemaine: Number(values.NombreHeuresSemaine),
            CompetencesRecherches: "",
            EmploiApresStage: false,
            InformationsSuplementaires: values.InformationsSuplementaires,
            ProgrammesSuivi: values.ProgrammesSuivi,
            AutresFormations: values.AutresFormations,
            CompetencesAcquises: values.CompetencesAcquises,
            DescriptionPosteRecherche: "",
            Remuneration: "",
            DateParution: values.DateParution,
            AutresInformations: "",
            Actif: true,
            Supprime: false,
            Valide: auth?.user?.NiveauAcces===AccessLevel.admin? true: false,
            Communications:[{
                Date: new Date(),
                EnvoyeParID: "",
                Message: "",
                NbMessages: 1
            }],
            Auteur:  values.Auteur || '',
            TypeStage: '',
            DureeSemaines: dif||0,
            Vedette: false
        }
        //console.log(nouvelleOffre)
 
        demandeAdded(nouvelleOffre);
       
    }

    async function demandeAdded(newOffre: OffresDemandesType) {
        try {
            const update=await addOffreDemande(newOffre);
            setUpdatingDemande(true);
            setUpdate(update);
        } catch (e) {
        } finally {
            setUpdatingDemande(false);
            history.push(lastLocation?.pathname||'/dashboard/')
        }
      }

    return(
    <form onSubmit={(e)=>handleCreation(e)}>
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
                        onChange={handleChange('Titre')}
                        margin='dense'

                    />
            </Grid>
            { auth?.user?.NiveauAcces===AccessLevel.admin&&
            <Grid item>
                <Grid container alignItems='flex-end' spacing={2}>
                    <Grid item>
                        <SelectStagiaire onChange={(selected)=>setValues({ ...values, Auteur: selected?._id })}/>
                    </Grid>
                </Grid>
            </Grid>
            }
            <Grid item >
                <Grid container alignItems='flex-end' spacing={2}>
                    <Grid item>
                        <SelectSecteur onChange={(selected)=>setValues({ ...values, SecteursActivite: selected?._id })}/>
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
                        onChange={handleChange('Ville')}
                        margin='dense'

                    />
            </Grid>
            <Grid item>
                <SelectRegion onChange={(selected)=>setValues({ ...values, Region: selected?._id })}/>
            </Grid>
            <Grid item >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        label="Date de début"
                        format="dd/MM/yyyy"
                        value={values.DateDebut}
                        InputAdornmentProps={{ position: "start" }}
                        onChange={(selected)=>setValues({ ...values, DateDebut: selected })}
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
                        value={values.DateFin}
                        InputAdornmentProps={{ position: "start" }}
                        onChange={(selected)=>setValues({ ...values, DateFin: selected })}
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
                    type='string'
                    value={(values.DateDebut && values.DateFin) ? 
                        differenceInWeeks(values?.DateFin,values?.DateDebut).toString() + " semaines" : "0 semaines"}
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
                        onChange={handleChange('NombreHeuresSemaine')}
                        margin='dense'

                    />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                    <SelectRemuneration onChange={(remu)=>setValues({...values, Remuneration: remu||''})}/>
            </Grid>
           
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    label="Description poste recherche"
                    required
                    multiline
                    rows={4}
                    defaultValue=""
                    variant="outlined"
                    onChange={handleChange('Description')}
                    margin='dense'

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
                        onChange={handleChange('ProgrammesSuivi')}
                        margin='dense'

                    />
            </Grid>
            <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="input-Competences"
                        label="Competences acquises"
                        type='text'
                        variant="outlined"
                        required
                        onChange={handleChange('CompetencesAcquises')}
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
                        rows={3}
                        onChange={handleChange('InformationsSuplementaires')}
                    />
            </Grid>
            <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="input-infos"
                        label="Autres formations"
                        type='text'
                        variant="outlined"
                        multiline
                        rows={3}
                        onChange={handleChange('AutresFormations')}
                    />
            </Grid>
            
            <Grid item xs={12}>
                <Grid container justify='flex-start'>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            type='submit'
                        >
                            <Typography variant="subtitle1">Creér la demande</Typography>
                        </Button>
                    </Grid>
                </Grid> 
            </Grid>
        </Grid>                  
    </form>
    )
}

export default DashboardNouvelleDemande;
