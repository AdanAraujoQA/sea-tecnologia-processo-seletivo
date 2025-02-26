import { faker } from '@faker-js/faker';
describe('Suíte de testes', () => {
  
  beforeEach(() => {
    cy.visit('https://analista-teste.seatecnologia.com.br/');
  })
    it('Visita uma página e verifica o título', () => {
      cy.get('h2').should('contain', 'Funcionário(s)');
    });
   
    it('Adicionar Funcionário ativo sem EPI e sem atestado', () => {
      
      cy.get('div.c-jqbATT>button.c-kUQtTK').should('contain','+ Adicionar Funcionário').click();
      cy.xpath('//input[@name="name"]').type(faker.person.fullName());
      cy.xpath('//input[@name="cpf"]').type(faker.string.numeric({ length: 11, allowLeadingZeros: false }));
      cy.xpath('//input[@name="rg"]').type(faker.string.numeric({ length: 7, allowLeadingZeros: false }));
      cy.xpath("//div[@class='c-hJlbiD']/div/label/span/input[@value='feminino']").click().should('be.checked');
      cy.xpath("//div[@class='c-hJlbiD']/div/label/span/input[@value='masculino']").should('not.be.checked');
      cy.dataFormatada().then((dataFormatada) => {  
        cy.xpath("//div[@class='c-hJlbiD']/input[@name='birthDay']").type(dataFormatada); // Supondo que #campoData é o seletor do campo de entrada
      }); // cy.xpath("/html/body/div[2]/div/div/div[@role='listbox']").shadow().click({ force: true });
      // depois rever como vai ser feito para selecionar o cargo
      cy.xpath("//div[@class='c-dXMXNE']/label").click();
      cy.xpath("//form[@class='c-jQtxMc']/button").click();
      cy.wait(5000);

    })
    it('Adicionar Funcionário ativo com EPI e sem atestado', () => {
      cy.get('div.c-jqbATT>button.c-kUQtTK').should('contain','+ Adicionar Funcionário').click();
      cy.xpath('//input[@name="name"]').type(faker.person.fullName());
      cy.xpath('//input[@name="cpf"]').type(faker.string.numeric({ length: 11, allowLeadingZeros: false }));
      cy.xpath('//input[@name="rg"]').type(faker.string.numeric({ length: 7, allowLeadingZeros: false }));
      cy.xpath("//div[@class='c-hJlbiD']/div/label/span/input[@value='feminino']").click().should('be.checked');
      cy.xpath("//div[@class='c-hJlbiD']/div/label/span/input[@value='masculino']").should('not.be.checked');
      cy.dataFormatada().then((dataFormatada) => {  
        cy.xpath("//div[@class='c-hJlbiD']/input[@name='birthDay']").type(dataFormatada); // Supondo que #campoData é o seletor do campo de entrada
      });
      })
    it('Adicionar Funcionário inativo sem EPI e sem atestado', () => {
      
      cy.get('div.c-jqbATT>button.c-kUQtTK').should('contain','+ Adicionar Funcionário').click();
      cy.xpath('//input[@name="name"]').type(faker.person.fullName());
      cy.xpath('//input[@name="cpf"]').type(faker.string.numeric({ length: 11, allowLeadingZeros: false }));
      cy.xpath('//input[@name="rg"]').type(faker.string.numeric({ length: 7, allowLeadingZeros: false }));
      cy.xpath("//div[@class='c-hJlbiD']/div/label/span/input[@value='feminino']").click().should('be.checked');
      cy.xpath("//div[@class='c-hJlbiD']/div/label/span/input[@value='masculino']").should('not.be.checked');
      cy.dataFormatada().then((dataFormatada) => {  
      cy.xpath("//div[@class='c-hJlbiD']/input[@name='birthDay']").type(dataFormatada); // Supondo que #campoData é o seletor do campo de entrada
        });     
        // cy.xpath("/html/body/div[2]/div/div/div[@role='listbox']").shadow().click({ force: true });
        // depois rever como vai ser feito para selecionar o cargo
      cy.xpath("//div[@class='c-dXMXNE']/label").click();
      cy.xpath("//form[@class='c-jQtxMc']/button").click();
      cy.wait(5000);
      })
    it('Adicionar Funcionário ativo com EPI e com atestado', () => {
      cy.get('div.c-jqbATT>button.c-kUQtTK').should('contain','+ Adicionar Funcionário').click();
      cy.xpath('//input[@name="name"]').type(faker.person.fullName());
      cy.xpath('//input[@name="cpf"]').type(faker.string.numeric({ length: 11, allowLeadingZeros: false }));
      cy.xpath('//input[@name="rg"]').type(faker.string.numeric({ length: 7, allowLeadingZeros: false }));
      cy.xpath("//div[@class='c-hJlbiD']/div/label/span/input[@value='feminino']").click().should('be.checked');
      cy.xpath("//div[@class='c-hJlbiD']/div/label/span/input[@value='masculino']").should('not.be.checked');
      cy.dataFormatada().then((dataFormatada) => {  
      cy.xpath("//div[@class='c-hJlbiD']/input[@name='birthDay']").type(dataFormatada); // Supondo que #campoData é o seletor do campo de entrada
        });   
    })
    it('Adicionar Funcionário inativo com EPI e sem atestado', () => {
    
    })
    it('Adicionar Funcionário inativo com EPI e com atestado', () => {

    })
})