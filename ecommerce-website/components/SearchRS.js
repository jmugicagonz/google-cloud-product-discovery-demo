import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react'
import { searchQuery } from '../lib/retailSearch';

export default function SearchRS( { setResults, setFacets } ) {
  const [formInput, setFormInput] = useState("");
  const handleChange = (event) => {
    setFormInput(event.target.value);
    //TODO: Implement here the autocomplete
  };
  const handleSummit = async (event) => {
    event.preventDefault();
    await searchQuery(formInput).then((response) => {
      if(response) {
        console.log(["response",response])
        setResults(response.results)
        setFacets(response.facets)
      }
    })
  };
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