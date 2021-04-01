import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

type Props = {
    selected?: string,
    onChange: (secteur: string | undefined)=>void
};

const SelectTypeStage: React.FC<Props> =({selected, onChange})=>{
    const classes = useStyles();
    const [typeStage, setTypeStage] = React.useState(selected||'');
    const typesStages=['Alternance travail études', 'Temps plein', 'Temps partiel']

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTypeStage(event.target.value as string);
    onChange(event.target.value as string)
  };







    return(
        <>
        <FormControl style={{minWidth: '200px'}}>
            <TextField
                variant="outlined"
                label="Type de stage"
                id="selectTypeStage"
                required
                select
                fullWidth
                value={typeStage}
                onChange={(event)=>handleChange(event)}
            >
                {
                typesStages.map((type,index) => (
                    <MenuItem key={index+type} value={type}>{type}</MenuItem>
                ))
                }
            </TextField> 
        </FormControl>

      
       </>
    )
}

export default SelectTypeStage;
