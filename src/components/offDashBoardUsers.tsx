import { faLevelDownAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Button,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    Input,
    InputLabel,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { fetchUtilisateurs } from '../Api';
import { Menu } from '../Enum';
import { UtilisateursType } from '../Types';

type Props = {
    usersType: string
};

const HeadersCandidats = ['Nom','Prénom','Courriel','Téléphone', 'Site Web', 'Actions']
const HeadersEntreprises = ['Entreprise','Personne responsable','Courriel','Téléphone', 'Site Web', 'Actions']

const DashboardCandidats: React.FC<Props> =({usersType})=>{

    const [utilisateurs, setUtilisateurs] = useState<UtilisateursType[]>([]);
    const [edit, setEdit] = useState<UtilisateursType | 'closed' >('closed');

    useEffect(()=>{
        getUtilisateurs();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

    const getUtilisateurs = async () => {
        let users : UtilisateursType[] | undefined = await fetchUtilisateurs();
        users =users.filter(user=> user.NiveauAcces=== (usersType === 'candidats' ? 111: usersType === 'entreprises' ? 333 : 999 ));
        console.log(users);
        setUtilisateurs(users);
    }
    
    const getEditUserRow = (user: UtilisateursType) => {
           return ( 
                 <TableCell colSpan={6}>
                    <Grid container justify='center' >
                        <Grid item xs={7}>
                            <Grid container direction='column' style={{backgroundColor: 'WhiteSmoke', margin: '1rem', padding: '1rem'}}>
                                <Grid item>
                                    <Typography variant='h4' style={{color: 'black'}}>Éditer utilisateur</Typography>
                                </Grid>
                                <Grid item>
                                    <Grid container spacing={1} style={{padding: '1rem'}}>
                                        <Grid item xs={2}> 
                                            <FormControl>
                                                <InputLabel htmlFor="my-input">Prénom</InputLabel>
                                                <Input id="my-input" aria-describedby="my-helper-text" 
                                                    defaultValue={user.Prenom}
                                                />
                                                {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                                            </FormControl> 
                                        </Grid>
                                        <Grid item xs={2}>
                                            <FormControl>
                                                <InputLabel htmlFor="my-input">Nom</InputLabel>
                                                <Input id="my-input" aria-describedby="my-helper-text" 
                                                    defaultValue={user.Nom}
                                                />
                                                {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="my-input">Courriel</InputLabel>
                                                <Input id="my-input" aria-describedby="my-helper-text" 
                                                    defaultValue={user.Courriel}
                                                />
                                                {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="my-input">Adresse</InputLabel>
                                                <Input id="my-input" aria-describedby="my-helper-text" 
                                                    defaultValue={user.Adresse}
                                                />
                                                {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="my-input">Ville</InputLabel>
                                                <Input id="my-input" aria-describedby="my-helper-text" 
                                                    defaultValue={user.Ville}
                                                />
                                                {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="my-input">Region</InputLabel>
                                                <Input id="my-input" aria-describedby="my-helper-text" 
                                                    defaultValue={user.Region}
                                                />
                                                {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="my-input">Téléphone</InputLabel>
                                                <Input id="my-input" aria-describedby="my-helper-text" 
                                                    defaultValue={user.Telephone}
                                                />
                                                {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="my-input">Site web</InputLabel>
                                                <Input id="my-input" aria-describedby="my-helper-text" 
                                                    defaultValue={user.SiteWeb}
                                                />
                                                {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
                                            </FormControl>
                                        </Grid>
                                        <Grid item></Grid>
                                        
                                        
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container justify='flex-end' spacing={1}>
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                startIcon={<SaveIcon />}
                                            >
                                                Save
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                size="small"
                                                onClick={()=>setEdit('closed')}
                                            >
                                                Close
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </TableCell>                   
            )
    }
    
    return(
        <Wrapper>
               {/*  <Grid container  spacing={3} alignItems='center' style={{marginBottom: '30px'}}> 
                    <Grid item>
                        <Typography variant={'h3'}>
                            {usersType === 'candidats' ? Menu.candidats : usersType === 'entreprises' ? Menu.entreprises : 'Administrateurs' }
                        </Typography>
                    </Grid>
                    <Grid item>
                        <FontAwesomeIcon icon={faLevelDownAlt}  size='lg' />
                    </Grid>
                </Grid> */}
                <Grid container justify='center'>
                    <Grid item xs={10}>
                    <TableContainer className='tableContainer'>
                        {
                        utilisateurs.length>0 ?
                                <Table size='small' >
                                    <TableHead>
                                        <TableRow>
                                            {
                                                usersType=== 'candidats' ?
                                                    HeadersCandidats.map(header=>(
                                                        <TableCell align={header==='Actions'? 'center': 'left'}>{header}</TableCell>
                                                    )) : 
                                                    usersType=== 'entreprises' ?
                                                    HeadersEntreprises.map(header=>(
                                                        <TableCell align={header==='Actions'? 'center': 'left'}>{header}</TableCell>
                                                    )) : null
                                            }
                                            
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {
                                    usersType=== 'candidats' ?
                                        utilisateurs.map((user,index) => (
                                            <>
                                                <TableRow key={user.Nom+index} hover>
                                                    <TableCell>{user.Nom}</TableCell>
                                                    <TableCell>{user.Prenom}</TableCell>
                                                    <TableCell>{user.Courriel}</TableCell>
                                                    <TableCell>{user.Telephone}</TableCell>
                                                    <TableCell>{user.SiteWeb}</TableCell>
                                                    <TableCell align="center">
                                                        <IconButton onClick={edit===user? ()=>setEdit('closed') : ()=>setEdit(user)}>
                                                            <EditIcon className='icon'/>
                                                        </IconButton>
                                                        <IconButton><DeleteIcon className='icon'/></IconButton>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={user.Nom+index}>
                                                    {edit === user ? getEditUserRow(user):null}
                                                </TableRow>
                                            </>
                                        )) :
                                    usersType=== 'entreprises' ? 
                                        utilisateurs.map((user,index) => (
                                            <>
                                                <TableRow key={user.Nom+index} hover>
                                                    <TableCell>{user.NomEntreprise}</TableCell>
                                                    <TableCell>{user.Prenom + " " + user.Nom}</TableCell>
                                                    <TableCell>{user.Courriel}</TableCell>
                                                    <TableCell>{user.Telephone}</TableCell>
                                                    <TableCell>{user.SiteWeb}</TableCell>
                                                    <TableCell align="center">
                                                        <IconButton  onClick={edit===user? ()=>setEdit('closed') : ()=>setEdit(user)}>
                                                            <EditIcon className='icon' />
                                                        </IconButton>
                                                        <IconButton >
                                                            <DeleteIcon  className='icon'/>
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={user.Nom+index+'2'}>
                                                    {edit === user ? getEditUserRow(user):null}
                                                </TableRow>
                                            </>
                                        )) : 
                                    null
                                    }
                                    </TableBody>
                                </Table>
                            
                        : <></>
                        }
                        </TableContainer>
                    </Grid>
                </Grid>
        </Wrapper>
    )
}

export default DashboardCandidats;

export const Wrapper = styled.div`
 
 th{
     font-weight: bold;
     color: white;
     background-color: #3e99df;
 }

 tr{
     background-color: #808080;
 }

 td {
    color: white;   
 }
 tr:hover {
    background-color:#70aedd  !important;
    
 }

 .icon {
    color: white !important
}
 
.tableContainer{
    padding: 20px;
    background-color: #606060;
}
    
`