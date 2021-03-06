import { Grid, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { fetchOffresDemandes } from '../Api';
import { Appel } from '../Enum';
import { OffresDemandesType } from '../Types';
import CardDernieresAnnonces from './CardDernieresAnnonces';


type Props = {
    toast: (text: string)=> void
};

//section offre vedettes
const OffresVedettes: React.FC<Props> =({toast})=>{
    const [offres, setOffres] = useState<OffresDemandesType[]>([]);
    
    useEffect(()=>{
        getOffres();
       
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

    const getOffres = async () => {
        let offres : OffresDemandesType[] | undefined = await fetchOffresDemandes();
        // Filtre les offres, valides et vedettes
        offres = offres.filter(offre=> offre.Supprime===false && offre.Type==='offre' && offre.Valide && offre.Vedette);
        // Trié par date
        offres.sort((a, b) => (a.DateParution < b.DateParution) ? 1 : -1);
        // Garde juste les 4 offre vedettes les plus récentes
        offres.splice(4,offres.length-4);
        setOffres(offres);  
    }
    
    return(
        <Wrapper >

            <Grid container style={{position: 'relative'}} justify='center'>
            <div className="corner-ribbon top-right sticky golden" >VEDETTE</div>

                <Grid item>
                    <Grid container  justify='center' >
                        <Grid item xs={6} sm={8}>
                            <Typography variant='h3' className='title'>Offres de stage</Typography>
                        </Grid>
                    </Grid>
                    <Grid container justify='center' >
                        <Grid item xs={11} lg={9}>
                            <Grid container spacing={2} alignItems='stretch' justify='center'>
                                {offres.length>0 && offres.map(offre=>(
                                    <Grid item key={offre._id} xs={12} sm={6} md={3} lg={3} xl={3} style={{display: 'flex'}}>
                                        <CardDernieresAnnonces type={Appel.OFFRE}  offreDemande={offre} cardType='mini' toast={(text)=>toast(text)}/>
                                    </Grid>
                                ))}
                                
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
       </Wrapper>
    )
}

export default OffresVedettes;

export const Wrapper = styled.div`

background: rgb(63,94,251);
background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(70,230,252,1) 100%);

padding-bottom: 50px;
overflow: hidden;
.title{
    color: white	;
    font-weight: bold;
    padding-top: 50px;
    padding-bottom: 50px;
    text-transform: uppercase;
    text-align: center;
}
.corner-ribbon.top-right{
  top: 25px;
  right: -50px;
  left: auto;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  overflow: hidden;
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
  font-weight: bold;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}

.corner-ribbon.golden {
    background: radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 20%, #FDB931 25%, #9f7928 60%, #8A6E2F 50%, transparent 20%), 
    radial-gradient(ellipse farthest-corner at left top, #FFFFFF 5%, #FFFFAC 15%, #D1B464 35%, #5d4a1f 95%, #5d4a1f 90%);
}

`