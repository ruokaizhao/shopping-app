import { Box, TextField } from '@mui/material';
import debounce from 'lodash.debounce';
import React, { useCallback } from 'react';

function SearchBar({ setProducts, search, setSearch }) {

  const debounceSearchChange = useCallback(
    debounce((e) => setSearch(e.target.value), 1000)
  , [])  

  function handleSearchChange(e) {
    debounceSearchChange(e)    
  }

  function handleSearchSubmit(e) {
    e.preventDefault()
    fetch(`/api/search/${search}`)
    .then((r) => {
      if(r.ok) {
        r.json().then((products) => {
          setProducts(products)
        })
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
    <Box component="form" onSubmit={handleSearchSubmit}>
      <TextField variant="filled" hiddenLabel size="small" color="secondary" onChange={handleSearchChange} />
    </Box>
  );
}

export default SearchBar;