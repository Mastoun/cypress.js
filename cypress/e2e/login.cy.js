import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"

describe('Проверка авторизации', function () {

     beforeEach('Начало теста', function () {
         cy.visit('/');
           });

           afterEach('Конец теста', function () {
         cy.get('#exitMessageButton > .exitIcon').should('be.visible');
        });

   it('Верный пароль и верный логин', function () {
        cy.get(main_page.email).type(data.login);
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Авторизация прошла успешно');
        cy.get(result_page.title).should('be.visible');
   })


   it('Восстановление пароля', function () {
    cy.get(main_page.fogot_pass_btn).click();
    cy.get(recovery_password_page.email).type('wiwiwi@mail.ru');
    cy.get(recovery_password_page.send_button).click();
    cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');
})


 it('Неправильный пароль', function () {
        cy.get(main_page.email).type(data.login);
        cy.get(main_page.password).type('qa_one_love10');
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Такого логина или пароля нет');
   })

    it('Неправильный логин', function () {
        cy.get(main_page.email).type('german@dolnikovich.ru');
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Такого логина или пароля нет');
   })

   it('Собаку съели', function () {
        cy.get(main_page.email).type('germandolnikov.ru');
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Нужно исправить проблему валидации')
   })

   it('Приведение к строчным буквам', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru');
        cy.get(main_page.password).type(data.password);
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Авторизация прошла успешно')
   })
})