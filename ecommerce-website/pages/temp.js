import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import HomeIcon from '../components/HomeIcon';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import HeadBar from '../components/HeadBar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import SearchRS from '../components/SearchRS';
import { ScopedCssBaseline } from '@mui/material';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function Album() {
  return (
    <ThemeProvider theme={theme}>
      <ScopedCssBaseline>
        <HeadBar />
        <main>
        {/* Hero unit */}
        <Box
            sx={{
            pt: 6,
            pb: 6,
            }}
        >
            <SearchRS/>
        </Box>
        <Container sx={{ pb: 6 }} maxWidth="md">
            <Typography gutterBottom variant="h5" component="h2">
                Products found
            </Typography>
            {/* End hero unit */}
            <Grid container spacing={2}>
            {cards.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                    <CardMedia
                    component="img"
                    image="https://source.unsplash.com/random"
                    alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                            Product Title
                        </Typography>
                        <Typography>
                            Product description.
                        </Typography>
                    </CardContent>
                    <CardActions>
                    <Button size="small">View</Button>
                    </CardActions>
                </Card>
                </Grid>
            ))}
            </Grid>
        </Container>
        </main>
      </ScopedCssBaseline>
    </ThemeProvider>
  );
}