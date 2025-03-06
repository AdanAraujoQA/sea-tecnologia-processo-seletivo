# sea-tecnologia-processo-seletivo
Plano de teste Sea Tecnologia https://docs.google.com/document/d/16IbrBZ6Lro_5yHvoPKj9z5PglMM8M7AqZDIoX-3oFEs/edit?usp=sharing

Documentação de Relatório de Bugs https://docs.google.com/document/d/1E1oIn3MNiSpPz1Voc4_Nfi1aHilBveLq49p_9p2jq9E/edit?usp=sharing

Relatório de teste final https://docs.google.com/document/d/1hXm1gXT7KsElGyhCq-8dhJXdhjATb-Od9Wny5vEy0Sg/edit?tab=t.0#heading=h.6sz1ccjzgzrf

Plano de Teste para Aplicação Web Fictícia


# Objetivos do Plano de Teste

Este plano de teste tem como objetivo avaliar uma aplicação web fictícia em desenvolvimento, acessível em http://analista-teste.seatecnologia.com.br/. O foco é garantir que a aplicação atenda aos requisitos de design, funcionalidade, usabilidade e compatibilidade com navegadores, conforme especificado no protótipo disponível em https://tinyurl.com/yl58hs4m.Garantir a qualidade em aspectos funcionais e não funcionais, assim como identificar os bugs e melhorias:

# Funcionais
Conformidade com o Protótipo: Verificar se a aplicação web segue o design e a estrutura do protótipo.
Funcionalidade: Garantir que todas as funcionalidades estejam operando conforme o requisito do negócio.
# Não funcionais
Compatibilidade: Testar a aplicação em diferentes navegadores para garantir a acessibilidade.
Usabilidade: Validar a experiência do usuário, incluindo a navegação e a interação com os elementos da interface.
Segurança: Verificar a validação de dados e a persistência segura das informações.

# Metodologia da documentação dos testes

Nesse plano de teste optei por seguir a abordagem da técnica de teste baseada em riscos(Risk-basedTesting-RBT). O teste orientado ao risco auxilia a disponibilização de recursos, prioriza a parte mais crítica do sistema, contribui com a análise de estratégia de teste e práticas de gestão de risco na área de teste, visando à maximização do sucesso do desenvolvimento do produto. Utilizando essa abordagem consideraremos as seguintes pontuações para a categorização da priorização e o cálculo do fator de risco, onde poderão ser atribuídas notas de 1 a 5, onde quanto menor o número menor a probabilidade e impacto, após isso multiplicamos a probabilidade pelo impacto onde a partir do resultado determinamos o fator de risco.As outras etapas incluem:

Identificação de Riscos: Listar todos os riscos potenciais associados a cada funcionalidade da aplicação.

Avaliação de Riscos: Avaliar a probabilidade e o impacto de cada risco identificado para priorizar os testes.

Planejamento de Testes: Desenvolver casos de teste focados nas áreas de maior risco, garantindo cobertura completa das funcionalidades críticas.

Execução de Testes: Realizar os testes conforme o plano, monitorando e registrando qualquer falha ou comportamento inesperado.

Mitigação de Riscos: Analisar os resultados dos testes para implementar ações corretivas e preventivas, reduzindo a probabilidade de ocorrência de problemas futuros.

Relatórios e Revisão: Gerar relatórios detalhados dos testes executados e dos resultados, revisando-os com a equipe de desenvolvimento para garantir melhorias contínuas.


# Como Será Executado?
Os testes serão realizados por meio de scripts de teste automatizados, tanto quanto por testes manuais garantindo uma cobertura de testes satisfatória da aplicação.

Execução de Teste manual: Nos cenários elencados será realizado teste manual para realizar validações interagindo e navegando na aplicação como o usuário final.

Criação de Scripts de Teste: Os scripts serão escritos para cobrir todos os cenários de teste identificados no plano de teste.

Execução dos Scripts de Teste: Os scripts serão executados automaticamente em um ambiente de teste que replica o ambiente de produção.

Verificação dos Resultados: Cada script de teste e cada execução de teste manual verificará o comportamento do software, e deverá ser documentado sua evidência.

# Ambiente de Teste
Navegador Web: Google Chrome (Versão 124.0.6367.93), Edge (Versão 133.0.3065.82)

Aplicação Alvo: Aplicação web fictícia (http://analista-teste.seatecnologia.com.br/)

Documentação: Protótipo disponível em https://tinyurl.com/yl58hs4m

# Ferramentas
Node.js v22.6.0: Será utilizado para executar os scripts de teste. A instalação pode ser feita através do gerenciador de pacotes oficial.

Cypress v14.0.3: Framework de automação de testes que será utilizado para a execução dos testes. A instalação pode ser feita via npm, yarn ou pnpm.

