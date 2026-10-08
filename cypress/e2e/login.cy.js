describe("Login do ServeRest", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("abre a tela de login com os campos principais", () => {
    cy.contains("h1", "Login").should("be.visible");
    cy.get('[data-testid="email"]')
      .should("be.visible")
      .and("have.attr", "placeholder", "Digite seu email");
    cy.get('[data-testid="senha"]')
      .should("be.visible")
      .and("have.attr", "placeholder", "Digite sua senha");
    cy.get('[data-testid="entrar"]')
      .should("be.visible")
      .and("contain.text", "Entrar");
  });

  it("envia o formulário vazio e exibe o erro retornado", () => {
    cy.intercept("POST", "**/login", {
      statusCode: 400,
      body: { message: "Credenciais inválidas" },
    }).as("login");

    cy.get('[data-testid="entrar"]').click();

    cy.wait("@login").its("request.method").should("eq", "POST");
    cy.get('[role="alert"]')
      .should("be.visible")
      .and("contain.text", "Credenciais inválidas");
  });

  it("bloqueia o envio de um email em formato inválido", () => {
    cy.intercept("POST", "**/login").as("login");
    cy.get('[data-testid="email"]').type("email-invalido");
    cy.get('[data-testid="senha"]').type("senha-sintetica");
    cy.get('[data-testid="email"]').should(($email) => {
      expect($email[0].validity.valid).to.be.false;
    });

    cy.get('[data-testid="entrar"]').click();

    cy.get("@login.all").should("have.length", 0);
  });

  it("exibe o erro ao receber credenciais incorretas", () => {
    cy.intercept("POST", "**/login", {
      statusCode: 401,
      body: { message: "Credenciais inválidas" },
    }).as("login");

    cy.get('[data-testid="email"]').type("nao-cadastrado@example.test");
    cy.get('[data-testid="senha"]').type("senha-sintetica");
    cy.get('[data-testid="entrar"]').click();

    cy.wait("@login").its("request.body").should("deep.equal", {
      email: "nao-cadastrado@example.test",
      password: "senha-sintetica",
    });
    cy.get('[role="alert"]')
      .should("be.visible")
      .and("contain.text", "Credenciais inválidas");
  });
});