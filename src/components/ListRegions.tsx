import { Grid, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { fetchRegions } from '../Api';
import { RegionsType } from '../Types';



type Props = {
    selectedRegionId: (id: string|undefined)=>void
};

const ListRegions: React.FC<Props> =({selectedRegionId})=>{
    const [regions, setRegions] = useState<RegionsType[]>([]);
    const [selectedRegion, setSelectedRegion] = useState<RegionsType | undefined>(undefined);
    selectedRegionId(selectedRegion?._id);
    useEffect(()=>{
        getRegions();
      // eslint-disable-next-line react-hooks/exhaustive-deps
     
      },[])

    const getRegions = async () => {
        let regions : RegionsType[] | undefined = await fetchRegions();
        regions = regions.filter(region=> region.Supprime===false);
        regions.sort((a, b) => (a.Name > b.Name) ? 1 : -1);

        setRegions(regions);
    }
    
    return(
        regions &&
        <Wrapper>
            <Grid container justify='center'>
                <Grid item xs={10}>
                    <Grid container>
                        <Grid item xs><Typography variant='h6' className='titleLine'>Regions</Typography></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={10}>
                    <List >
                        {
                        regions?.map( region => (
                            <ListItem 
                                className='listItem' 
                                button key={region._id} 
                                dense
                                selected={selectedRegion?._id===region._id}
                                onClick={()=>{selectedRegion?._id===region._id ? setSelectedRegion(undefined) :setSelectedRegion(region)}}
                            >
                                <ListItemText primary={region.Name} />
                            </ListItem>
                        ))
                        }
                    </List>
                </Grid>
            </Grid>
        </Wrapper>
    )
}

export default ListRegions;


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