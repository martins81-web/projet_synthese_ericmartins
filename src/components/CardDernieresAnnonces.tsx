import { Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { fetchUtilisateur } from '../Api';
import { Appel } from '../Enum';
import { OffresDemandesType, UtilisateursType } from '../Types';






type Props = {
    type: Appel,
    offreDemande?: OffresDemandesType |undefined,
    cardType?: string
};


const CardDernieresAnnonces: React.FC<Props> =({type,offreDemande,cardType})=>{
    const [auteur, setAuteur] = useState<UtilisateursType | undefined>(undefined);
    const history= useHistory();

    useEffect(()=>{
        offreDemande && getAuteur(offreDemande.Auteur);
       
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

      //fetch l'auteur dans l'api
    const getAuteur = async (id: string) => {
        let auteur : UtilisateursType| undefined = await fetchUtilisateur(id);
        //console.log(auteur);
        setAuteur(auteur);
    }

   //retourne le nom d'entreprise si c'est une offre sinon ça retourne la ville de la demande de stage
    const getAuteurNom = (auteur:UtilisateursType)=>{
        let auteurNom = type==='offre' ? auteur.NomEntreprise : auteur.Ville;
        return auteurNom;
    }

    //retourne le logo de l'entreprise
    const getLogo = (auteur:UtilisateursType)=>{
        return auteur.Logo;
    }
    
    return(
        <Wrapper className='card'>
            
            {offreDemande!==undefined && 
            <Card  style={{display: 'flex',justifyContent: 'space-between', flexDirection: 'column', height: '100%', width:'100%'}}>
                <CardHeader 
                    title={offreDemande.Titre}
                    subheader={auteur? getAuteurNom(auteur) : null}
                />
                <CardContent>
                    <Grid container alignItems='center'>
                        <Grid item xs={type===Appel.OFFRE && cardType!== 'mini' ? 8:12}>
                            <Typography className='descriptionEllipsis'>
                                {offreDemande.Description}
                            </Typography> 
                        </Grid >
                        { type===Appel.OFFRE && cardType!== 'mini' &&
                        <Grid item xs={4}>
                            <Grid container justify='center' >
                                {auteur && <Typography variant='h2'>{getLogo(auteur)}</Typography>}
                            </Grid>
                        </Grid>
                        }
                    </Grid>
                    
                </CardContent>
                <CardActions>
                    <Button 
                        className='actionbutton1 button' 
                        variant="contained" 
                        size="medium"
                        onClick={()=>history.push({
                            pathname: type===Appel.OFFRE ? '/accueil/offre/'+offreDemande._id : '/accueil/demande/'+offreDemande._id ,
                            state: {data: offreDemande}
                        })}
                    >
                        Détails
                    </Button>
                    <Button className='actionbutton2 button'  variant="contained" size="medium" >
                        {type===Appel.OFFRE? 'Postuler' : 'Contacter candidat'}
                    </Button>
                </CardActions>
            </Card>
            }
        </Wrapper>
    )
}

export default CardDernieresAnnonces;

export const Wrapper = styled.div`
width: 100%;

.actionbutton1{
    color: dodgerblue;
    background-color: white;
} 

.actionbutton2 {
    color: white;
    background-color: dodgerblue;
}
.button {
    text-transform: none;
    border-radius: 0px;
}

.descriptionEllipsis{
    display: -webkit-box;
    -webkit-line-clamp: 2; //Limite le text à 2 lignes
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.MuiTypography-h2{
    font-weight: bold
}

`