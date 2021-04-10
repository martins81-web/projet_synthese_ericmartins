import { Container, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';


type Props = {
    
};
//page statique
const FormSubmittedMerci: React.FC<Props> =()=>{
    return(
        <Container className='politique'>
            <Typography variant='h3' >Merci de nous contacter!</Typography>  
            <Typography>Nous vous remercions de nous avoir contacté. </Typography>  
            <Typography>Un de nos collègues communiquera avec vous dans les plus bref des délais!</Typography> 
            <Typography style={{marginBottom: '20px'}}><b>Passez une bonne journée!!</b></Typography>    
            <Link to="/accueil"  >Retourner à l'accueil</Link>
        </Container>
    )
}

export default FormSubmittedMerci;