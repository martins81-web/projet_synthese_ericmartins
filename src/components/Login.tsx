import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Button,
    ButtonGroup,
    Container,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
} from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { addUtilisateur, fetchUtilisateurs } from '../Api';
import { UtilisateursType } from '../Types';
import useAuth from './auth/useAuth';

type Props = {
    login: boolean
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

const Login: React.FC<Props> =({login})=>{
    const [values, setValues] = useState<State>({
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
      });
    const [error,setError] = useState<boolean>(false);
    const auth = useAuth();
    const history = useHistory();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [update, setUpdate]= useState<String>('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [updatingUtilisateur, setUpdatingUtilisateur] = useState(true);
    const [addedUtilisateur, setAddedUtilisateur] = useState(false);

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

    const handleConnection = async (e:any) => {
        e.preventDefault();
        //console.log('email:', values.email);
        //console.log('password:', values.password);
        const utilisateurs : UtilisateursType[] | undefined = await fetchUtilisateurs();
        const utilisateur=utilisateurs.find(utilisateur => utilisateur.Courriel===values.email && utilisateur.MotdePasse===values.password);
   
        if (utilisateur) {
           auth?.signIn(utilisateur);
           Cookies.set('connected', utilisateur._id);  
        }
        
    }

    const handleCreation= async (e:any)=>{
        e.preventDefault();
        setError(false);

    if(values.confirmation!== values.password){
        setError(true);
    } 
    if(values.entreprise === undefined){
        setError(true);
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
            let values={
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
            setValues(values);
            console.log(values);
            setAddedUtilisateur(true);
        }
      }


    return(
    <Wrapper>
        <Container className='login'>
                {login ?
                <Grid container justify='center' spacing={4}>
                    <Grid item xs={12}>
                        <form onSubmit={(e)=>handleConnection(e)}>

                        <Grid container spacing={4} >
                            <Grid item xs={12} >
                                <Typography variant='h3'>Connexion</Typography> 
                                <p>Bienvenue sur la plateforme de connexion et inscription de eStage.</p>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
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
                                                labelWidth={130}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                            
                            
                            <Grid item xs={12}>
                                <Grid container justify='flex-end'>
                                    <Grid item>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            type='submit'
                                            endIcon={<FontAwesomeIcon icon={faSignInAlt}  color="white"/>}
                                        >
                                            <Typography variant="subtitle1">Connexion</Typography>
                                        </Button>
                                    </Grid>
                                </Grid>  
                            </Grid>
                        </Grid>
                        </form>
                    </Grid>  
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Grid container justify='center'>
                                    <Grid item>
                                        <Typography>Vous n'avez pas de compte?</Typography>
                                    </Grid>
                                </Grid>      
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container justify='center'>
                                    <Grid item>
                                        <Button
                                            className='buttonCreer'
                                            variant="contained"
                                            size="large"
                                            onClick={()=>{
                                                history.push('/register');
                                                setAddedUtilisateur(false);
                                            }}
                                        >
                                            <Typography variant="subtitle1">Créer votre compte</Typography>
                                        </Button>
                                    </Grid>
                                </Grid> 
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                : 
                
                <Grid container>
                    {addedUtilisateur===false?
                    <Grid item xs={12}>
                        <form onSubmit={(e)=>handleCreation(e)}>
                        <Grid container spacing={3} >
                            <Grid item xs={12} >
                                <Typography variant='h3'>Créez votre compte</Typography> 
                                <p>Informations</p>
                            </Grid>
                            
                            <Grid item xs={12}>
                                <Grid container spacing={2} >
                                    <Grid item xs={12}>
                                        <Grid container spacing={2} alignItems='center'>
                                            <Grid item> <FormLabel>Vous êtes?</FormLabel></Grid>
                                            <Grid item>
                                                <ButtonGroup disableElevation variant="contained"  >
                                                    <Button 
                                                    variant={values.entreprise ? 'contained' : 'outlined'}
                                                    style={{ textTransform: 'none'}} 
                                                    color='primary'
                                                    onClick={()=>setValues({ ...values, entreprise: true,NiveauAcces: 333 })}
                                                    >
                                                        Une entreprise
                                                    </Button>
                                                    <Button 
                                                    style={{textTransform: 'none'}}
                                                    variant={!values.entreprise&& values.entreprise!==undefined  ? 'contained' : 'outlined'} 
                                                    onClick={()=>setValues({ ...values, entreprise: false,NiveauAcces: 111 })}
                                                    color='primary'
                                                    >
                                                        Un étudiant
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
                                <Grid container >
                                    <Grid item>
                                        <Link to='/login'>Vous avez déjà un compte ?</Link>
                                    </Grid>
                                </Grid>  
                            </Grid>
                            
                            <Grid item xs={6}>
                                <Grid container justify='flex-end'>
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
                    </Grid> :
                    <Grid container spacing={3} >
                        <Grid item>
                            <Typography>Votre compte a bien été crée!</Typography>              
                        </Grid>
                        <Grid item>
                            <Link to='/login'>Voulez-vous vous connecter?</Link>
                        </Grid>
                        <Grid item>
                            <Link onClick={()=>setAddedUtilisateur(false)} to='/register'>Voulez-vous vous créer une autre compte?</Link>
                        </Grid>
                    </Grid>   
                    
                    }
                </Grid>
                
                
                }
        </Container>      
    </Wrapper>

    )
}

export default Login;


export const Wrapper = styled.div`

.login {
   padding: 60px;
   margin-top: 50px;
   margin-bottom: 50px;
   border: 2px solid black;
   border-left: 12px solid black;
   border-right: 12px solid black;
   background-color: WhiteSmoke

}
  
  .buttonCreer{
      background-color: #e48400;
      color: white;
  }
  .buttonCreer:hover{
      color: black;
  }
`