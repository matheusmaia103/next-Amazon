import { Button, Card, Grid, Link, List, ListItem, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import React, { useContext } from 'react'
import { Store } from '../utils/Store'
import NextLink from 'next/link'
import Image from 'next/image';
import Head from 'next/head';

export default function cartScreen() {
    const {state} = useContext(Store);
    const { cart } = state;
    const { cartItems } = cart;

    return (
      <>
        <Head>
          <title>Shopping cart</title>
        </Head>
        <Typography variant="h1" component="h1">
          Shopping cart
        </Typography>
        {cartItems.length === 0 ? (
          <Typography variant="subtitle1" component="h2">
            Your shopping cart is empty
          </Typography>
        ) : (
          <Grid container spacing={2}>
            <Grid item md={8} xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow>
                        <TableCell>
                          <NextLink href={`/product/${item.slug}`} passHref>
                            <Link>
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={50}
                                height={50}
                                title={item.name}
                              />
                            </Link>
                          </NextLink>
                        </TableCell>
                        <TableCell>
                          <NextLink href={`/product/${item.slug}`} passHref>
                            <Typography variant="subtitle2" component="h3">
                              {item.name}
                            </Typography>
                          </NextLink>
                        </TableCell>
                        <TableCell>
                          <Select value={item.quantity + 1}>
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <MenuItem key={x + 1} value={x + 1}>
                                {x}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                        <TableCell>${item.price}</TableCell>
                        <TableCell>
                          <Button variant="contained" color="secondary">
                            x
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid md={4} xs={12}>
              <Card elevation={24}>
                <List>
                  <ListItem>
                    <Typography variant="h2">
                      Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                      items) :
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant='h4'>
                      ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Button variant="contained" color="secondary" fullWidth>
                      Check out
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        )}
      </>
    );
}
