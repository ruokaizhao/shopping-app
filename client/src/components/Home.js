import React from 'react';
import Product from './Product';
import "../styling/Home.css"

function Home({ products, user }) {

  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />

        <div className="home__row">
      {products.map((product) => {
        return(
          <Product key={product.id} product={product} user={user} />
        )
      })}
      
    </div>
    </div>
    </div>
  );
}
export default Home;