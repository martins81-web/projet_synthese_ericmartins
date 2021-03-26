import { Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import styled from 'styled-components';

import bgContact from '../images/contact.jpg';

type Props = {
    
};



const NousJoindre: React.FC<Props> =()=>{

    return(
      <Wrapper backgroundUrl={bgContact}>
        <Container className='contact'>
          <form action="https://formsubmit.co/eric.martins.01@edu.cegeptr.qc.ca" method='post'>
            <Grid container spacing={3} className='contactForm' >
              <Grid item xs={12}>
                <Typography variant='h3'>Nous joindre</Typography> 
                <p>Écrivez nous si vouz avez un problème, une question ou une sugestion.</p>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField id="outlined-basic" label="Prénom" variant="outlined" fullWidth name='prenom'  required/>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField id="outlined-basic" label="Nom" variant="outlined" fullWidth name='nom' required/>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField id="outlined-basic" label="Courriel" variant="outlined" fullWidth  name='courriel' required type='email'/>
              </Grid>
              <Grid item xs={12}>
                <TextField id="outlined-basic" label="Message" variant="outlined"  multiline rows='5' fullWidth name='message' required/>
              </Grid>
              <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<SendIcon/>}
                    type='submit'
                    
                  >
                    Envoyer
                  </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Wrapper>
    )
}

export default NousJoindre;

export const Wrapper = styled.div<{backgroundUrl: string}>`
    background-image: url(${props => props.backgroundUrl});
    
    
    
`