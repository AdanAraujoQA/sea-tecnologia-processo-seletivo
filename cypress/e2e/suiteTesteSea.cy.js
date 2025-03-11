
describe('Funcionalidade: Cadastro de Funcionário', () => {
  context('Adicionar Funcionario ativo', () => {
    let funcionario;
    
    beforeEach(() => {
        cy.visit('/');
        cy.fixture('funcionario.json').then((dados) => {
          funcionario = dados;
        });
      });
    it('Deve adicionar um funcionário e validar o payload', () => {
        cy.screenshot();
        cy.get('div.c-jqbATT>button.c-kUQtTK').should('contain','+ Adicionar Funcionário').click();
        cy.get('.ant-switch-inner').click();
        cy.xpath('//input[@name="name"]').type(funcionario.state.employee.name);
        cy.xpath('//input[@name="cpf"]').type(funcionario.state.employee.cpf);
        cy.xpath('//input[@name="rg"]').type(funcionario.state.employee.rg);
        
        cy.xpath("//div[@class='c-hJlbiD']/div/label/span/input[@value='feminino']").click().should('be.checked');
        cy.xpath("//div[@class='c-hJlbiD']/input[@name='birthDay']").type(funcionario.state.employee.birthDay);
        cy.xpath("//form[@class='c-jQtxMc']/div/div[@class='c-nkbyY']//div[@class='ant-select c-gpGEcA css-2uw1qp ant-select-single ant-select-show-arrow']").click();
        cy.get('div.rc-virtual-list')
          .find('div.ant-select-item-option-content')
          .contains('Cargo 02')
          .click({force: true});
        cy.xpath("//div[@class='c-dXMXNE']/label").click();
        cy.intercept('POST', '/employees',(req)=>{
            expect(req.body).to.deep.equal(funcionario);
        }).as('cadastrarEmployees');
        cy.xpath("//form[@class='c-jQtxMc']/button").click();
        cy.wait('@cadastrarEmployees').its('response.statusCode').should('eq', 201);
      });
    it('Adicionar Funcionário ativo com EPI e sem atestado', () => {
      cy.get('div.c-jqbATT>button.c-kUQtTK').should('contain','+ Adicionar Funcionário').click();
      cy.get('.ant-switch-inner').click();
      cy.xpath('//input[@name="name"]').type(funcionario.state.employee.name);
      cy.xpath('//input[@name="cpf"]').type(funcionario.state.employee.cpf);
      cy.xpath('//input[@name="rg"]').type(funcionario.state.employee.rg);
      cy.xpath("//div[@class='c-hJlbiD']/div/label/span/input[@value='feminino']").click().should('be.checked');
      cy.xpath("//div[@class='c-hJlbiD']/input[@name='birthDay']").type(funcionario.state.employee.birthDay);
      cy.xpath("//form[@class='c-jQtxMc']/div/div[@class='c-nkbyY']//div[@class='ant-select c-gpGEcA css-2uw1qp ant-select-single ant-select-show-arrow']").click();
        cy.get('div.rc-virtual-list')
          .find('div.ant-select-item-option-content')
          .contains('Cargo 02')
          .click({force: true});
      cy.xpath("//form[@class='c-jQtxMc']//div[@class='c-dXMXNE']/div/div/div[@class='ant-select c-gpGEcA css-2uw1qp ant-select-single ant-select-show-arrow']").click().click();
      cy.get('div.rc-virtual-list')
        .find('div.ant-select-item-option-content')
        .contains('Ativid 02')
        .click({force: true});
         cy.intercept('POST', '/employees',(req)=>{
            expect(req.body).to.deep.equal(funcionario);
        }).as('cadastrarEmployees');
        cy.get(':nth-child(2) > .c-jzRMpM').type('12345');
        funcionario.state.employee.caNumber = '12345';
        funcionario.state.employee.activity = 'Ativid 02';
        cy.xpath("//form[@class='c-jQtxMc']/button").click();
        cy.wait('@cadastrarEmployees').its('response.statusCode').should('eq', 201);
    
    });
      
  });
    
});
describe('Funcionalidade: Consultar Registro de Funcionario', () => {
  context('Consultar funcionario', () => {
    it('Deve trazer funcionários cadastrados na resposta da requisição', () => {
      // Gera dados fake do funcionário
      cy.gerandoDadoDeFuncionario().then((funcionarioFake) => {
        // Cadastra o funcionário
        cy.request('POST', 'https://analista-teste.seatecnologia.com.br/employees', funcionarioFake)
          .then((postResponse) => {
            // Valida a resposta do POST
            expect(postResponse.status).to.eq(201);
            cy.log("Resposta do POST:", postResponse.body, "Funcionario Cadastrado:", funcionarioFake);
            expect(postResponse.body.state.employee.name).to.be.equal(funcionarioFake.state.employee.name);
            expect(postResponse.body.state.employee.birthDay).to.be.equal(funcionarioFake.state.employee.birthDay);
            expect(postResponse.body.state.employee.cpf).to.be.equal(funcionarioFake.state.employee.cpf);
            expect(postResponse.body.state.employee.gender).to.be.equal(funcionarioFake.state.employee.gender);
            expect(postResponse.body.state.employee.isActive).to.be.equal(funcionarioFake.state.employee.isActive);
            expect(postResponse.body.state.employee.rg).to.be.equal(funcionarioFake.state.employee.rg);
            expect(postResponse.body.state.employee.role).to.be.equal(funcionarioFake.state.employee.role);
            expect(postResponse.body.state.employee.usesEpi).to.be.equal(funcionarioFake.state.employee.usesEpi);
            expect(postResponse.body.state.employee.caNumber).to.be.equal(funcionarioFake.state.employee.caNumber);
          });
      });
    });
  });
});