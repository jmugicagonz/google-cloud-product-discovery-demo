import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import { searchQuery, autocomplete } from '../lib/retailSearch';
import { useState } from 'react';

export default function SearchAutocomplete( { setResults } ) {
    const [formInput, setFormInput] = useState("");
    const handleChange = (event) => {
        setFormInput(event.target.value);
        //TODO: Implement here the autocomplete
        autocomplete(event.target.value)
    };
    const handleSummit = async (event) => {
        event.preventDefault();
        await searchQuery(formInput).then((results) => setResults(results))
    };
    return (
        <Box
        component="form"
        sx={{
        '& > :not(style)': { m: 1, width: '50ch' },
        }}
        noValidate
        autoComplete="off"
        alignItems="center"
        onSubmit={handleSummit}
        justifyContent="center"
        >
            <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={top100Films.map((option) => option.name)}
            filterOptions={(x) => x}
            noOptionsText="No suggestions"
            renderInput={(params) => <TextField {...params} label="Search products" onChange={handleChange} value={formInput}/> }
            />
        </Box>
    );
}

function SearchRS( { setResults } ) {
    
    return (
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '50ch' },
        }}
        noValidate
        autoComplete="off"
        align="center"
        onSubmit={handleSummit}
      >
        <TextField id="search" type="search" label="Search products" variant="outlined" onChange={handleChange} value={formInput}/>
      </Box>
    );
  }

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { name: 'T-shirt noir'},
  { name: 'T-shirt blanc'},
];
