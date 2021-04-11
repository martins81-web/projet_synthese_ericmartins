/* eslint-disable @typescript-eslint/no-unused-vars */
import { faEdit, faTimes, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import { fetchUtilisateur, updateOffreDemande } from '../../Api';
import { AccessLevel } from '../../Enum';
import { OffresDemandesType, UtilisateursType } from '../../Types';
import useAuth from '../auth/useAuth';

type Props = {
    demande: OffresDemandesType,
    type?: 'attente' | undefined
    updateDemande: ()=> void
};



const DashboardCardDemande: React.FC<Props> =({demande, type,updateDemande})=>{
    const [auteur, setAuteur] = useState<UtilisateursType | undefined>(undefined);
    const [update, setUpdate]= useState<String>('');
    const [updatingOffreDemande, setUpdatingOffreDemande] = useState(true);
    const auth = useAuth();
    const history = useHistory();

    useEffect(()=>{
        getAuteur(demande.Auteur);
       
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

      //cherche l'auteur de la demande
    const getAuteur = async (id: string) => {
        let auteur : UtilisateursType| undefined = await fetchUtilisateur(id);
        //console.log(auteur);
        setAuteur(auteur);
    }

    //formatation de la date au format YYYY-MM-dd
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
        return (auteur.Prenom+" "+auteur.Nom)
    }

    //mise à jour de la demande
    async function offreDemandeUpdated(offreDemande:OffresDemandesType) {
        try {
            const update=await updateOffreDemande(offreDemande);
            setUpdatingOffreDemande(true);
            setUpdate(update);  
            updateDemande();
        
        } catch (e) {
        } finally {
            setUpdatingOffreDemande(false);
            
        }
      }

      //suppression de la demande
    const handleSupprimer = () =>{
        demande.Supprime=true;
        offreDemandeUpdated(demande);
    }

    return(
        <Wrapper>
            <Card style={{borderTop: '5px solid #3e99df', backgroundColor: '#F0F0F0', 
            marginBottom: '20px', padding: '10px',position: 'relative'}}>
            {demande.Valide===false && type!=='attente' && <div className="corner-ribbon top-right sticky red">Pas validé</div>}
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <Grid container justify='space-between' style={{borderBottom: '2px solid black'}}>
                                <Grid item>
                                    <Grid container spacing={2}> 
                                        <Grid item style={{paddingBottom: '0px'}}><FontAwesomeIcon icon={faUserGraduate} size="2x"  /></Grid>
                                        <Grid item><Typography variant='h5' style={{fontWeight: 'bold'}}>{demande.Titre}</Typography></Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                   <b>Publié le:</b> {formatDate(demande.DateParution)}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} >
                            <Grid container>
                                <Grid item xs={12} md={type!=='attente' ? 7: 12}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                           {
                                           auth?.user?.NiveauAcces!==AccessLevel.entreprise && auteur? getAuteurNom(auteur) : null
                                           }
                                        </Grid>
                                        <Grid item xs={12}>
                                            <b>Ville:</b> {demande.Ville}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <b>Établissement scolaire:</b>  {auteur? auteur.Ecole : null}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {type!=='attente' &&
                                <Grid item xs={12} md={5}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <b>Formation:</b> {demande.ProgrammesSuivi}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <b>Début:</b> {formatDate(demande.DateDebut)}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <b>Fin:</b> {formatDate(demande.DateFin)}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                }
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            {demande.Description}
                        </Grid>
                    </Grid>


                </CardContent>
                <CardActions>
                    <Grid container justify='space-between'>
                        <Grid item>
                            <Button variant="contained" color="primary" size="small"   
                                style={{textTransform: 'none', borderRadius: '0'}}
                                onClick={()=>history.push({
                                    pathname: '/dashboard/details/demande/'+demande._id,
                                    state: {data: demande, auteur: auteur}
                                })}
                                >
                                Détails
                            </Button>
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
                                        onClick={()=>{
                                            demande.Valide=true;
                                            offreDemandeUpdated(demande);
                                        }}
                                    >
                                        Accepter
                                    </Button>
                                </Grid>
                                </Grid>
                            :
                            auth?.user?.NiveauAcces!==AccessLevel.entreprise && 
                                <Grid container spacing={1}>
                                    <Grid item>
                                        <Button variant="outlined" size="small" 
                                        startIcon={  <FontAwesomeIcon icon={faEdit} color="green"/>}
                                        style={{textTransform: 'none', borderRadius: '0'}}
                                        onClick={()=>history.push({
                                            pathname: '/dashboard/edit/demande/'+demande._id,
                                            state: {data: demande}
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

export default DashboardCardDemande;

export const Wrapper = styled.div`

.corner-ribbon.top-right{
  top: 25px;
  right: -60px;
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
.corner-ribbon.blue{background: #39d;}
.corner-ribbon.white{background: #f0f0f0; color: #555;}
.corner-ribbon.black{background: #333;}
.corner-ribbon.grey{background: #999;}
.corner-ribbon.blue{background: #39d;}
.corner-ribbon.green{background: #2c7;}
.corner-ribbon.turquoise{background: #1b9;}
.corner-ribbon.purple{background: #95b;}
.corner-ribbon.red{background: #e43;}
.corner-ribbon.orange{background: #e82;}
.corner-ribbon.yellow{background: #ec0;}
`