describe("Cadastro do ServeRest", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.get('[data-testid="cadastrar"]').click();
  });

  it("navega do login para o formulário de cadastro", () => {
    cy.location("pathname").should("eq", "/cadastrarusuarios");
    cy.contains("h2", "Cadastro").should("be.visible");
    cy.get('[data-testid="nome"]').should("be.visible");
    cy.get('[data-testid="email"]').should("be.visible");
    cy.get('[data-testid="password"]').should("be.visible");
    cy.get('[data-testid="cadastrar"]')
      .should("be.visible")
      .and("contain.text", "Cadastrar");
  });

  it("bloqueia email inválido sem enviar o cadastro", () => {
    cy.get('[data-testid="nome"]').type("Usuario de teste");
    cy.get('[data-testid="email"]').type("email-invalido");
    cy.get('[data-testid="password"]').type("senha-sintetica");

    cy.get('[data-testid="cadastrar"]').click();

    cy.get('[data-testid="email"]').should(($email) => {
      expect($email[0].validity.valid).to.be.false;
    });
    cy.location("pathname").should("eq", "/cadastrarusuarios");
  });

  it("exibe a mensagem de sucesso para uma resposta simulada", () => {
    cy.intercept("POST", "**/usuarios", {
      statusCode: 201,
      body: { message: "Cadastro realizado com sucesso" },
    }).as("cadastro");

    cy.get('[data-testid="nome"]').type("Usuario de teste");
    cy.get('[data-testid="email"]').type("usuario@example.test");
    cy.get('[data-testid="password"]').type("senha-sintetica");
    cy.get('[data-testid="cadastrar"]').click();

    cy.wait("@cadastro").its("request.method").should("eq", "POST");
    cy.contains(".alert-link", "Cadastro realizado com sucesso").should(
      "be.visible",
    );
  });

  it("retorna do cadastro para o login", () => {
    cy.get('[data-testid="entrar"]').click();

    cy.location("pathname").should("eq", "/login");
    cy.contains("h1", "Login").should("be.visible");
  });
});