import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from './HomeIcon';

export default function HeadBar() {
  return (
    <AppBar position="relative">
        <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <HomeIcon/>
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
                Retail Search
            </Typography>
        </Toolbar>
    </AppBar>
  );
}