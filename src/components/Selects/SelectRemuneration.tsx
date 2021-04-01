import { FormControl, MenuItem, TextField } from '@material-ui/core';
import React from 'react';



type Props = {
    selected?: string,
    onChange: (secteur: string | undefined)=>void
};

const SelectRemuneration: React.FC<Props> =({selected, onChange})=>{
    const [remuneration, setRemuneration] = React.useState(selected||'');
    const remunerations=['Oui', 'Non', 'À la discrétion de l’entreprise']

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRemuneration(event.target.value as string);
    onChange(event.target.value as string)
  };

    return(
        <>
        <FormControl style={{minWidth: '200px'}}>
            <TextField
                variant="outlined"
                label="Rémunération"
                id="selectRemuneration"
                required
                select
                fullWidth
                value={remuneration}
                onChange={(event)=>handleChange(event)}
                margin='dense'
            >
                {
                remunerations.map((remuneration,index) => (
                    <MenuItem key={index+remuneration} value={remuneration}>{remuneration}</MenuItem>
                ))
                }
            </TextField> 
        </FormControl>

      
       </>
    )
}

export default SelectRemuneration;