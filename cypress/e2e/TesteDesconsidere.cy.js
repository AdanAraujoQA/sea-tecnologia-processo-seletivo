import { faker } from '@faker-js/faker';
import  elements  from '../support/Pages/addFuncElements';

let funcionario;
let codigo;
let a = 'masculino';
let b = 'feminino';


describe('Funcionalidade: Adicionar Funcionário', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  
   context('Adicionar Funcionário Ativo', () => {
    beforeEach(() => {
    let sexoFuncionario = faker.helpers.arrayElement([a, b]);
    codigo = faker.string.numeric({length: 3});
    funcionario = {
      state: {
        employee:{
            birthDay: cy.dataFormatada().then((dataFormatada) => {funcionario.state.employee.birthDay = dataFormatada;}),
            caNumber: '',
            cpf: faker.string.numeric({ length: 11}),
            gender: sexoFuncionario,
            isActive: true,
            name: faker.person.fullName(),
            rg: faker.string.numeric({ length: 7 }),
            role: `Cargo 0`+`${faker.number.int({min: 1, max: 5 })}`,
            usesEpi: false,
                      
        },

    },
      // nome: faker.person.fullName(),
      // cpf: faker.string.numeric({ length: 11}),
      // rg: faker.string.numeric({ length: 7 }),
      // aniversario: cy.dataFormatada().then((dataFormatada) => {  
      //   funcionario.aniversario = dataFormatada; 
      // }),
      // rastreio: faker.seed(codigo)
    }
  });
    it.only('Deve adicionar Funcionário ativo sem EPI', () => {
      cy.get('.ant-switch-inner').click();
      cy.get('div.c-jqbATT>button.c-kUQtTK').should('contain','+ Adicionar Funcionário').click();
      cy.xpath('//input[@name="name"]').type(funcionario.state.employee.name);
      cy.xpath('//input[@name="cpf"]').type(funcionario.state.employee.cpf);
      cy.xpath('//input[@name="rg"]').type(funcionario.state.employee.rg);
      cy.xpath(`//div[@class='c-hJlbiD']/div/label/span/input[@value='${funcionario.state.employee.gender}']`).click().should('be.checked');
      cy.xpath("//div[@class='c-hJlbiD']/input[@name='birthDay']").type(funcionario.state.employee.birthDay);
      cy.xpath("//form[@class='c-jQtxMc']/div/div[@class='c-nkbyY']//div[@class='ant-select c-gpGEcA css-2uw1qp ant-select-single ant-select-show-arrow']").click();
      cy.get('div.rc-virtual-list')
        .find('div.ant-select-item-option-content')
        .contains(funcionario.state.employee.role)
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
  
    context('Adicionar Funcionário inativo', () => {

    it('Adicionar Funcionário inativo com EPI e sem atestado', () => {
    
    });
    it('Adicionar Funcionário inativo com EPI e com atestado', () => {

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
    });
    context('Consultar funcionario', () => {
      it('Deve trazer funcionários cadastrados  na resposta da requisição', () => {
        cy.request('GET', 'https://analista-teste.seatecnologia.com.br/employees')
       .then((response) => {
        expect(response.status).to.eq(200);
        // Verifica se o corpo da resposta contém as informações esperadas
        const employee = response.body.state.employee;
        //cy.log('Objeto Employee', employee);
        expect(response.body.state).to.have.property('name', funcionario.nome);
        expect(response.body).to.have.property('cpf', funcionario.cpf);
        expect(response.body).to.have.property('rg', funcionario.rg);
        expect(response.body).to.have.property('birthDay', funcionario.aniversario);
      });
     
        
      })
    });
  });
});
