Product.create(
  title: "The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback",
  image: "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg",
  price: 50)


Product.create(
  title: "Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor",
  image: "https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg",
  price: 500)


Review.create(
  user_id: 1,
  product_id: 1,
  content: "great"
)

Review.create(
  user_id: 2,
  product_id: 1,
  content: "great!!!"
)