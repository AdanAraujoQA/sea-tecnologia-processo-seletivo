describe('Funcionalidade: Cadastro de Funcionário', () => {
  context('Adicionar Funcionario ativo', () => {
    const funcionario = {
      state: {
          employee:{
              activity:'',
              birthDay: '2000-01-01',
              caNumber: '',
              cpf: '12345678901',
              gender: 'feminino',
              isActive: true,
              name: 'João da Silva',
              rg: '1234567',
              role: 'Cargo 02',
              usesEpi: false,
                        
          },

      },
      
  }
    beforeEach(() => {
        cy.visit('/');
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