import DateFnsUtils from '@date-io/date-fns';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { differenceInWeeks } from 'date-fns';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { addOffreDemande } from '../../Api';
import { AccessLevel } from '../../Enum';
import { OffresDemandesType } from '../../Types';
import useAuth from '../auth/useAuth';
import SelectEntreprise from '../Selects/SelectEntreprise';
import SelectRegion from '../Selects/SelectRegion';
import SelectSecteur from '../Selects/SelectSecteur';
import DashBoardNoRights from './DashboardNoRights';

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
    CompetencesRecherches:string,
    EmploiApresStage: boolean,
    InformationsSuplementaires: string,
    Remuneration: string,
    DateParution: Date, 
    DureeSemaines: number,
    Vedette: boolean
  }

//Formulaire de création d'une nouvelle offre
const DashboardNouvelleOffre: React.FC<Props> =()=>{
    const history= useHistory();
    const auth = useAuth();

    const [, setUpdate]= useState<String>('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [updatingOffre, setUpdatingOffre] = useState(true);

    const [values, setValues] = useState<State>({
        Titre: "",
        SecteursActivite: undefined,
        Ville: "",
        Region: undefined,
        DateDebut:null,
        DateFin: null,
        Auteur: auth?.user?.NiveauAcces===AccessLevel.entreprise ? auth?.user._id: undefined,
        DureeStage: "",
        Description: "",
        NombreHeuresSemaine: 0,
        CompetencesRecherches:"",
        EmploiApresStage: false,
        InformationsSuplementaires: "",
        Remuneration: "",
        DateParution: new Date(), 
        DureeSemaines: 0,
        Vedette:false
      });

   
    

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
        
    };
    
    const handleChangeCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.checked });
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
            Type: 'offre',
            SecteurActivite: values.SecteursActivite || "",
            Ville: values.Ville,
            Region: values.Region ||"",
            DateDebut: values.DateDebut || new Date(),
            DateFin: values.DateFin|| new Date(),
            DureeStage: dif?.toString()+" semaines",
            Description: values.Description,
            NombreHeuresSemaine: Number(values.NombreHeuresSemaine),
            CompetencesRecherches: values.CompetencesRecherches,
            EmploiApresStage: values.EmploiApresStage,
            InformationsSuplementaires: values.InformationsSuplementaires,
            ProgrammesSuivi: "",
            AutresFormations: "",
            CompetencesAcquises: "",
            DescriptionPosteRecherche: "",
            Remuneration: values.Remuneration,
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
            Vedette: values.Vedette
        }
        //console.log(nouvelleOffre)
 
        offreAdded(nouvelleOffre);
       
    }

    async function offreAdded(newOffre: OffresDemandesType) {
        try {
            const update=await addOffreDemande(newOffre);
            setUpdatingOffre(true);
            setUpdate(update);
        } catch (e) {
        } finally {
            setUpdatingOffre(false);
            toast.success("L'offre de stage a été ajoutée avec succès!!!");
            history.push('/dashboard/offres')
        }
      }

    return(
        auth?.user?.NiveauAcces===AccessLevel.stagiaire?
        <DashBoardNoRights/>
        :
    <form onSubmit={(e)=>handleCreation(e)}>
        <Grid container spacing={3} alignItems='center'>
            <Grid item xs={12}>
                <Typography variant='h4'>Créer une offre de stage</Typography>
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
                        <SelectEntreprise onChange={(selected)=>setValues({ ...values, Auteur: selected?._id })}/>
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
                    value={(values.DateDebut && values.DateFin) ? 
                        differenceInWeeks(values.DateFin,values.DateDebut).toString() + " semaines" : "0 semaines"}
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
                        onChange={handleChange('NombreHeuresSemaine')}
                        margin='dense'

                    />
            </Grid>
            <Grid item xs={5}> 
                <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item xs={12}><b>Possibilité d'emploi aprés le stage?</b> </Grid>
                    <Grid item> Non</Grid>
                    <Grid item>
                        <Switch
                                    checked={values.EmploiApresStage}
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
                    defaultValue=""
                    variant="outlined"
                    onChange={handleChange('Description')}
                    required
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
                        onChange={handleChange('CompetencesRecherches')}
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
                        label="Rémunération"
                        type='text'
                        variant="outlined"
                        multiline
                        rows={3}
                        onChange={handleChange('Remuneration')}
                    />
            </Grid>
            { auth?.user?.NiveauAcces===AccessLevel.admin&&
            <Grid item > 
                <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item xs={12}><b>Offre de stage vedette?</b> </Grid>
                    <Grid item> Non</Grid>
                    <Grid item>
                        <Switch
                                    checked={values.Vedette}
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
                <Grid container justify='flex-start'>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            type='submit'
                        >
                            <Typography variant="subtitle1">Creér l'offre</Typography>
                        </Button>
                    </Grid>
                </Grid> 
            </Grid>
        </Grid>                  
    </form>
    )
}

export default DashboardNouvelleOffre;
