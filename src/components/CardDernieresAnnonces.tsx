import { Button, Card, CardActions, CardContent, CardHeader, Typography } from '@material-ui/core';
import styled from 'styled-components';

import { Appel } from '../Enum';


type Props = {
    type: Appel
};


const CardDernieresAnnonces: React.FC<Props> =({type})=>{
    return(
        <Wrapper>
            <Card>
                <CardHeader 
                    title="Card title"
                    subheader="Card subtitle"
                />
                <CardContent>
                    <Typography>
                    Lorem Ipsum dolor sit amet, consectetur adipiscing elit.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button className='actionbutton1' variant="contained" size="medium">Détails</Button>
                    <Button className='actionbutton2'  variant="contained" size="medium" >
                        {type===Appel.OFFRE? 'Postuler' : 'Contacter candidat'}
                    </Button>
                </CardActions>
            </Card>
        </Wrapper>
    )
}

export default CardDernieresAnnonces;

export const Wrapper = styled.div`
    margin: 10px;
    button{
        border-radius: 0px;
        text-transform: none;
    }
    .actionbutton1{
        color: dodgerblue;
        background-color: white;
   }
   .actionbutton2{
        color: white;
        background-color: dodgerblue;
   }


`