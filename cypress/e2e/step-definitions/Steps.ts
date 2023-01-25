import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('the google home page is displayed', function () {
    cy.visit('www.google.com');
    cy.get('#L2AGLb').click();
});

When('google is not enough', function () {
    cy.get('input[title=Search]').type('ChatGPT {enter}');
    cy.get('h3').contains('ChatGPT: Optimizing Language Models for Dialogue').click();
});

Then('AI will do the rest', function () {
    cy.title().should('contain', 'ChatGPT');
});