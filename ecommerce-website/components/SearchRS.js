import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react'
import { searchQuery, autocomplete } from '../lib/retailSearch';

export default function SearchRS( { setResults } ) {
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
      align="center"
      onSubmit={handleSummit}
    >
      <TextField id="search" type="search" label="Search products" variant="outlined" onChange={handleChange} value={formInput}/>
    </Box>
  );
}