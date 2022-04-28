import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Product from "./Product";
import { fetchProductDetails } from '../features/productDetailSlice';
import Reviews from "./Reviews";
import { Grid } from '@mui/material';

function ProductDetail({ user, products }) {
  const params = useParams()
  const productDetails = useSelector((state) => state.productDetails.entities)
  const dispatch = useDispatch()

  // Product will first be undefined, and this will cause error if the Product want to access the id attribute of undefine, so the following
  // code sets product to be {} if the left part of || is undefine, and for unknown reason, access the id attribute of {} will not throw an
  // error. The reason to pass product as prop to Product instead of productDetails is that the rating comes from backend where it pulls the
  // average rating of all the reviews for a product, and thus the rating attribute in productDetails will not update unless you re-fetch the
  // data from backend, causing the rating not updated after submitting or editing an review. 
  // 
  // The App component will re-fetch the products which will have the latest data for rating, by doing so, the rating on the ProductDetail page
  // will update automatically.
  // The reason why I do not re-fetch the productDetail from the server is that, I cannot find a dependency array to let the useEffect to 
  // re-run, I tried putting products and productDetails as dependency array, but it will cause the frontend into a loop to endlessly fetch
  // data.

  const product = products.find((product) => product.id === parseInt(params.productId)) || {}


  useEffect(() => {
    dispatch(fetchProductDetails(params.productId))
  }, [])

  return (
    <div>
      <Grid container direction="column" spacing={4} alignContent="center">
        
        <Grid item justifyContent="center" >
          <Product product={product} user={user} />
        </Grid>
        
        <Grid item sx={{mb:4}} >
          {productDetails.reviews 
          ?
          <Reviews userId={user.id} />
          : null}
        </Grid> 
            
        
      </Grid>      
    </div>
  );
}

export default ProductDetail;