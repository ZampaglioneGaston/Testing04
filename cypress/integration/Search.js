/// <reference types="cypress"/>

//Var
let text

describe('Locating Elements Test', function(){

    beforeEach(function(){
        cy.fixture('MainObj').then((parameters) =>{
            this.main = parameters 
        })
        cy.fixture('ItemPageObj').then((parameters) =>{
            this.item = parameters 
        })
        cy.fixture('CartObj').then((parameters) =>{
            this.cart = parameters 
        })
        cy.fixture('GuestFormObj').then((parameters) =>{
            this.form = parameters 
        })
        cy.fixture('ShipPayObj').then((parameters) =>{
            this.pay = parameters 
        })  

        cy.visit('/')
        
    }) 


    it('Search Apple Macbook', function(){

        cy.get(this.main.searchBox).type('Apple MacBook Pro 13-inch');
        cy.get(this.main.searchButton).click();
        cy.wait(2000);
        cy.get(this.main.prodTitleSearch).should('contain', 'Apple MacBook Pro 13-inch')
        cy.get(this.main.addCart).click();

        cy.get(this.item.prodTitlePage).should('contain', 'Apple MacBook Pro 13-inch')
        cy.get(this.item.prodQuantity).clear().type('2');
        cy.get(this.item.addCartQ).click();
        cy.wait(2000);
        cy.get(this.item.shoppingCart).click();
        cy.wait(3000);

    
        cy.get(this.cart.prodPrice).should('contain', '$1,800.00');
        cy.get(this.cart.total).should('contain', '$3,600.00')
        cy.get(this.cart.tos).check().should('be.checked');
        cy.get(this.cart.checkout).click();
        cy.get(this.cart.guestCheck).click();
        cy.wait(2000);

        cy.get(this.form.formName).type('Solaris')
        cy.get(this.form.formLast).type('Pedro')
        cy.get(this.form.formEmail).type('SolarisPedro@gmail.com')
        cy.get(this.form.formCompany).type('Solaris Tech')
        cy.get(this.form.formCountry).select('Argentina');
        cy.get(this.form.formState).select('Other');
        cy.get(this.form.formCity).type('Cordoba');
        cy.get(this.form.formAd1).type('Duarte Quiros 10');
        cy.get(this.form.formZip).type('5000');
        cy.get(this.form.formPhone).type('123456');
        cy.get(this.form.formComfirm).click();

        cy.get(this.pay.shipOption1).check().should('be.checked');
        cy.get(this.pay.ShipConfirm).click();
        cy.get(this.pay.PayOp0).check().should('be.checked');
        cy.get(this.pay.PayButton).click();
        cy.get(this.pay.PayInfoButton).click();

        const normalizeText = (s) => s.replace(/\s/g, '').toLowerCase();        //Check direcciones sean iguales
        cy.get(this.pay.ad1).then(($ad1) => {                                   // ad1 to string
            text = normalizeText($ad1.text())                                   // Saved on text var
        })   
        cy.get(this.pay.ad2).should(($ad2) => {
            const secondtext = normalizeText($ad2.text());
            expect(secondtext).to.equal(text);                                 //Assertion
        })

        cy.get(this.pay.subtotal).should('contain', '$3,600.00');
        cy.get(this.pay.confirmButton).click();

        cy.get(this.pay.successful).should('contain', 'Your order has been successfully processed!');

    })
})