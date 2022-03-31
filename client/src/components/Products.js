import React from 'react';
import Product from './Product';

function Products({ products, user }) {

  return (
    <div>
      {products.map((product) => {
        return(
          <Product key={product.id} product={product} user={user} />
        )
      })}
      
    </div>
  );
}
export default Products;