import React from 'react';
import Product from './Product';

function Products({ products, cart, setCart }) {


  return (
    <div>
      {products.map((product) => {
        return(
          <Product key={product.id} product={product} cart={cart} setCart={setCart} />
        )
      })}
      
    </div>
  );
}
export default Products;