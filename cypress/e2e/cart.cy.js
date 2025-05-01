describe("SauceDemo Cart Page - Positive System Test Cases", () => {
    beforeEach(() => {
      cy.visit("https://www.saucedemo.com/");
      cy.get("#user-name").type("standard_user");
      cy.get("#password").type("secret_sauce");
      cy.get("#login-button").click();
    });
  
    it("1. Add single item to cart and verify it in cart", () => {
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get(".shopping_cart_link").click();
      cy.get(".inventory_item_name").should("contain", "Sauce Labs Backpack");
    });
  
    it("2. Add multiple items to cart and verify all", () => {
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
      cy.get(".shopping_cart_link").click();
      cy.get(".cart_item").should("have.length", 2);
    });
  
    it("3. Verify correct item price in cart", () => {
      cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
      cy.get(".shopping_cart_link").click();
      cy.get(".inventory_item_price").should("contain", "$9.99");
    });
  
    it("4. Continue Shopping navigates back to inventory", () => {
      cy.get(".shopping_cart_link").click();
      cy.get('[data-test="continue-shopping"]').click();
      cy.url().should("include", "/inventory.html");
    });
  
    it("5. Proceed to Checkout navigates to checkout step one", () => {
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get(".shopping_cart_link").click();
      cy.get('[data-test="checkout"]').click();
      cy.url().should("include", "/checkout-step-one.html");
    });
  
    it("6. Badge shows correct cart item count", () => {
      cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click();
      cy.get(".shopping_cart_badge").should("contain", "1");
    });
  
    it("7. Remove item from cart", () => {
      cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click();
      cy.get(".shopping_cart_link").click();
      cy.get('[data-test="remove-sauce-labs-onesie"]').click();
      cy.get(".cart_item").should("not.exist");
    });
  
    it("8. Cart retains item after page refresh", () => {
      cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
      cy.get(".shopping_cart_link").click();
      cy.reload();
      cy.get(".inventory_item_name").should("contain", "Sauce Labs Bike Light");
    });
  
    it("9. Cart retains item after navigation", () => {
      cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
      cy.get(".shopping_cart_link").click();
      cy.get('[data-test="continue-shopping"]').click();
      cy.get(".shopping_cart_link").click();
      cy.get(".inventory_item_name").should("contain", "Sauce Labs Bolt T-Shirt");
    });
  
    it("10. Quantity displayed correctly in cart", () => {
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get(".shopping_cart_link").click();
      cy.get(".cart_quantity").should("contain", "1");
    });
  
    it("11. Cart page title is correct", () => {
      cy.get(".shopping_cart_link").click();
      cy.get(".title").should("contain", "Your Cart");
    });
  
    it("12. All product info appears (name, desc, price)", () => {
      cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
      cy.get(".shopping_cart_link").click();
      cy.get(".inventory_item_name").should("contain", "Sauce Labs Fleece Jacket");
      cy.get(".inventory_item_desc").should("exist");
      cy.get(".inventory_item_price").should("exist");
    });
  });
  