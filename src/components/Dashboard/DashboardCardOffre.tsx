import { faEdit, faTimes, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { fetchUtilisateur } from '../../Api';
import { OffreDemandeType, UtilisateursType } from '../../Types';

type Props = {
    offre: OffreDemandeType
    type?: 'attente' | undefined
};



const DashboardCardOffre: React.FC<Props> =({offre,type })=>{

    const [auteur, setAuteur] = useState<UtilisateursType | undefined>(undefined);

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

    return(
        <Wrapper>

            <Card style={{borderTop: '5px solid #aab14a', 
            backgroundColor: '#F0F0F0', marginBottom: '20px', padding: '10px',position: 'relative'}} >
             {offre.Valide===false && type!=='attente' && <div className="corner-ribbon top-right sticky red">Pas validé</div>}
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
                                    <b>Publié le:</b> {formatDate(offre.DateParution)}
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
                                            <b>Début:</b> {formatDate(offre.DateDebut)}
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
                        <Grid item >
                            <Button variant="contained" color="primary" size="small"   
                                style={{textTransform: 'none', borderRadius: '0'}}>
                                Détails
                            </Button>
                        </Grid>
                        <Grid item>
                        {type==='attente' ?
                            <Grid container spacing={1}>
                                <Grid item>
                                    <Button variant="outlined" size="small" 
                                    style={{textTransform: 'none', borderRadius: '0', backgroundColor: '#fa6980', color: 'white'}}
                                    >
                                        Refuser
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button 
                                        variant="outlined" 
                                        size="small"  
                                        style={{textTransform: 'none', borderRadius: '0', backgroundColor: '#72a84a', color: 'white'}}
                                    >
                                        Acepter
                                    </Button>
                                </Grid>
                            </Grid>
                            :
                            <Grid container spacing={1}>
                                <Grid item>
                                    <Button variant="outlined" size="small" 
                                    startIcon={  <FontAwesomeIcon icon={faEdit} color="green"/>}
                                    style={{textTransform: 'none', borderRadius: '0'}}
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