import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Button,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Cookies from 'js-cookie';
import { useState } from 'react';

import { fetchUtilisateurs } from '../Api';
import { UtilisateursType } from '../Types';
import useAuth from './auth/useAuth';

type Props = {
};

interface State {
    password: string;
    email: string;
    showPassword: boolean;
  }

const Login: React.FC<Props> =()=>{
    const [values, setValues] = useState<State>({
        password: '',
        email: '',
        showPassword: false,
      });
    const auth = useAuth();

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
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


    return(
        <>
            <form onSubmit={(e)=>handleConnection(e)}>
            <Grid container>
            <Grid item xs={3} >
                <Grid container direction='column' style={{padding: '50px'}} spacing={2} alignItems='flex-end' >
                    <Grid item>
                        <Typography variant='h3'>Identification</Typography>
                    </Grid>
                    <Grid item style={{width: '100%'}}> 
                        <FormControl variant="outlined" fullWidth required>
                            <TextField
                                fullWidth
                                id="input-courriel"
                                label="Courriel"
                                variant="outlined"
                                type='email'
                                required
                                helperText
                                onChange={handleChange('email')}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item style={{width: '100%'}}>
                        <FormControl variant="outlined" fullWidth required>
                            <InputLabel htmlFor="outlined-adornment-password">Mot de passe</InputLabel>
                            <OutlinedInput
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
                                labelWidth={100}
                            />
                        </FormControl>
                    </Grid>
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
            
            <Grid item xs={9}>
                <Grid container direction='column'  style={{padding: '50px'}}>
                    <Grid item>
                        <Typography variant='h3'>Nouvel utilisateur</Typography>
                    </Grid>                           
                </Grid> 
            </Grid> 
            </Grid>
            </form>
        </>
    )
}

export default Login;