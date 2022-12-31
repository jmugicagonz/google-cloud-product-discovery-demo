import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import HeadBar from '../components/HeadBar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchRS from '../components/SearchRS';
import { ScopedCssBaseline } from '@mui/material';
import ProductCard from '../components/ProductCard';
import { useState } from 'react'


const theme = createTheme();

export default function Home() {
  const[resultsFound,setResultsFound] = useState()
  console.log(["results found: ",resultsFound])

  return (
    <>
      <Head>
        <title>EcommerceGCP</title>
        <meta name="description" content="Ecommerce explore" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
              <SearchRS setResults={setResultsFound}/>
          </Box>
          {resultsFound && <Container sx={{ pb: 6 }} maxWidth="md">
              <Typography gutterBottom variant="h5" component="h2">
                  Products found
              </Typography>
              {/* End hero unit */}
              <Grid container spacing={2}>
              {resultsFound?.map((result) => (
                  <Grid item key={result.id} xs={12} sm={6} md={4}>
                    <ProductCard product={result}/>
                  </Grid>
              ))}
              </Grid>
          </Container>}
        </main>
        </ScopedCssBaseline>
      </ThemeProvider>
    </>
  )
}
