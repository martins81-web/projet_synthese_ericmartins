import { Grid, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { fetchSecteursActivite } from '../Api';
import { SecteursActiviteType } from '../Types';



type Props = {
    selectedSecteurId: (id: string|undefined)=>void
};

const ListSecteurs: React.FC<Props> =({selectedSecteurId})=>{
    const [secteursActivites, setSecteursActivites] = useState<SecteursActiviteType[]>([]);
    const [selectedSecteur, setSelectedSecteur] = useState<SecteursActiviteType | undefined>(undefined);
    selectedSecteurId(selectedSecteur?._id);
    useEffect(()=>{
        getSecteursActivites();
      // eslint-disable-next-line react-hooks/exhaustive-deps
     
      },[])
    
      //fetch les secteurs dans l'api
    const getSecteursActivites = async () => {
        let secteursActivites : SecteursActiviteType[] | undefined = await fetchSecteursActivite();
        secteursActivites = secteursActivites.filter(secteur=> secteur.Supprime===false);
        //trie par ordre alphabétique
        secteursActivites.sort((a, b) => (a.Titre > b.Titre) ? 1 : -1);

        setSecteursActivites(secteursActivites);
    }
    
    return(
        secteursActivites &&
        <Wrapper>
            <Grid container justify='center'>
                <Grid item xs={10}>
                    <Grid container >
                        <Grid item xs><Typography variant='h6' className='titleLine'>Secteurs d'activité</Typography></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={10}>
                    <List >
                        {
                        secteursActivites?.map( secteur => (
                            <ListItem 
                                className='listItem' 
                                button key={secteur._id} 
                                dense
                                selected={selectedSecteur?._id===secteur._id}
                                onClick={()=>{selectedSecteur?._id===secteur._id ? setSelectedSecteur(undefined) :setSelectedSecteur(secteur)}}
                            >
                                <ListItemText primary={secteur.Titre} />
                            </ListItem>
                        ))
                        }
                    </List>
                </Grid>
            </Grid>
        </Wrapper>
    )
}

export default ListSecteurs;


export const Wrapper = styled.div`
.listItem{
    background-color: #F0F0F0;
    border-left: 7px solid #dcdcdc;
    margin-bottom: 2px;
}
.listItem:hover{
    background-color: #C0C0C0
}
.Mui-selected{
    background-color: #C0C0C0 !important
}

.titleLine {
    overflow: hidden;
}


.titleLine::after {
    content: " ";
    display: inline-block;
    height: 1em;
    vertical-align: bottom;
    width: 100%;
    margin-right: -100%;
    margin-left: 10px;
    border-top: 8px solid #707070;
}

 `