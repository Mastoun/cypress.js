import * as data_pokemons from "../helpers/data_pokemons.json"
import * as autho_poke from "../locators/autho_poke.json";
import * as pay_poke from "../locators/pay_poke.json";
import * as pay_poke2 from "../locators/pay_poke2.json";
import * as collection_poke from "../locators/collection_poke.json"
import * as my_trainer from "../locators/my_trainer.json"

describe('e2e для Покемонов', function () {

     it('e2e на покупку нового аватара', function () { 

   cy.visit('https://pokemonbattle.ru/');
   cy.get(autho_poke.login).type(data_pokemons.login); // логинимся
   cy.get(autho_poke.password).type(data_pokemons.password); //паролимся
   cy.intercept('GET', 'https://api.pokemonbattle.ru/v2/pokemons?sort=asc_date&status=1&page=1').as('getPokemons'); //перехватываем GET
   cy.get(autho_poke.button_login).click(); //жмем войти
      

      cy.wait('@getPokemons'); //ждем загрузку
      
    cy.intercept('GET', 'https://api.pokemonbattle.ru/v2/trainers?trainer_id=40917&page=0').as('getTrainer'); //перехватываем GET
    cy.get(collection_poke.go_to_trainer).click(); // переходим на страницу тренера

      
      cy.wait('@getTrainer'); //ждем загрузку
      
        cy.intercept('GET', 'https://api.pokemonbattle.ru/v2/debug_menu/get_avatars').as('getAvatars'); //перехватываем GET


    cy.get(my_trainer.buy_avatar).click(); //переходим на страницу смены аватара


      cy.wait('@getAvatars'); //ждем загрузку
     
      cy.get('.available > button').first().click(); // выбираем доступный аватар

      cy.get(pay_poke.card).type('4620869113632996'); // вводим все данные карты
      cy.get(pay_poke.code).type('125');
      cy.get(pay_poke.time).type('1226');
      cy.get(pay_poke.name).type('NAME');
      cy.get(pay_poke.pay).click(); // подтверждаем
      cy.get(pay_poke2.sms).type('56456'); //вводим код из смс
      cy.get(pay_poke2.accept).click(); // подтверждаем
})
})