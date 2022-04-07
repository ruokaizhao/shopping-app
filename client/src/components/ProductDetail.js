import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Product from "./Product";
import { fetchProductDetails } from './productDetailSlice';
import Reviews from "./Reviews";

function ProductDetail({ user }) {
  const params = useParams()
  const productDetails = useSelector((state) => state.productDetails.entities)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProductDetails(params.productId))
  }, [params.productId])

  return (
    <div>
      <Product product={productDetails} user={user} />
      {productDetails.reviews ?
      <Reviews reviews={productDetails.reviews} userId={user.id} productId={productDetails.id} setProductDetails={setProductDetails} productDetails={productDetails} />
      : null}
    </div>
  );
}

export default ProductDetail;