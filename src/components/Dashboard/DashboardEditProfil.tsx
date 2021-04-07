/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import { useEffect, useState } from 'react';

import { fetchSecteursActivite, fetchUtilisateur, updateUtilisateur } from '../../Api';
import { AccessLevel } from '../../Enum';
import { SecteursActiviteType, UtilisateursType } from '../../Types';
import useAuth from '../auth/useAuth';
import SelectRegion from '../Selects/SelectRegion';

type Props = {
    history:any,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: '45vw',
    },
  },
};


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 250,
      maxWidth: '45vw',
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
    input: {
        "&:invalid": {
          border: "red solid 2px"
        }
      }
  }),
);


const DashboardProfil: React.FC<Props> =({history})=>{

const classes = useStyles();
const auth = useAuth();

const [user, setUser] = useState<UtilisateursType|null>(null);

const [secteursActivites, setSecteursActivites] = useState<SecteursActiviteType[]>([]);
const [update, setUpdate]= useState<String>('');
const [updatingUser, setUpdatingUser] = useState(true);

useEffect(()=>{
    getSecteursActivites();
    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  //cherche l'user dans la database
  const getUser= async()=>{
    let id='';
    if(auth?.user!==undefined && auth?.user!==null)
    id = auth?.user._id;
    let user : UtilisateursType | undefined = await fetchUtilisateur(id);
    //console.log(user);
    setUser(user);
} 

//cherche les secteurs d'activité
const getSecteursActivites = async () => {
    let secteursActivites : SecteursActiviteType[] | undefined = await fetchSecteursActivite();
    setSecteursActivites(secteursActivites);
}

const Field = (defaultValue: string, label: string, key: string) => {
    return (
        <TextField
            name={key}
            fullWidth
            id={"input-"+label}
            label={label}
            variant="outlined"
            onChange={handleChangeTextField}
            defaultValue={defaultValue}
            margin='dense'
            required
            type={label==='Téléphone'? "tel" : label==='Courriel'? 'email' :'text'}
            inputProps={{ className: classes.input,pattern: label==='Téléphone'? "[0-9]{3}[0-9]{3}[0-9]{4}": null }}
        />
    )
}

//changements des textfields (onChange)
const handleChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(user)
    setUser({ ...user, [event.target.name]: event.target.value });
    
}

//retourne les titres des secteurs pour le select
const getTitres =(ids: string[])=>{
    let titres: string[]=[];
    secteursActivites.map(secteur=> {
        ids.map(id=>{
            if(secteur._id===id)
            titres.push(secteur.Titre);
        })
    })
    return titres;
}

//sauvergarde les changements
const handleSave = async (e:any)=>{
    e.preventDefault();
    if(user){
        let userEdited=user;
        userEdited.PremierConnexion=false;
        setUser(userEdited);

    }
    console.log(user)
    userUpdated();
}

//mise à jour de l'utilisateur
async function userUpdated() {
    try {
        if(user) {
        setUpdatingUser(true);
        const update=await updateUtilisateur(user);
        setUpdate(update);
        }
    } catch (e) {
    } finally {
        setUpdatingUser(false);
        history.push({
            pathname: "/dashboard/update",
            state: {data: user}
        }); 

    }
  }

 return(
         user?
            <div> 
                <form onSubmit={(e)=>handleSave(e)}>
            <Grid container spacing={2}>
                {user.Entreprise?
                <Grid item xs={2}> 
                    {Field(user.NomEntreprise, "Nom de l'entreprise",'NomEntreprise')}
                </Grid>
                : null}
                <Grid item xs={3}>
                    {Field(user.Prenom, user.Entreprise? 'Prénom de la personne responsable': 'Prénom','Prenom' )}
                </Grid>
                <Grid item xs={3}>
                    {Field(user.Nom, user.Entreprise? 'Nom de la personne responsable': 'Nom', 'Nom')}    
                </Grid>
                {user.Entreprise?
                <Grid item xs={2}>
                    {Field(user.Logo, "Logo", 'Logo')}
                </Grid>
                : null}
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={3}> 
                    {Field(user.Adresse, "Adresse",'Adresse')}
                </Grid>
                <Grid item xs={2}>
                    {Field(user.Ville, "Ville", 'Ville')}
                </Grid>
                <Grid item xs={2}>
                    <SelectRegion selectedId={user.Region} onChange={(region)=>setUser({ ...user, Region: region?._id as string })} />
                    
                </Grid>
        </Grid>
        <Grid container spacing={2}>
                <Grid item xs={3}> 
                    {Field(user.Courriel, "Courriel", 'Courriel')}
                </Grid>
                <Grid item xs={2}>
                    {Field(user.Telephone, "Téléphone", 'Telephone')}
                </Grid>
                { user.NiveauAcces !== AccessLevel.admin?
                <Grid item xs={3}>
                    {Field(user.SiteWeb, "Site web", 'SiteWeb')}
                </Grid> :null
                }
        </Grid>
        { !user.Entreprise && user.NiveauAcces !== AccessLevel.admin?
        <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        name='Ecole'
                        fullWidth
                        id="input-Ecole"
                        label='École'
                        variant="outlined"
                        defaultValue={user.Ecole}
                        margin='dense'
                        onChange={handleChangeTextField}
                        />
                </Grid>
                <Grid item xs={12}> 
                    <TextField
                        name='CV'
                        fullWidth
                        id="input-CV"
                        label="CV"
                        variant="outlined"
                        multiline
                        rows='6'
                        defaultValue={user.CV}
                        margin='dense'
                        onChange={handleChangeTextField}
                        />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name='MessageMotivation'
                        fullWidth
                        id="input-MessageMotivation"
                        label='Message de motivation'
                        variant="outlined"
                        multiline
                        rows='6'
                        defaultValue={user.MessageMotivation}
                        margin='dense'
                        onChange={handleChangeTextField}
                        />
                </Grid>
        </Grid> :null
        }
         { user.Entreprise?
        <Grid container spacing={2}>
                <Grid item xs={4}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-chip-label">Secteurs d'activités</InputLabel>
                        <Select
                        labelId="demo-mutiple-chip-label"
                        id="demo-mutiple-chip"
                        multiple
                        value={user.SecteursActivites}
                        onChange={(e)=>{
                            console.log(e.target.value);
                            setUser({ ...user, SecteursActivites: e.target.value as string[] })                      
                        }}
                        input={<Input id="select-multiple-chip" />}
                        renderValue={(selected) => (
                            <div className={classes.chips}>
                            {(getTitres(selected as string[]) as string[]).map((value) => (
                                <Chip key={value} label={value} className={classes.chip}/>
                            ))}
                            </div>
                        )}
                        MenuProps={MenuProps}
                        >
                        {secteursActivites.map((secteur) => (
                            <MenuItem key={secteur._id} value={secteur._id}>
                                {secteur.Titre}     
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                        {Field(user.PostesStagiaires, "Types de postes sensibles à accueillir des stagiaires", 'PostesStagiaires')}
                </Grid>
               
        </Grid> :null
        }
        <Grid container justify='flex-end' spacing={2} direction='row-reverse'>
            <Grid item>
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<SaveIcon/>}
                    size="small"
                    type='submit'
                >
                    Save
                </Button>
            </Grid>
            <Grid item>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={()=>{
                        history.push("/dashboard/update");

                    }}
                >
                    Cancel
                </Button>
            </Grid>
        </Grid>
        </form>
    </div>:null
    )
}

export default DashboardProfil;