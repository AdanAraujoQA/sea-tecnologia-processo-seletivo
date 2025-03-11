
import { faker } from '@faker-js/faker';

Cypress.Commands.add('dataFormatada', () => {
  return cy.then(() => {
    const data = faker.date.past();
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    const dataFormatada = `${ano}-${mes}-${dia}`;
    return dataFormatada;
  });
});
Cypress.Commands.add('gerandoDadosParaFuncionarioTeste', () => {
  let funcionario;
  let codigo;
  codigo = faker.string.numeric({length: 3});
    funcionario = {
      nome: faker.person.fullName(),
      cpf: faker.string.numeric({ length: 11}),
      rg: faker.string.numeric({ length: 7 }),
      aniversario: cy.dataFormatada().then((dataFormatada) => {  
        funcionario.aniversario = dataFormatada; 
      }),
      rastreio: faker.seed(codigo)
   }
   return funcionario;
});
Cypress.Commands.add('gerandoDadoDeFuncionario', () => {
let funcionario;
let a = 'masculino';
let b = 'feminino';
    let sexoFuncionario = faker.helpers.arrayElement([a, b]);
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
    }
    return cy.wrap(funcionario);
  });
  

