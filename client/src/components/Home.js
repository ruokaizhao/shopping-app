import { Grid } from '@mui/material';
import React from 'react';
import Product from './Product';

function Home({ products, user }) {

  return (
    <div>
      <Grid container >
        <Grid item xs={0} md={1} />
        <Grid item container xs={12} md={10} spacing={4}>
          {products.map((product) => {
            return(
              <Grid key={product.id} item xs={12} sm={6} md={4}>
                <Product  product={product} user={user} />
              </Grid>            
            )
          })}  
        </Grid>        
        <Grid item xs={0} md={1} /> 
      </Grid>         
    </div>
  );
}
export default Home;