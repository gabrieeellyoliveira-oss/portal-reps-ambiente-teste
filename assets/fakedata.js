// Gerador de dados ficticios reutilizavel - nomes/cidades/negocios plausiveis
// para preencher listas grandes sem precisar copiar dados reais de terceiros.
(function (global) {
  var FIRST = ['Ana','Bruno','Carla','Daniel','Eduarda','Felipe','Gabriela','Henrique','Igor','Juliana',
    'Kaique','Larissa','Marcelo','Natalia','Otavio','Patricia','Rafael','Sabrina','Tiago','Vanessa',
    'Wesley','Yasmin','Alexandre','Beatriz','Caio','Debora','Emerson','Fabiana','Gustavo','Helena',
    'Ivan','Jessica','Lucas','Mariana','Nelson','Paula','Renato','Simone','Thiago','Vitoria',
    'Adriano','Bianca','Cesar','Diego','Elaine','Fernando','Giovana','Hugo','Isabela','Joao',
    'Karina','Leandro','Monica','Nicolas','Priscila','Ricardo','Sandra','Vinicius','William','Camila'];
  var LAST = ['Silva','Souza','Oliveira','Santos','Pereira','Costa','Rodrigues','Almeida','Ferreira','Lima',
    'Gomes','Ribeiro','Carvalho','Melo','Barbosa','Cardoso','Nascimento','Araujo','Correia','Teixeira',
    'Machado','Moreira','Cavalcanti','Dias','Castro','Campos','Andrade','Nunes','Vieira','Monteiro',
    'Freitas','Batista','Farias','Pinto','Moura','Rocha','Braga','Coutinho','Barros','Tavares'];
  var CITIES = [
    ['Fortaleza','CE'],['São Luís','MA'],['Recife','PE'],['Salvador','BA'],['Natal','RN'],
    ['João Pessoa','PB'],['Maceió','AL'],['Aracaju','SE'],['Teresina','PI'],['Belém','PA'],
    ['Manaus','AM'],['Goiânia','GO'],['Cuiabá','MT'],['Campo Grande','MS'],['Curitiba','PR'],
    ['Florianópolis','SC'],['Porto Alegre','RS'],['Vitória','ES'],['Belo Horizonte','MG'],['São Paulo','SP'],
    ['Rio de Janeiro','RJ'],['Brasília','DF'],['Osasco','SP'],['Caruaru','PE'],['Feira de Santana','BA'],
    ['Imperatriz','MA'],['Sobral','CE'],['Mossoró','RN'],['Petrolina','PE'],['Juazeiro do Norte','CE']];
  var BIZ_TYPE = ['Pizzaria','Hamburgueria','Restaurante','Lanchonete','Açaiteria','Cantina','Churrascaria',
    'Cafeteria','Sorveteria','Pastelaria','Espetaria','Doceria','Marmitaria','Sushi Bar','Creperia'];
  var BIZ_NAME = ['Sabor','Bella','Real','Estrela','Bom Gosto','Point','Delícia','Vale','Central','Prime',
    'Gourmet','Express','Nova Era','Vitória','Boa Praça','Recanto','Zé','Dona Maria','do Bairro','da Praça'];

  function seededPick(arr, seed) { return arr[seed % arr.length]; }

  function genPerson(i) {
    var f = seededPick(FIRST, i * 7 + 3);
    var l1 = seededPick(LAST, i * 11 + 5);
    var l2 = seededPick(LAST, i * 13 + 17);
    return f + ' ' + l1 + ' ' + l2;
  }
  function genCity(i) { return seededPick(CITIES, i * 9 + 2); }
  function genBiz(i) {
    return seededPick(BIZ_TYPE, i * 5 + 1) + ' ' + seededPick(BIZ_NAME, i * 3 + 4);
  }
  function initials(name) {
    return name.split(' ').slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase();
  }

  global.FakeData = { genPerson: genPerson, genCity: genCity, genBiz: genBiz, initials: initials, CITIES: CITIES };
})(window);
