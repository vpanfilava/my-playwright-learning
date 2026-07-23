# Final Project: SauceDemo Tests

## Test Cases

* **TC-1: Valid User Login**
  * Step: Navigate to login page, enter valid credentials (`standard_user`), click Login.
  * Expected: User is redirected to `/inventory.html` and sees the "Products" title.

* **TC-2: Locked User Login Error**
  * Step: Enter locked user credentials (`locked_out_user`), click Login.
  * Expected: Error message "Epic sadface: Sorry, this user has been locked out." is displayed.

* **TC-3: Add Products to Cart & Verify Badge**
  * Step: Log in as standard user, click "Add to cart" on two different products.
  * Expected: Cart badge counter displays `2`.

* **TC-4: Remove Product from Cart**
  * Step: Add two products to cart, then click "Remove" on one product.
  * Expected: Cart badge counter updates to `1`.

* **TC-5: Complete Checkout Journey**
  * Step: Add item to cart, go to Cart -> Checkout, enter First Name, Last Name, Zip Code, click Continue -> Finish.
  * Expected: Success header "Thank you for your order!" is displayed.