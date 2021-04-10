import React from 'react';
import { Link } from 'react-router-dom';
import imgNotFound from '../images/notFound.jpg';
import Image from 'react-bootstrap/Image';
import { Grid } from '@material-ui/core';

type Props = {
};

const NotFound: React.FC<Props> =()=>{
    return(
    <Grid container >
        <Grid item xs={12}>
            <Grid container  justify='center'>
                <Image src={imgNotFound} fluid alt="not found"/> 
            </Grid>
        </Grid>
        <Grid item xs={12}>
            <Grid container  justify='center'>
                <Link to="/">
                    <b>Revenir sur la page d'accueil</b>
                </Link>
            </Grid>  
        </Grid>    
    </Grid>
    );
}

export default NotFound;