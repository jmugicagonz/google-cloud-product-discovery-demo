//For reference, see: https://mui.com/material-ui/react-drawer/

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import SimpleAccordion from './SimpleAccordion';

export default function TemporaryDrawer( { facets } ) {
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(false)}
    >
      {facets.map((facet) => {
        return(
            <SimpleAccordion name={facet.key} checkboxes={facet.values} key={facet.key}/>
        )
      })}
    </Box>
  );

  return (
    <div>
        <React.Fragment key={'left'}>
          <Button onClick={toggleDrawer(true)}>filter</Button>
                <Drawer
                    anchor={'left'}
                    open={state}
                    //onClose={}
                >
                    {list()}
                    <Button onClick={toggleDrawer(false)}>Close</Button>
                    <Button onClick={toggleDrawer(false)}>Apply Filters</Button>
                </Drawer>
        </React.Fragment>
    </div>
  );
}
