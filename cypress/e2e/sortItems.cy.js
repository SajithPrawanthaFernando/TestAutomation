describe("SauceDemo Product Sorting Tests", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
  });

  it("Sort by Price (low to high)", () => {
    cy.get(".product_sort_container").select("lohi");
    let prices = [];
    cy.get(".inventory_item_price")
      .each(($el) => {
        prices.push(parseFloat($el.text().replace("$", "")));
      })
      .then(() => {
        const sorted = [...prices].sort((a, b) => a - b);
        expect(prices).to.deep.equal(sorted);
      });
    cy.screenshot();
  });

  it("Sort by Price (high to low)", () => {
    cy.get(".product_sort_container").select("hilo");
    let prices = [];
    cy.get(".inventory_item_price")
      .each(($el) => {
        prices.push(parseFloat($el.text().replace("$", "")));
      })
      .then(() => {
        const sorted = [...prices].sort((a, b) => b - a);
        expect(prices).to.deep.equal(sorted);
      });
    cy.screenshot();
  });

  it("Sort by Name (A to Z)", () => {
    cy.get(".product_sort_container").select("az");
    let names = [];
    cy.get(".inventory_item_name")
      .each(($el) => {
        names.push($el.text());
      })
      .then(() => {
        const sorted = [...names].sort();
        expect(names).to.deep.equal(sorted);
      });
    cy.screenshot();
  });

  it("Sort by Name (Z to A)", () => {
    cy.get(".product_sort_container").select("za");
    let names = [];
    cy.get(".inventory_item_name")
      .each(($el) => {
        names.push($el.text());
      })
      .then(() => {
        const sorted = [...names].sort().reverse();
        expect(names).to.deep.equal(sorted);
      });
    cy.screenshot();
  });

  it("Default sort is Name (A to Z)", () => {
    let names = [];
    cy.get(".inventory_item_name")
      .each(($el) => {
        names.push($el.text());
      })
      .then(() => {
        const sorted = [...names].sort();
        expect(names).to.deep.equal(sorted);
      });
    cy.screenshot();
  });

  it("Sort dropdown options are present", () => {
    cy.get(".product_sort_container").children().should("have.length", 4);
    cy.get(".product_sort_container").contains("Name (A to Z)");
    cy.get(".product_sort_container").contains("Name (Z to A)");
    cy.get(".product_sort_container").contains("Price (low to high)");
    cy.get(".product_sort_container").contains("Price (high to low)");
    cy.screenshot();
  });

  it("Sorting updates product display order", () => {
    cy.get(".inventory_item_name")
      .first()
      .invoke("text")
      .then((firstBefore) => {
        cy.get(".product_sort_container").select("za");
        cy.get(".inventory_item_name")
          .first()
          .invoke("text")
          .should((firstAfter) => {
            expect(firstBefore).not.to.eq(firstAfter);
          });
      });
    cy.screenshot();
  });

  it("Switch between sort options multiple times", () => {
    const options = ["za", "az", "lohi", "hilo"];
    options.forEach((option) => {
      cy.get(".product_sort_container").select(option);
      cy.wait(300);
    });
    cy.screenshot();
  });

  it("Verify sorting does not duplicate products", () => {
    const seen = new Set();
    cy.get(".inventory_item_name").each(($el) => {
      const name = $el.text();
      expect(seen.has(name)).to.be.false;
      seen.add(name);
    });
    cy.screenshot();
  });

  it("Verify sorting affects both name and price correctly", () => {
    cy.get(".product_sort_container").select("az");

    let names = [];
    cy.get(".inventory_item_name")
      .each(($el) => {
        names.push($el.text());
      })
      .then(() => {
        const sortedNames = [...names].sort();
        expect(names).to.deep.equal(sortedNames);
      });

    cy.get(".product_sort_container").select("lohi");

    let prices = [];
    cy.get(".inventory_item_price")
      .each(($el) => {
        prices.push(parseFloat($el.text().replace("$", "")));
      })
      .then(() => {
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).to.deep.equal(sortedPrices);
      });

    cy.screenshot();
  });

  it("Verify sort dropdown remains enabled", () => {
    cy.get(".product_sort_container").should("not.be.disabled");
    cy.get(".product_sort_container").select("hilo");
    cy.get(".product_sort_container").should("have.value", "hilo");
    cy.screenshot();
  });

  it("Verify no visual glitches after sorting", () => {
    const sortOptions = ["az", "za", "lohi", "hilo"];
    sortOptions.forEach((option) => {
      cy.get(".product_sort_container").select(option);
      cy.wait(200);
      cy.get(".inventory_item").should("be.visible");
    });
    cy.screenshot();
  });
});
