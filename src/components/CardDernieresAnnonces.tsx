import { Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import useAuth from './auth/useAuth';

import { fetchUtilisateur, updateOffreDemande } from '../Api';
import { Appel, AccessLevel } from '../Enum';
import { OffresDemandesType, UtilisateursType } from '../Types';






type Props = {
    type: Appel,
    offreDemande?: OffresDemandesType |undefined,
    cardType?: string,
    toast?: (text: string) => void,
};


const CardDernieresAnnonces: React.FC<Props> =({type,offreDemande,cardType, toast})=>{
    const [auteur, setAuteur] = useState<UtilisateursType | undefined>(undefined);
    const history= useHistory();
    const auth = useAuth();

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

    const handlePostulerContacter =()=>{
        if(auth?.user?.NiveauAcces===AccessLevel.stagiaire && type===Appel.OFFRE){
            let dejaPostule=offreDemande?.Communications.find(communication=>communication.EnvoyeParID===auth?.user?._id);
            
            let communication= {
                Date: new Date(),
                EnvoyeParID: auth.user._id,
                Message: 'Postulation',
                NbMessages: 0,
            };

            if(!dejaPostule){
                offreDemande?.Communications.push(communication);
                toast && toast("Vos informations ont été envoyé à l'entreprise!");
                offreDemande && updateOffreDemande(offreDemande);
            }  else {
                toast && toast('Vous avez déjà postulé pour cette offre de stage.');
            } 

        } else if ( auth?.user?.NiveauAcces===AccessLevel.entreprise && type===Appel.DEMANDE){
            history.push({
                pathname: '/dashboard/details/demande/'+offreDemande?._id,
                state: {data: offreDemande}
            })
        } else if (type===Appel.OFFRE && auth?.user?.NiveauAcces!==AccessLevel.stagiaire) {
            toast && toast('Vous devez être connecté en tant que stagiaire pour pouvoir postuler sur une offre de stage.');
            if(!auth?.user)
            history.push('/login');
        } else {
            toast && toast("Vous devez être connecté en tant qu'entreprise pour pouvoir contacter le candidat d'une demande de stage.");
            if(!auth?.user)
            history.push('/login');
        }
    }

    return(
        <div data-testid='CardDerniersAnnonces' style={{width: '100%'}}>
        <Wrapper className='card' style={{height: '100%'}} >
            
            {offreDemande!==undefined && 
            <Card style={{height: '100%',display: 'flex',flexDirection: 'column', justifyContent:'space-between'}}>
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
                        <Grid item xs={12} sm={12} md={4} >
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
                        name='buttonDetails'
                        onClick={()=>history.push({
                            pathname: type===Appel.OFFRE ? '/accueil/offre/'+offreDemande._id : '/accueil/demande/'+offreDemande._id ,
                            state: {data: offreDemande}
                        })}
                    >
                        Détails
                    </Button>
                    <Button className='actionbutton2 button'  variant="contained" size="medium" name='buttonPostuler' 
                    onClick={handlePostulerContacter}
                    >
                        {type===Appel.OFFRE? 'Postuler' : 'Contacter candidat'}
                    </Button>
                </CardActions>
            </Card>
            }
        </Wrapper>
        </div>
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