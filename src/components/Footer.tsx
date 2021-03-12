import { Grid, Link, Typography } from '@material-ui/core';
import styled from 'styled-components';


type Props = {
    
};

const Footer: React.FC<Props> =()=>{
    return(
        <Wrapper>
            <Grid container
                direction='row'
                justify="space-between"
            >
                <Grid item>
                    <Typography>© 2021 <Link href="accueil" style={{color: 'blue'}}>eStage</Link> - Projet de Synthèse - Eric Martins</Typography>  
                </Grid>
                <Grid item>
                    <Grid container spacing={4}>
                        <Grid item><Link href="accueil">Accueil</Link></Grid>
                        <Grid item><Link href="apropos">À propos</Link></Grid>
                        <Grid item><Link href="confidentialite">Confidentialité</Link></Grid>
                        <Grid item><Link href="contact">Nous Joindre</Link></Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Wrapper>
    )
}

export default Footer;


export const Wrapper = styled.div`
    padding: 30px 100px 30px 100px;
    background-color: WhiteSmoke;
    a{
        color: black
    }
    a:hover{
        font-weight: bold;
        text-decoration: none;
    }
`