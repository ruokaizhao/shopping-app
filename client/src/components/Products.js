import React from 'react';
import Product from './Product';

function Products({ products }) {


  return (
    <div>
      {products.map((product) => {
        return(
          <Product key={product.id} product={product} />
        )
      })}
      
    </div>
  );
}
export default Products;