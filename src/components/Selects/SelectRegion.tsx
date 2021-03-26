import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';

import { fetchRegions } from '../../Api';
import { RegionsType } from '../../Types';

type Props = {
    selectedId?: string,
    onChange: (region: RegionsType | undefined)=>void
};

const SelectRegion: React.FC<Props> =({selectedId,onChange})=>{
    const [regions, setRegions] = useState<RegionsType[]>([]);
    const [selectedRegion, setSelectedRegion] = useState<string|undefined>(selectedId);

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


    const handleChange =(event: React.ChangeEvent<{ value: unknown }>)=>{
        setSelectedRegion(event.target.value as string);
        let region= regions.find(region=> region._id===event.target.value);
        onChange(region);
    }


    return(
        <>
        {regions.length > 0?
        <FormControl style={{minWidth: '200px'}}>
            <InputLabel id="selectRegionLabel">Region</InputLabel>
            <Select
                displayEmpty
                labelId="selectRegionLabel"
                id="selectRegion"
                value={selectedRegion||""}
                onChange={(event)=>handleChange(event)}
            >
                {
                regions.map(region => (
                    <MenuItem key={region._id} value={region._id}>{region.Name}</MenuItem>
                ))
                }
            </Select> 
        </FormControl> : null
        }
       </>
    )
}

export default SelectRegion;

