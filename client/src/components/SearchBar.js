import React, { useState } from 'react';

function SearchBar({ setProducts }) {
  const [search, setSearch] = useState("")

  function handleSearchChange(e) {
    setSearch(e.target.value)
  }

  function handleSearchSubmit(e) {
    e.preventDefault()
    fetch(`/api/search/${search}`)
    .then((r) => {
      if(r.ok) {
        r.json().then((products) => setProducts(products))
      } else {
        r.json().then((errors) => console.log(errors))
      }
    })
    // If there is only get "/search/:search" route, no get "/search" route in the backend, we need the following code to separate search of
    // "" or " " from other searches, since the search of "" or " " will hit "/search" instead of "/search/:search" route, resulting in
    // RoutingError.

    // if (search.replace(/\s/g, "") === "") {
    //   fetch("/api/products")
    //   .then((r) => {
    //     if (r.ok) {
    //       r.json().then((products) => onSearch(products))
    //     } else {
    //       r.json().then((errors) => console.log(errors))
    //     }
    //   })
    // } else {
    //   fetch(`api/search/${search}`)
    //   .then((r) => {
    //     if (r.ok) {
    //       r.json().then((products) => onSearch(products))
    //     } else {
    //       r.json().then((errors) => console.log(errors))
    //     }
    //   })
    // }
  }

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input type="text" id="searchbar" name="searchbar" value={search} onChange={handleSearchChange} />
        <button type="submit">Search</button>
      </form>
      
    </div>
  );
}

export default SearchBar;