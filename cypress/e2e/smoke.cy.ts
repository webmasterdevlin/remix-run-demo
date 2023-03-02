describe("smoke tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should show title", async () => {
    cy.get("h1").should("be.visible");
    cy.get("h1").should("contain", /remix run/i);
  });
});
