import { Breadcrumbs, Grid, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Appel } from '../Enum';
import AppelAction from './AppelAction';
import ListOffresDemandes from './ListOffresDemandes';
import ListRegions from './ListRegions';
import ListSecteurs from './ListSecteurs';

type Props = {
    type: Appel
};

const OffresDemandes: React.FC<Props> =({type})=>{
    const [selectedSecteurID, setSelectedSecteurID] = useState<string | undefined>(undefined);
    const [selectedRegionID, setSelectedRegionID] = useState<string | undefined>(undefined);
     //MediaQueries
     const theme = useTheme();
     const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

    return(
        <Grid container>
            <Grid item>
                <Grid container style={{padding: '50px'}} spacing={matchesMD? 4:0}>
                    <Grid item xs={12} sm={12} md={8}>
                        <Grid container direction='column' spacing={4}>
                            <Grid item xs>
                                <Breadcrumbs  separator={<NavigateNextIcon fontSize="small" />}  aria-label="breadcrumb">
                                    <Link color="inherit" to="/accueil">
                                        Accueil
                                    </Link>
                                    <Typography color="textPrimary">{type.toString().charAt(0).toUpperCase()+type.slice(1)+'s de stage'}</Typography>
                                </Breadcrumbs>
                            </Grid>
                            <Grid item xs>
                                <ListOffresDemandes type={type} selectedSecteurID={selectedSecteurID} selectedRegionID={selectedRegionID}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={6} md={12} >
                                <ListSecteurs selectedSecteurId={setSelectedSecteurID}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={12}>
                                <ListRegions selectedRegionId={setSelectedRegionID}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <AppelAction type={type === Appel.OFFRE ? Appel.DEMANDE: Appel.OFFRE}/>
            </Grid>
        </Grid>
       
    )
}

export default OffresDemandes;


export const Wrapper = styled.div`
    

    
`