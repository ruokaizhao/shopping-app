Welcome to Shopping App project!

This is a full-stack project using React to build the frontend and Ruby on Rails to build the backend.

The data used in this project is some fake data about several items for sale.

## Installation

Fork and clone this repo, cd into the directory and run:

```bash
bundle install
```

to install all the dependencies, then run:

```bash
rails s
```

to start the server.

Next, open another terminal window and run:

```bash
npm install --prefix client
npm start --prefix client
```

to install all the dependencies and start the application.

Upon loading, the user will see the homepage with with a top app bar at the top area of the page. Within the app bar, there is a "HOME" link which upon clicking, will take user back to the homepage no matter where the user was previously. Next to the "HOME" link is a search box, user can type in keywords to search for the items they need, anytime user types a letter into the input area, a fetch request will be sent to the backend server to get the list of items which match user's input. Next to the search box, there are two links, enabling users to see their order history (if the use has submitted an order), shopping cart (there will be a number after the CART word, showing how many items are currently in the shopping cart). The data in the order history and shopping cart are preserved in the backend, meaning that the data will still be there if the user log back in even after logging out and closing the web page.

On the right most of the app bar, there are a short text saying "Hello, guest" (the word guest will change to the name of the user after logging in), a "Login" link and a "Signup" link. Users can choose to signup or login if they already have signed up before. The "Login" and "Signup" links will change to "Logout" once signed in.

The main part of the homepage consists of a list of various items with titles, prices, images, user ratings, and brief description. There is an "ADD TO CART" button, which will add the corresponding item to the user's shopping cart, and will render an error message telling user to log in before adding item to the shopping cart.

For each item, the area above the rating is clickable, which will bring users to the product detail page. There, user will find the exact same information about item being clicked, with a full version of the description.

In the product detail page, there is a review section. All the user reviews about the item will be displayed, including the user name, date and time of the review, the rating the user gave to the item and the content of the review.

On the bottom of the page, there is a "START A NEW REVIEW?" button, once clicked, will show a input box, letting user to submit his/her reviews, a review must contain a rating and a content, otherwise, an error message will appear letting user know what was going wrong.

The rating for each item is calculated in the backend by averaging all the ratings for a specific item, and once user submit a review, he/she will observe that the rating of the review will change automatically reflecting the affect of the user's review.

For the review which is left by the user currently logged in, there will be two extra buttons, enabling the user to edit and delete his/her review. All these actions will be preserved in the backend.

After adding item to the shopping cart, the user can click on the "CART" link in the app bar and go to shopping cart page. There, user will find all the items currently in the cart, with total number and price of the items at the top of the page. On the bottom of each card of items, there are subtotals of the number and price of the current item, there are also two buttons, "-" and "+", letting user change the number of the item. If the number of the corresponding item is 1, the "-" button will change to "REMOVE FROM CART". Notice that the total and subtotal are changed on the fly when user click the "-" and "+" buttons.

On the top of the page, there is a "CHECKOUT" button, upon clicking, will bring user to the checkout page. In there, user will see several input boxes letting them enter their address. After entering the address, the user can click the "PLACE YOUR ORDER" button to submit the order, and the page will show a message letting the user know the order has been received and will be dispatched shortly.

Several things to notice here. After clicking the "PLACE YOUR ORDER" button, the shopping cart will be cleared, the order history will be sent to the backend, along with the user's address. So, next time when user click the "CHECKOUT" button, the address will be pre-filled. The user can just click the "PLACE YOUR ORDER" button to submit the order. Of course, the user will have the ability to change his/her address, just by clicking the "EDIT ADDRESS" button, and the changes to the address will be preserved in the backend.

After submitting the order, user can click the "ORDER HISTOTY" link in the app bar to see his/her purchase record.

In the login and signup page, all the input need to be present, otherwise and error message will occur, this is done by the frontend validation.

There are backend validations, too. All the input need not to be absent, and email needs to have correct format. The password and confirm password need to match each other, the password need to be correct in order to be able to login. If anything does not meet the validation, an clear error message will arise letting user know what is happening.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)