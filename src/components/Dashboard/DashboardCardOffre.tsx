import { faEdit, faTimes, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardActions, CardContent, FormControlLabel, Grid, Switch, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import { fetchUtilisateur, updateOffreDemande } from '../../Api';
import { AccessLevel } from '../../Enum';
import { OffresDemandesType, UtilisateursType } from '../../Types';
import useAuth from '../auth/useAuth';

type Props = {
    offre: OffresDemandesType
    type?: 'attente' | undefined
    updateOffre: ()=>void
};



const DashboardCardOffre: React.FC<Props> =({offre,type, updateOffre})=>{
    const history = useHistory();

    const [auteur, setAuteur] = useState<UtilisateursType | undefined>(undefined);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [update, setUpdate]= useState<String>('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [updatingOffreDemande, setUpdatingOffreDemande] = useState(true);
    const auth = useAuth();

    useEffect(()=>{
        getAuteur(offre.Auteur);
       
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
      

    const getAuteur = async (id: string) => {
        let auteur : UtilisateursType| undefined = await fetchUtilisateur(id);
        //console.log(auteur);
        setAuteur(auteur);
    }

    function formatDate(date:Date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    const getAuteurNom = (auteur:UtilisateursType)=>{
        return (auteur.NomEntreprise)
    }

    async function offreDemandeUpdated(offreDemande:OffresDemandesType) {
        try {
            const update=await updateOffreDemande(offreDemande);
            setUpdatingOffreDemande(true);
            setUpdate(update); 
             
        } catch (e) {
        } finally {
            setUpdatingOffreDemande(false);
            updateOffre();
        }
      }
    
      const handleVedette =()=>{
        offre.Vedette=!offre.Vedette;
        offreDemandeUpdated(offre);
    }

    const handleSupprimer =()=>{
        offre.Supprime=true;
        offreDemandeUpdated(offre);
    }

    const handleValider  =()=>{
        offre.Valide=true;
        offreDemandeUpdated(offre);
    }

    return(
        <Wrapper>

            <Card style={{borderTop: '5px solid #aab14a', 
            backgroundColor: '#F0F0F0', padding: '10px',position: 'relative'}} >
             {offre.Valide===false && type!=='attente' && <div className="corner-ribbon top-right sticky red">Pas valid??</div>}
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <Grid container justify='space-between' style={{borderBottom: '2px solid black'}}>
                                <Grid item>
                                    <Grid container spacing={2}> 
                                        <Grid item style={{paddingBottom: '0px'}}><FontAwesomeIcon icon={faUserTie} size="2x"  /></Grid>
                                        <Grid item><Typography variant='h5' style={{fontWeight: 'bold'}}>{offre.Titre}</Typography></Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>   
                                    <b>Publi?? le:</b> {formatDate(offre.DateParution)}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} >
                            <Grid container>
                                <Grid item xs={type!=='attente' ? 7: 12}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                           {auteur? getAuteurNom(auteur) : null}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <b>Ville:</b> {offre.Ville}
                                        </Grid>
                                        {type==='attente' &&
                                        <Grid item xs={12} style={{marginTop: '1.5rem'}}>
                                        </Grid>
                                        }
                                    </Grid>
                                </Grid>
                                {type!=='attente' &&
                                <Grid item xs={5}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <b>D??but:</b> {formatDate(offre.DateDebut)}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <b>Fin:</b> {formatDate(offre.DateFin)}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                }
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            {offre.Description}
                        </Grid>
                    </Grid>


                </CardContent>
                <CardActions>
                    <Grid container justify='space-between'>
                        <Grid item>
                            <Grid container spacing={2} alignItems='center'>
                                <Grid item> 
                                    <Button variant="contained" color="primary" size="small"   
                                        style={{textTransform: 'none', borderRadius: '0'}}
                                        onClick={()=>history.push({
                                            pathname: '/dashboard/details/offre/'+offre._id,
                                            state: {data: offre,auteur: auteur}
                                        })}
                                        >
                                        D??tails
                                    </Button>
                                </Grid>
                                {type!=='attente' && offre.Communications.length>0 && auth?.user?.NiveauAcces!==AccessLevel.stagiaire &&
                                <Grid item>
                                        <Typography style={{color: 'firebrick', fontWeight: 'bold'}}>
                                            {offre.Communications.length + ' candidats int??ress??' + (offre.Communications.length>1 ? 's': '')}  
                                        </Typography>
                                </Grid>
                                }
                            </Grid>
                        </Grid>
                        <Grid item>
                        {type==='attente' ?
                            <Grid container spacing={1}>
                                <Grid item>
                                    <Button variant="outlined" size="small" 
                                    style={{textTransform: 'none', borderRadius: '0', backgroundColor: '#fa6980', color: 'white'}}
                                    onClick={handleSupprimer}
                                    >
                                        Refuser
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button 
                                        variant="outlined" 
                                        size="small"  
                                        style={{textTransform: 'none', borderRadius: '0', backgroundColor: '#72a84a', color: 'white'}}
                                        onClick={handleValider}
                                    >
                                        Accepter
                                    </Button>
                                </Grid>
                            </Grid>
                            :
                            auth?.user?.NiveauAcces!==AccessLevel.stagiaire && 
                            <Grid container spacing={1} >
                                {auth?.user?.NiveauAcces===AccessLevel.admin && 
                                <Grid item>
                                    <FormControlLabel
                                        control={
                                        <Switch
                                            checked={offre.Vedette}
                                            onChange={handleVedette}
                                            name="checkedB"
                                            color="primary"
                                        />
                                        }
                                        label="Vedette"
                                    />
                                </Grid>
                                }
                                <Grid item>
                                    <Button variant="outlined" size="small" 
                                    startIcon={  <FontAwesomeIcon icon={faEdit} color="green"/>}
                                    style={{textTransform: 'none', borderRadius: '0'}}
                                    onClick={()=>history.push({
                                        pathname: '/dashboard/edit/offre/'+offre._id,
                                        state: {data: offre}
                                    })}
                                    >
                                        Modifier
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button 
                                        variant="outlined" 
                                        size="small"  
                                        startIcon={<FontAwesomeIcon icon={faTimes} color="red"/>}
                                        style={{textTransform: 'none', borderRadius: '0'}}
                                        onClick={handleSupprimer}
                                    >
                                        Supprimer
                                    </Button>
                                </Grid>
                            </Grid>
                            }
                        </Grid>
                    </Grid>
                </CardActions>
            </Card> 
        </Wrapper>
    )
}

export default DashboardCardOffre;

export const Wrapper = styled.div`

.corner-ribbon.top-right{
  top: 25px;
  right: -50px;
  left: auto;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
}


.corner-ribbon{
  width: 200px;
  background: #e43;
  position: absolute;
  top: 25px;
  left: -50px;
  text-align: center;
  line-height: 50px;
  letter-spacing: 1px;
  color: #f0f0f0;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}

.corner-ribbon.red{background: #e43;}

`