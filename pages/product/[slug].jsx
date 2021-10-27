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
import data from '../../public/data';
import Head from 'next/head';
import NextLink from 'next/link';
import { AddShoppingCartRounded, KeyboardReturnRounded } from '@material-ui/icons';
import slugStyles from '../../styles/slugStyles';
import { useContext } from 'react';
import { Store } from '../../styles/Store';


export default function ProductScreen() {
  const router = useRouter();
  const { slug } = router.query;
  const product = data.products.find((a) => a.slug === slug);
  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  const {state} = useContext(Store);
  const {darkMode} = state;

  const classes = slugStyles();

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
        <IconButton title="back" color={darkMode ? 'secondary' : 'primary'}>
          <KeyboardReturnRounded />
        </IconButton>
      </NextLink>
      <Divider textAlign="center" className={classes.title}>
        <Typography variant="h1" component="h1">
          {product.name}
        </Typography>
      </Divider>
      <br />
      <Grid container spacing={2}>
        <Grid item md={6} sm={12} xs={12}>
          <Image
            title={product.name}
            src={product.image}
            layout="responsive"
            width={640}
            height={640}
            alt={product.name}
          />
        </Grid>
        <Grid container md={6} sm={12} xs={12}>
          <Grid item md={12} sm={6} xs={12}>
            <Card variant="outlined">
              <List>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Price</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>${product.price}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Status</Typography>
                    </Grid>
                    <Grid item xs={6}>
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
                  >
                    Add to cart
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
