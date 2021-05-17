/// <reference types="cypress"/>

describe('Locating Elements Test', function(){

    beforeEach(function(){



        cy.fixture('ShipPayObj').then((parameters) =>{
            this.option = parameters 
        })  

        cy.fixture('CardNames').then((parameters) =>{
            this.card = parameters 
        })  


        cy.visit('/')
        
    }) 

    
    it('Search Apple Macbook', function(){

        //Search product
        cy.searchItem('Item1Data');

        //Selec Quantity
        cy.addItem('Item1Data');

        //Checkout
        cy.itemCheckout('Item1Data')

        //Guest log in
        cy.guestForm('Customer1Data');

        //Payment and shipment methods      
        cy.shipAndPaymentCash('Customer1Data');

        //Final checkout     
        cy.finalCheckout('Item1Data')

    })  

    it('Search HTC One M8 Android', function(){

        //Search product
        cy.searchItem('Item2Data');

        //Selec Quantity
        cy.addItem('Item2Data');

        //Checkout
        cy.itemCheckout('Item2Data')

        //Guest log in
        cy.guestForm('Customer2Data');

        //Payment and shipment methods      
        cy.shipAndPaymentCard('Customer2Data') ;
        
        //Final checkout     
        cy.finalCheckout('Item2Data')

    })
})