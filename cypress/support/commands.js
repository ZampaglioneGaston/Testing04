
//Search item on main
Cypress.Commands.add('searchItem', (product)  => { 

    cy.fixture('MainObj').then((main) =>{   
        cy.fixture(product).then((productData) =>{   
            cy.get(main.searchBox).type(productData.item);
            cy.get(main.searchButton).click();
            cy.wait(2000);
            cy.get(main.prodTitleSearch).should('contain', productData.item)
            cy.get(main.prodTitleSearch).click(); 
        })
    })
})


//Add item to cart & go to shopping cart
Cypress.Commands.add('addItem', (product)  => { 

    cy.fixture(product).then((productData) =>{   
        cy.get(productData.prodTitlePage).should('contain', productData.item)
        cy.get(productData.prodQuantity).clear().type(productData.qty);
        cy.get(productData.addCartQ).click();
        cy.wait(2000);
        cy.get(productData.shoppingCart).click();
        cy.wait(3000);
    })
    
})


//Cart assertion check and Guest Checkout
Cypress.Commands.add('itemCheckout', (product)  => { 

    cy.fixture('CartObj').then((cart) =>{
        cy.fixture(product).then((productData) =>{   
            cy.get(cart.prodPrice).should('contain', productData.unitPrice);
            cy.get(cart.total).should('contain', productData.total)
            cy.get(cart.tos).check().should('be.checked');
            cy.get(cart.checkout).click();
            cy.get(cart.guestCheck).click();
            cy.wait(2000);
        })
    })
})


//Guest Formulary
Cypress.Commands.add('guestForm', (customer)  => { 
    cy.fixture(customer).then((data) =>{
        cy.fixture('GuestFormObj').then((form) =>{  
            cy.get(form.formName).type(data.name)
            cy.get(form.formLast).type(data.lastname)
            cy.get(form.formEmail).type(data.email)
            cy.get(form.formCompany).type(data.company)
            cy.get(form.formCountry).select(data.country);
            cy.get(form.formState).select(data.state);
            cy.get(form.formCity).type(data.city);
            cy.get(form.formAd1).type(data.address);
            cy.get(form.formZip).type(data.zipcode);
            cy.get(form.formPhone).type(data.phone);
            cy.get(form.formComfirm).click(); 
        }) 
    })
})


//Ship option, Check/Money and address assertion
Cypress.Commands.add('shipAndPaymentCash', (customerData)  => { 

    cy.fixture('ShipPayObj').then((pay) =>{
        cy.fixture(customerData).then((data) =>{
            cy.get(data.shipOpt).check().should('be.checked');
            cy.get(pay.ShipConfirm).click();
            cy.get(pay.PayMethod0).check().should('be.checked');
            cy.get(pay.PayButton).click();
            cy.get(pay.PayInfoButton).click();

            cy.checkAddress('ShipPayObj')
        })
    })
})


//Ship option, Card and address assertion
Cypress.Commands.add('shipAndPaymentCard', (customerData)  => { 

    cy.fixture('ShipPayObj').then((pay) =>{
        cy.fixture('CardPayObj').then((card) =>{
            cy.fixture(customerData).then((data) =>{
                cy.get(data.shipOpt).check().should('be.checked');
                cy.get(pay.ShipConfirm).click();
                cy.get(pay.PayMethod1).check().should('be.checked');
                cy.get(pay.PayButton).click();
                cy.wait(1000);
                cy.get(card.CardType).select(data.cardType);
                cy.wait(1000);
                cy.get(card.CardholderName).type(data.name, data.lastname);
                cy.get(card.CardNumber).type(data.cardNumber);
                cy.wait(1000);
                cy.get(card.ExpireMonth).select(data.cardExpireM);
                cy.wait(1000);
                cy.get(card.ExpireYear).select(data.cardExpireY);
                cy.wait(1000);
                cy.get(card.CardCode).type(data.cardPin);
                cy.get(card.confirmButton).click();    
            }) 
        })  
    })       
})


//Final chechout assertions
Cypress.Commands.add('finalCheckout', (product)  => { 

    cy.fixture('ShipPayObj').then((pay) =>{
        cy.fixture(product).then((productData) =>{  
            cy.checkAddress('ShipPayObj')                             
            cy.get(pay.prodName).should('contain', productData.item); 
            cy.get(pay.prodQty).should('contain', productData.qty);       
            cy.get(pay.subtotal).should('contain', productData.total);
            cy.get(pay.confirmButton).click();
            cy.get(pay.successful).should('contain', pay.successMsg);
        })    
    })
})