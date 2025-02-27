import { faker } from '@faker-js/faker';
describe('Suíte de testes', () => {
  let funcionario;
  let codigo;
  beforeEach(() => {
    codigo = faker.string.numeric({length: 3});
  //Criando um objeto com os dados do funcionário aleatório
    funcionario = {
      nome: faker.person.fullName(),
      cpf: faker.string.numeric({ length: 11}),
      rg: faker.string.numeric({ length: 7 }),
      aniversario: cy.dataFormatada().then((dataFormatada) => {  
        funcionario.aniversario = dataFormatada; 
      }),
      rastreio: faker.seed(codigo)
    }
    cy.visit('https://analista-teste.seatecnologia.com.br/');
  })
    it.only('Visita uma página e verifica o título', () => {
      cy.get('h2').should('contain', 'Funcionário(s)');
    });
   
    it.only('Adicionar Funcionário ativo sem EPI e sem atestado', () => {
      //-------------------------Preenchimento de fomulário-----------------------------------------------------------
      cy.get('div.c-jqbATT>button.c-kUQtTK').should('contain','+ Adicionar Funcionário').click();
      cy.log('Preencher os dados do Funcionário ativo sem EPI e sem atestado');
      cy.xpath('//input[@name="name"]').type(funcionario.nome);
      cy.xpath('//input[@name="cpf"]').type(funcionario.cpf);
      cy.xpath('//input[@name="rg"]').type(funcionario.rg);
      cy.log('Selecionar o sexo do funcionário(a)');
      cy.xpath("//div[@class='c-hJlbiD']/div/label/span/input[@value='feminino']").click().should('be.checked');
      cy.xpath("//div[@class='c-hJlbiD']/div/label/span/input[@value='masculino']").should('not.be.checked');
      cy.log('Preencher a data de nascimento do funcionário(a)');
      cy.xpath("//div[@class='c-hJlbiD']/input[@name='birthDay']").type(funcionario.aniversario);
      cy.log('Selecionar o cargo do funcionário(a)');
      cy.xpath("//form[@class='c-jQtxMc']/div/div[@class='c-nkbyY']//div[@class='ant-select c-gpGEcA css-2uw1qp ant-select-single ant-select-show-arrow']").click().click();
      cy.get('div.rc-virtual-list')
        .find('div.ant-select-item-option-content')
        .contains('Cargo 02')
        .click({force: true});
      cy.log('Salvar os dados do Funcionário(a)');
      cy.xpath("//div[@class='c-dXMXNE']/label").click();
      cy.xpath("//form[@class='c-jQtxMc']/button").click();
      //-------------------------------Validação do dado adicionado------------------------------------------------------------
      cy.request('GET', 'https://analista-teste.seatecnologia.com.br/employees')
       .then((response) => {
        console.log('Resposta completa da API:', JSON.stringify(response.body, null, 2));
        expect(response.status).to.eq(200);
        // Verifica se o corpo da resposta contém as informações esperadas
        // const employee = response.body.employee;
        // cy.log('Objeto Employee', employee);
        // expect(employee).to.have.property('name', funcionario.nome);
        // expect(response.body).to.have.property('cpf', funcionario.cpf);
        // expect(response.body).to.have.property('rg', funcionario.rg);
        // expect(response.body).to.have.property('birthDay', funcionario.aniversario);
      });
     
    });

    it('Adicionar Funcionário ativo com EPI e sem atestado', () => {
      cy.get('div.c-jqbATT>button.c-kUQtTK').should('contain','+ Adicionar Funcionário').click();
      cy.xpath('//input[@name="name"]').type(faker.person.fullName());
      cy.xpath('//input[@name="cpf"]').type(faker.string.numeric({ length: 11}));
      cy.xpath('//input[@name="rg"]').type(faker.string.numeric({ length: 7}));
      cy.xpath("//div[@class='c-hJlbiD']/div/label/span/input[@value='feminino']").click().should('be.checked');
      cy.xpath("//div[@class='c-hJlbiD']/div/label/span/input[@value='masculino']").should('not.be.checked');
      cy.dataFormatada().then((dataFormatada) => {  
        cy.xpath("//div[@class='c-hJlbiD']/input[@name='birthDay']").type(dataFormatada); 
      });
      cy.xpath("//form[@class='c-jQtxMc']//div[@class='c-dXMXNE']/div/div/div[@class='ant-select c-gpGEcA css-2uw1qp ant-select-single ant-select-show-arrow']").click().click();
      cy.get('div.rc-virtual-list')
        .find('div.ant-select-item-option-content')
        .contains('Ativid 02')
        .click({force: true}).click();
      //cy.xpath("//div[@class='rc-virtual-list']/div/div/div/div[1]").click();        
    });
    it('Adicionar Funcionário inativo sem EPI e sem atestado', () => {
      
      cy.get('div.c-jqbATT>button.c-kUQtTK').should('contain','+ Adicionar Funcionário').click();
      cy.xpath('//input[@name="name"]').type(faker.person.fullName());
      cy.xpath('//input[@name="cpf"]').type(faker.string.numeric({ length: 11}));
      cy.xpath('//input[@name="rg"]').type(faker.string.numeric({ length: 7}));
      cy.xpath("//div[@class='c-hJlbiD']/div/label/span/input[@value='feminino']").click().should('be.checked');
      cy.xpath("//div[@class='c-hJlbiD']/div/label/span/input[@value='masculino']").should('not.be.checked');
      cy.dataFormatada().then((dataFormatada) => {  
      cy.xpath("//div[@class='c-hJlbiD']/input[@name='birthDay']").type(dataFormatada); 
        });     
        // cy.xpath("/html/body/div[2]/div/div/div[@role='listbox']").shadow().click({ force: true });
        // depois rever como vai ser feito para selecionar o cargo
      cy.xpath("//div[@class='c-dXMXNE']/label").click();
      cy.xpath("//form[@class='c-jQtxMc']/button").click();
      cy.wait(5000);
      });
    it('Adicionar Funcionário ativo com EPI e com atestado', () => {
      cy.get('div.c-jqbATT>button.c-kUQtTK').should('contain','+ Adicionar Funcionário').click();
      cy.xpath('//input[@name="name"]').type(faker.person.fullName());
      cy.xpath('//input[@name="cpf"]').type(faker.string.numeric({ length: 11}));
      cy.xpath('//input[@name="rg"]').type(faker.string.numeric({ length: 7}));
      cy.xpath("//div[@class='c-hJlbiD']/div/label/span/input[@value='feminino']").click().should('be.checked');
      cy.xpath("//div[@class='c-hJlbiD']/div/label/span/input[@value='masculino']").should('not.be.checked');
      cy.dataFormatada().then((dataFormatada) => {  
      cy.xpath("//div[@class='c-hJlbiD']/input[@name='birthDay']").type(dataFormatada);
        });   
    });
    it('Adicionar Funcionário inativo com EPI e sem atestado', () => {
    
    });
    it('Adicionar Funcionário inativo com EPI e com atestado', () => {

    });
    
  
});