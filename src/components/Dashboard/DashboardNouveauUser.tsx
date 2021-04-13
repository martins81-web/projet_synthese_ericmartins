import {
    Button,
    ButtonGroup,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLastLocation } from 'react-router-last-location';
import useAuth from '../auth/useAuth';

import { addUtilisateur } from '../../Api';
import { UtilisateursType } from '../../Types';
import DashBoardNoRights from './DashboardNoRights';
import { AccessLevel } from '../../Enum';

type Props = {
};

interface State {
    password: string,
    confirmation: string,
    nom: string,
    prenom: string,
    email: string,
    showPassword: boolean,
    showConfirmation: boolean,
    entreprise: boolean|undefined,
    NiveauAcces: number,
    nomEntreprise: string
  }

//Formulaire de création d'un nouveau utilisateur
const DashboardNouveauUser: React.FC<Props> =()=>{
    const history= useHistory();
    const auth = useAuth();

    const [, setUpdate]= useState<String>('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [updatingUtilisateur, setUpdatingUtilisateur] = useState(true);
    const [, setAddedUtilisateur] = useState(false);
    const [error,setError] = useState<boolean>(false);
    const lastLocation = useLastLocation();
    const [values, setValues] = useState<State>({
        password: '',
        confirmation: '',
        nom: '',
        prenom: '',
        email: '',
        showPassword: false,
        showConfirmation: false,
        entreprise: lastLocation?.pathname==='/dashboard/entreprises'? true: false ,
        NiveauAcces:lastLocation?.pathname==='/dashboard/candidats'? 111: lastLocation?.pathname==='/dashboard/entreprises'? 333:999 ,
        nomEntreprise: ''
      });

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };

    const handleClickShowConfirmation = () => {
    setValues({ ...values, showConfirmation: !values.showConfirmation });
    };
    
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
      };

    const handleCreation= async (e:any)=>{
        e.preventDefault();
        setError(false);
        let error=false;
        if(values.confirmation!== values.password){
            setError(true);
            error=true;
        } 
        if(values.entreprise === undefined){
            setError(true);
            error=true;
        } 

       let newUser: UtilisateursType={
           Prenom: values.prenom,
           Nom: values.nom,
           Courriel: values.email,
           Entreprise: values.entreprise||false,
           MotdePasse: values.password,
           Valide: false,
           Supprime: false,
           Actif: true,
           PremierConnexion: true,
           NomEntreprise: values.nomEntreprise,
           NiveauAcces:values.NiveauAcces,
           _id:'',
           Adresse: '',
           Ville: '',
           Region: '',
           Logo:'',
           Telephone:'',
           SiteWeb:'',
           CV:'',
           MessageMotivation:'',
           SecteursActivites: [],
           Ecole:'',
           PostesStagiaires:''
        }

        if(!error){
            utilisateurAdded(newUser);
        }

    }

    async function utilisateurAdded(newUser: UtilisateursType) {
        try {
            setUpdatingUtilisateur(true);
            const update=await addUtilisateur(newUser)
            setUpdate(update);
        } catch (e) {
        } finally {
            setUpdatingUtilisateur(false);
            let NiveauAcces=values.NiveauAcces;
            let valuesClear={
                password: '',
                confirmation: '',
                nom: '',
                prenom: '',
                email: '',
                showPassword: false,
                showConfirmation: false,
                entreprise: undefined,
                NiveauAcces: 111,
                nomEntreprise: ''
            };
            
            setValues(valuesClear);
            setAddedUtilisateur(true);
            NiveauAcces===111? history.push('/dashboard/candidats'):NiveauAcces===333 ? history.push('/dashboard/entreprises'): history.push('/dashboard/admins');
        }
      }

    return(
        auth?.user?.NiveauAcces!==AccessLevel.admin?
        <DashBoardNoRights/>
        :
    <form onSubmit={(e)=>handleCreation(e)}>
        <Grid container spacing={3} >
            <Grid item xs={12} >
                <Typography variant='h4'>
                    Créer une compte {values.NiveauAcces===111? 'étudiant': 
                    values.NiveauAcces===333? 'entreprise': 'administrateur'}
                </Typography> 
            </Grid>
            
            <Grid item xs={12}>
                <Grid container spacing={2} >
                    <Grid item xs={12}>
                        <Grid container spacing={2} alignItems='center'>
                            <Grid item> <FormLabel>Type d'utilisateur?</FormLabel></Grid>
                            <Grid item>
                                <ButtonGroup disableElevation variant="contained"  >
                                    <Button 
                                    variant={values.NiveauAcces===333 ? 'contained' : 'outlined'}
                                    style={{ textTransform: 'none'}} 
                                    color='primary'
                                    onClick={()=>setValues({ ...values, entreprise: true,NiveauAcces: 333 })}
                                    >
                                        Une entreprise
                                    </Button>
                                    <Button 
                                    style={{textTransform: 'none'}}
                                    variant={values.NiveauAcces===111  ? 'contained' : 'outlined'} 
                                    onClick={()=>setValues({ ...values, entreprise: false,NiveauAcces: 111 })}
                                    color='primary'
                                    >
                                        Un étudiant
                                    </Button>
                                    <Button 
                                    style={{textTransform: 'none'}}
                                    variant={values.NiveauAcces===999  ? 'contained' : 'outlined'} 
                                    onClick={()=>setValues({ ...values, entreprise: false,NiveauAcces: 999 })}
                                    color='primary'
                                    >
                                        Un administrateur
                                    </Button>
                                </ButtonGroup>  
                            </Grid>
                            <Grid item>
                            <FormHelperText 
                                error={error ? values.entreprise===undefined: error }>
                                {error? values.entreprise===undefined ? 'Vous devez choisir une option!':null:null } 
                                </FormHelperText>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            {values.entreprise &&
                            <Grid item xs={12}>
                                <FormControl variant="outlined" fullWidth required>
                                <TextField
                                    fullWidth
                                    id="input-nomEntreprise"
                                    label="Nom de l'entreprise"
                                    variant="outlined"
                                    defaultValue={values.nomEntreprise}
                                    required
                                    onChange={handleChange('nomEntreprise')}

                                />
                                </FormControl>
                            </Grid>
                            }
                            <Grid item xs={6}>
                                <FormControl variant="outlined" fullWidth required>
                                <TextField
                                    fullWidth
                                    id="input-prenom"
                                    label={values.entreprise?'Prénom de la personne responsable':'Prénom'}
                                    variant="outlined"
                                    defaultValue={values.prenom}
                                    required
                                    onChange={handleChange('prenom')}

                                />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl variant="outlined" fullWidth required>
                                    <TextField
                                        fullWidth
                                        id="input-nom"
                                        label={values.entreprise?'Nom de la personne responsable':'Nom'}
                                        variant="outlined"
                                        defaultValue={values.nom}
                                        required
                                        onChange={handleChange('nom')}
                                    />
                                    </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" fullWidth required>
                            <TextField
                                fullWidth
                                id="input-courriel"
                                label="Courriel"
                                variant="outlined"
                                type='email'
                                required
                                onChange={handleChange('email')}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="outlined"  required fullWidth>
                            <InputLabel htmlFor="outlined-adornment-password">Mot de passe</InputLabel>
                            <OutlinedInput
                                fullWidth
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                required
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                labelWidth={110}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="outlined"  required fullWidth>
                            <InputLabel htmlFor="outlined-adornment-confirmation">Confirmez le nouveau mot de passe</InputLabel>
                            <OutlinedInput
                                required
                                fullWidth
                                id="outlined-adornment-confirmation"
                                type={values.showConfirmation ? 'text' : 'password'}
                                value={values.confirmation}
                                onChange={handleChange('confirmation')}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowConfirmation}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {values.showConfirmation ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                labelWidth={300}
                            />
                        </FormControl>
                        <FormHelperText 
                            error={error ? values.password!==values.confirmation: error }>
                            {error? values.password!==values.confirmation ? 'Les mots de passe doivent être identiques!':null:null } 
                        </FormHelperText>
                    </Grid>
                    
                </Grid>
            </Grid>
            
            
            <Grid item xs={6}>
                <Grid container justify='flex-start'>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            type='submit'
                        >
                            <Typography variant="subtitle1">Creér le compte</Typography>
                        </Button>
                    </Grid>
                </Grid>  
            </Grid>
        </Grid>                            
    </form>
    )
}

export default DashboardNouveauUser;
