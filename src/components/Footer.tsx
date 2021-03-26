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
            <Grid container>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                    <Typography>© 2021 <Link to="/accueil" className='eStage'>eStage</Link> - Projet de Synthèse - Eric Martins</Typography>  
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9} xl={9}>
                    <Grid container justify='flex-end'>
                        <Grid item className='item'>
                            <Link to="/accueil" style={{fontWeight: location.pathname=== "/accueil" ? 'bold': 'normal' }}>
                                Accueil
                            </Link>
                        </Grid>
                        <Grid item className='item'>
                            <Link to="/apropos" style={{fontWeight: location.pathname=== "/apropos" ? 'bold': 'normal' }}>
                                À propos
                            </Link>
                        </Grid>
                        <Grid item className='item'>
                            <Link to="/confidentialite" style={{fontWeight: location.pathname=== "/confidentialite" ? 'bold': 'normal' }}>
                                Confidentialité
                            </Link>
                        </Grid>
                        <Grid item className='item'>
                            <Link to="/contact" style={{fontWeight: location.pathname=== "/contact" ? 'bold': 'normal' }}>
                                Nous Joindre
                            </Link>
                        </Grid>
                        {
                        !location.pathname.includes("/dashboard") && token &&
                            <Grid item className='item'>{auth?.user !== null ? <Link to="/dashboard" style={{color: 'dodgerblue'}}>Dashboard</Link> :null}</Grid>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Wrapper>
    )
}

export default Footer;


export const Wrapper = styled.div<{location: any}>`
    
    padding: 30px 50px 30px 50px;
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

  .item{
      margin-left: 20px
  }
    
`