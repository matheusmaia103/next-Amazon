import Head from 'next/head'
import NextLink from 'next/link';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from '@material-ui/core';
import data from '../public/data'
import { AddShoppingCartRounded } from '@material-ui/icons';
import landingPageStyles from '../styles/landingPage';

export default function Home() {

  const classes = landingPageStyles();

  return (
    <>
      <Head>
        <title>Next Amazon</title>
      </Head>
      <Typography variant="h4" component='h1' gutterBottom className={classes.title}>
        Product list
      </Typography>
      <Grid container spacing={3}>
        {data.products.map((product) => (
          <Grid item md={4} sm={6} key={product.name}>
            <Card className={classes.card}>
              <NextLink href={`/product/${product.slug}`}>
                <CardActionArea>
                  <CardMedia component="img" image={product.image} />
                  <CardContent>
                    <Typography component='h2'>{product.name}</Typography>
                  </CardContent>
                </CardActionArea>
              </NextLink>
              <CardActions>
                <Button variant="contained" color="primary">
                  ${product.price}
                </Button>
                <IconButton color="secondary">
                  <AddShoppingCartRounded />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
