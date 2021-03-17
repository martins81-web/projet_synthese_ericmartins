import { Grid, Typography } from '@material-ui/core';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import useAuth from './auth/useAuth';

type Props = {
    
};

const Footer: React.FC<Props> =()=>{
    const location = useLocation(); 
    const token = Cookies.get('connected');

    const auth = useAuth();
    return(
        <Wrapper location={location}>
            <Grid container
                direction='row'
                justify="space-between"
            >
                <Grid item>
                    <Typography>© 2021 <Link to="/accueil" className='eStage'>eStage</Link> - Projet de Synthèse - Eric Martins</Typography>  
                </Grid>
                <Grid item>
                    <Grid container spacing={4}>
                        <Grid item><Link to="/accueil">Accueil</Link></Grid>
                        <Grid item><Link to="/apropos">À propos</Link></Grid>
                        <Grid item><Link to="/confidentialite">Confidentialité</Link></Grid>
                        <Grid item><Link to="/contact">Nous Joindre</Link></Grid>
                        {
                        !location.pathname.includes("/dashboard") && token &&
                            <Grid item>{auth?.user !== null ? <Link to="/dashboard" style={{color: 'dodgerblue'}}>Dashboard</Link> :null}</Grid>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Wrapper>
    )
}

export default Footer;


export const Wrapper = styled.div<{location: any}>`
    padding: 30px 100px 30px 100px;
    background-color: WhiteSmoke;
    a{
        color: black
    }
    a:hover{
        font-weight: bold;
        text-decoration: none;
    }
    .eStage{
        color:  #3e99df;
    }
    ${({ location }) => location.pathname.includes("/dashboard") && `
    background: #3e99df;
    color: white;
    a{
        color: white
    }
    .eStage{
        color:  black;
    }
  `}
    
`