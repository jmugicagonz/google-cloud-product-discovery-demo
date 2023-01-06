import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckboxLabels from './CheckboxLabels';

export default function SimpleAccordion( { name, checkboxes } ) {
  return (
    <Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
        >
            <Typography>{name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            {checkboxes.map((checkbox) => {
               return(
                    <CheckboxLabels label={checkbox.value} key={checkbox.value} count={checkbox.count}/>
               )     
            })}
        </AccordionDetails>
    </Accordion>
  );
}