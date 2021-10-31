import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  Button,
  CardActionArea,
  Grid,
  IconButton,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import { Card, Divider } from '@mui/material';
import data from '../../utils/data';
import Head from 'next/head';
import NextLink from 'next/link';
import { AddShoppingCartRounded, KeyboardReturnRounded } from '@material-ui/icons';
import slugStyles from '../../styles/slugStyles';
import { useContext, useEffect } from 'react';
import { Store } from '../../utils/Store';
import Product from '../../models/Product';
import db from '../../utils/db';
import axios from 'axios';


export default function ProductScreen(props) {
   const { product } = props;
   const router = useRouter();

  if (!product) {
    setTimeout(function(){
      return 0
    }, 4000)
    return <div>Produto não encontrado</div>;
  }

  const {state, dispatch} = useContext(Store);
  const {darkMode, cart} = state;
  const {cartItems} = cart;
  
  const existingItem = cartItems.find(item => item._id === product._id);


  const classes = slugStyles();

  const addToCartHandler = async () =>{
    const {data} = await axios.get(`/api/products/${product._id}`);
    if(data.countInStock <= 0 ) {
      alert('Sorry. Product is out of stock!');
      return;
    }
    dispatch({type: 'CART_ADD_ITEM', payload: {...product, quantity: 1}});
    router.push('/cart');
  };

  return (
    <div>
      <Head>
        <title>
          {product ? `${product.name} - Next Amazon` : 'Next Amazon'}
        </title>
        <meta
          name="description"
          content={product ? `${product.description}` : ''}
        ></meta>
        <meta
          name="keywords"
          content={`${product.category}, ${product.brand}`}
        ></meta>
      </Head>
      <NextLink href="/" passHref>
        <IconButton title="back" color={!darkMode ? 'primary' : 'secondary'}>
          <KeyboardReturnRounded />
        </IconButton>
      </NextLink>
      <Divider textAlign="center" className={classes.divider}>
        <Typography variant="h1" component="h1">
          {product.name}
        </Typography>
      </Divider>
      <br />
      <Grid container spacing={2}>
        <Grid item md={7} sm={12} xs={12}>
          <Image
            title={product.name}
            src={product.image}
            layout="responsive"
            width={640}
            height={640}
            alt={product.name}
          />
        </Grid>
        <Grid container md={5} sm={12} xs={12}>
          <Grid item md={12} sm={6} xs={12}>
            <Card variant={darkMode ? 'outlined' : 'elevation'} elevation={16} className={classes.darkCard}>
              <List>
                <ListItem>
                  <Grid container>
                    <Grid item md={6} xs={6} sm={6}>
                      <Typography>Price</Typography>
                    </Grid>
                    <Grid item md={6} xs={6} sm={6}>
                      <Typography>${product.price}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item md={6} xs={6} sm={6}>
                      <Typography>Status</Typography>
                    </Grid>
                    <Grid item md={6} xs={6} sm={6}>
                      <Typography>
                        {product.countInStock > 0 ? 'On stock' : 'Unavailable'}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Button
                    fullWidth
                    startIcon={<AddShoppingCartRounded />}
                    variant="contained"
                    color="secondary"
                    onClick={addToCartHandler}
                  >
                    {existingItem ? 'Item in cart' : 'Add to cart'}
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>

          <Grid item md={12} sm={6} xs={12}>
            <List>
              <ListItem>
                <Typography component="h2">
                  Category: {product.category}
                </Typography>
              </ListItem>
              <ListItem>Brand: {product.brand}</ListItem>
              <ListItem>
                Rating: {product.rating} stars ({product.numReviews} reviews){' '}
              </ListItem>
              <ListItem>Description: {product.description}</ListItem>
            </List>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
export async function getStaticPaths(context) {
  
  await db.connect();
  const products = await Product.find({ }).lean();
  await db.disconnect();

  const paths = products.map(product => {
    return {params: {slug: product.slug}}
  })

  return {
    paths,
    fallback: true,
  };
}
export async function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}