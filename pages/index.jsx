import Head from 'next/head';
import NextLink from 'next/link';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import data from '../utils/data';
import { AddShoppingCartRounded } from '@material-ui/icons';
import landingPageStyles from '../styles/landingPage';
import db from '../utils/db';
import Product from '../models/Product';

export default function Home(props) {

  const {products} = props;
  console.log(products);
  
  const classes = landingPageStyles();

  return (
    <>
      <Head>
        <title>Next Amazon</title>
      </Head>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        className={classes.title}
      >
        Product list
      </Typography>
      <Grid container spacing={5}>
        {products.map((product) => (
          <Grid item md={4} sm={6} key={product.name}>
            <Card
              className={classes.card}
              variant="elevation"
              elevation={8}
              color="primary"
            >
              <NextLink href={`/product/${product.slug}`}>
                <CardActionArea>
                  <CardMedia component="img" image={product.image} />
                  <CardContent>
                    <Typography component="h2">{product.name}</Typography>
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


export async function getServerSideProps(){
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  }
}