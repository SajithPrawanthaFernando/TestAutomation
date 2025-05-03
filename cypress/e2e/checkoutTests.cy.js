describe("SauceDemo Checkout Test Suite", () => {
  // Login before each test
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
    cy.url().should("include", "/inventory.html");
  });

  it("Complete Checkout Process - Happy Path", () => {
    // Add item to cart
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Go to cart
    cy.get(".shopping_cart_link").click();
    cy.url().should("include", "/cart.html");

    // Checkout
    cy.get('[data-test="checkout"]').click();
    cy.url().should("include", "/checkout-step-one.html");

    // Fill checkout info
    cy.get('[data-test="firstName"]').type("John");
    cy.get('[data-test="lastName"]').type("Doe");
    cy.get('[data-test="postalCode"]').type("12345");
    cy.get('[data-test="continue"]').click();
    cy.url().should("include", "/checkout-step-two.html");

    // Finish checkout
    cy.get('[data-test="finish"]').click();
    cy.url().should("include", "/checkout-complete.html");
    cy.get(".complete-header").should("contain", "Thank you for your order!");
    cy.screenshot();
  });

  it("Checkout with Multiple Items", () => {
    // Add multiple items
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    // Go to cart and verify items
    cy.get(".shopping_cart_link").click();
    cy.get(".cart_item").should("have.length", 2);

    // Complete checkout
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type("Jane");
    cy.get('[data-test="lastName"]').type("Smith");
    cy.get('[data-test="postalCode"]').type("54321");
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="finish"]').click();
    cy.get(".complete-header").should("be.visible");
    cy.screenshot();
  });

  it("Checkout Form Validation - Empty Fields", () => {
    // Add item and go to checkout
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_link").click();
    cy.get('[data-test="checkout"]').click();

    // Attempt to continue with empty fields
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should("contain", "First Name is required");
    cy.screenshot();
  });

  it("Checkout Form Validation - Missing First Name", () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_link").click();
    cy.get('[data-test="checkout"]').click();

    cy.get('[data-test="lastName"]').type("Doe");
    cy.get('[data-test="postalCode"]').type("12345");
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should("contain", "First Name is required");
    cy.screenshot();
  });

  it("Checkout Form Validation - Missing Last Name", () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_link").click();
    cy.get('[data-test="checkout"]').click();

    cy.get('[data-test="firstName"]').type("John");
    cy.get('[data-test="postalCode"]').type("12345");
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should("contain", "Last Name is required");
    cy.screenshot();
  });

  it("Checkout Form Validation - Missing Postal Code", () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_link").click();
    cy.get('[data-test="checkout"]').click();

    cy.get('[data-test="firstName"]').type("John");
    cy.get('[data-test="lastName"]').type("Doe");
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should("contain", "Postal Code is required");
    cy.screenshot();
  });

  it("Cancel Checkout from Step 1", () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_link").click();
    cy.get('[data-test="checkout"]').click();

    cy.get('[data-test="cancel"]').click();
    cy.url().should("include", "/cart.html");
    cy.screenshot();
  });

  it("Cancel Checkout from Step 2", () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_link").click();
    cy.get('[data-test="checkout"]').click();

    // Fill info and continue to step 2
    cy.get('[data-test="firstName"]').type("John");
    cy.get('[data-test="lastName"]').type("Doe");
    cy.get('[data-test="postalCode"]').type("12345");
    cy.get('[data-test="continue"]').click();

    // Cancel from step 2
    cy.get('[data-test="cancel"]').click();
    cy.url().should("include", "/inventory.html");
    cy.screenshot();
  });

  it("Verify Order Summary Information", () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_link").click();
    cy.get('[data-test="checkout"]').click();

    // Fill info
    cy.get('[data-test="firstName"]').type("John");
    cy.get('[data-test="lastName"]').type("Doe");
    cy.get('[data-test="postalCode"]').type("12345");
    cy.get('[data-test="continue"]').click();

    // Verify summary info
    cy.get(".summary_info").should("be.visible");
    cy.get(".summary_subtotal_label").should("contain", "29.99");
    cy.get(".summary_tax_label").should("contain", "2.40");
    cy.get(".summary_total_label").should("contain", "32.39");
    cy.screenshot();
  });

  it("Back Home Button After Complete Checkout", () => {
    // Complete checkout
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_link").click();
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type("John");
    cy.get('[data-test="lastName"]').type("Doe");
    cy.get('[data-test="postalCode"]').type("12345");
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="finish"]').click();

    // Click back home
    cy.get('[data-test="back-to-products"]').click();
    cy.url().should("include", "/inventory.html");
    cy.screenshot();
  });

  it("Cart is Empty After Checkout", () => {
    // Complete checkout
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get(".shopping_cart_link").click();
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type("John");
    cy.get('[data-test="lastName"]').type("Doe");
    cy.get('[data-test="postalCode"]').type("12345");
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="finish"]').click();

    // Verify cart is empty
    cy.get(".shopping_cart_link").click();
    cy.get(".cart_item").should("not.exist");
    cy.screenshot();
  });

  it("Remove Item During Checkout Process", () => {
    // Add two items
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get(".shopping_cart_link").click();

    // Start checkout
    cy.get('[data-test="checkout"]').click();

    // Go back to cart and remove an item
    cy.get('[data-test="cancel"]').click();
    cy.get('[data-test="remove-sauce-labs-bike-light"]').click();

    // Verify only one item remains
    cy.get(".cart_item").should("have.length", 1);

    // Complete checkout with remaining item
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type("John");
    cy.get('[data-test="lastName"]').type("Doe");
    cy.get('[data-test="postalCode"]').type("12345");
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="finish"]').click();
  });

});
