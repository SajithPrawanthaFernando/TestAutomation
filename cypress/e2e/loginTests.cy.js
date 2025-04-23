describe("SauceDemo Login Test Suite", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
  });

  it("Valid Login", () => {
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
    cy.url().should("include", "/inventory.html");
    cy.screenshot();
  });

  it("Invalid Login - Wrong Password", () => {
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("wrong_password");
    cy.get("#login-button").click();
    cy.get('[data-test="error"]').should(
      "contain",
      "Username and password do not match"
    );
    cy.screenshot();
  });

  it("Invalid Login - Wrong Username", () => {
    cy.get("#user-name").type("wrong_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
    cy.get('[data-test="error"]').should(
      "contain",
      "Username and password do not match"
    );
    cy.screenshot();
  });

  it("Empty Fields", () => {
    cy.get("#login-button").click();
    cy.get('[data-test="error"]').should("contain", "Username is required");
    cy.screenshot();
  });

  it("Only Username", () => {
    cy.get("#user-name").type("standard_user");
    cy.get("#login-button").click();
    cy.get('[data-test="error"]').should("contain", "Password is required");
    cy.screenshot();
  });

  it("Only Password", () => {
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
    cy.get('[data-test="error"]').should("contain", "Username is required");
    cy.screenshot();
  });

  it("Locked Out User", () => {
    cy.get("#user-name").type("locked_out_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
    cy.get('[data-test="error"]').should(
      "contain",
      "Sorry, this user has been locked out."
    );
    cy.screenshot();
  });

  it("Logout Functionality", () => {
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
    cy.get("#react-burger-menu-btn").click();
    cy.get("#logout_sidebar_link").click();
    cy.url().should("include", "saucedemo.com");
    cy.get("#login-button").should("be.visible");
    cy.screenshot();
  });

  it("Error Message Disappears on Close", () => {
    cy.get("#login-button").click();
    cy.get(".error-button").click();
    cy.get('[data-test="error"]').should("not.exist");
    cy.screenshot();
  });

  it("Password is Masked", () => {
    cy.get("#password").should("have.attr", "type", "password");
    cy.screenshot();
  });

  it("Case Sensitivity in Username", () => {
    cy.get("#user-name").type("Standard_User");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
    cy.get('[data-test="error"]').should(
      "contain",
      "Username and password do not match"
    );
    cy.screenshot();
  });

  it("Session Persistence After Refresh", () => {
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
    cy.reload();
    cy.url().should("include", "/inventory.html");
    cy.screenshot();
  });
});
