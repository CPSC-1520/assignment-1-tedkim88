describe('index is loaded correctly (debugging)', () => {
  it('passes', () => {
    cy.visit('http://localhost:8080')
  })
})

describe('Album Form handles data correctly.', ()=> {
  it('adds an album if all elements are correct.', ()=> {
    // open the page.
    cy.visit('http://localhost:8080')

    // get the album form inputs.
    cy.get('input[name="album-title"]').type("test title")
    cy.get('input[name="album-description"]').type("test description")
    cy.get('select[name="album-art"]').select('mountains.jpg')

    // submit the form
    cy.get('#album-form').submit()

    // check that the album is added to the page.
    cy.get('#all-albums-list').children().should('have.length', 1)
    
    // check that the image is loaded.
    cy.get('#all-albums-list img').should('have.attr', 'src', 'img/mountains.jpg')
  
    // check that the title is correct.
    cy.get('#all-albums-list h5').should('have.text', 'test title')

    // check that the description is correct.
    cy.get('#all-albums-list p').should('have.text', 'test description')
  })

  it('adds an album to the top of the list if there are existing albums', ()=> {
    // open the page.
    cy.visit('http://localhost:8080')

    // add the first album.
    // get the album form inputs.
    cy.get('input[name="album-title"]').type("test title")
    cy.get('input[name="album-description"]').type("test description")
    cy.get('select[name="album-art"]').select('mountains.jpg')

    // submit the form
    cy.get('#album-form').submit()

    // add the second album
    cy.get('input[name="album-title"]').type("second title")
    cy.get('input[name="album-description"]').type("second description")
    cy.get('select[name="album-art"]').select('tv.jpg')

    // submit the form
    cy.get('#album-form').submit()


    // check that the albums are added to the page.
    cy.get('#all-albums-list').children().should('have.length', 2)
    
    // check that the first image is the second album.
    cy.get('#all-albums-list img').first().should('have.attr', 'src', 'img/tv.jpg')
  
    // check that the first title is the second album.
    cy.get('#all-albums-list h5').first().should('have.text', 'second title')

    // check that the first description is the second album.
    cy.get('#all-albums-list p').first().should('have.text', 'second description')
  })


  it('does not add an album if the title is empty, and correct classes are added', ()=> {
    // open the page.
    cy.visit('http://localhost:8080')

    // get the album form inputs.
    // no typing for the title
    cy.get('input[name="album-description"]').type("test description")
    cy.get('select[name="album-art"]').select('mountains.jpg')

    // submit the form
    cy.get('#album-form').submit()

    // check that the album is NOT added to the page.
    cy.get('#all-albums-list').children().should('have.length', 0)
    
    // check that the title show have the is-invalid class.
    cy.get('input[name="album-title"]').should('have.class', 'is-invalid')
    // check that image and description should not have is-invalid class.
    cy.get('input[name="album-description"]').should('not.have.class', 'is-invalid')
    cy.get('select[name="album-art"]').should('not.have.class', 'is-invalid')
  })

  it('does not add an album if description is empty, and correct classes are added', ()=> {
    // open the page.
    cy.visit('http://localhost:8080')

    // get the album form inputs.
    cy.get('input[name="album-title"]').type("test title")
    // no typing for the description
    cy.get('select[name="album-art"]').select('mountains.jpg')

    // submit the form
    cy.get('#album-form').submit()

    // check that the album is NOT added to the page.
    cy.get('#all-albums-list').children().should('have.length', 0)
    
    // check that the description show have the is-invalid class.
    cy.get('input[name="album-description"]').should('have.class', 'is-invalid')
    // check that image and title should not have is-invalid class.
    cy.get('input[name="album-title"]').should('not.have.class', 'is-invalid')
    cy.get('select[name="album-art"]').should('not.have.class', 'is-invalid')
  })

  it('does not add an album if image is empty, and correct classes are added', ()=> {
    cy.visit('http://localhost:8080')

    // get the album form inputs.
    cy.get('input[name="album-title"]').type("test title")
    cy.get('input[name="album-description"]').type("test description")
    // no selection for image.

    // submit the form
    cy.get('#album-form').submit()

    // check that the album is NOT added to the page.
    cy.get('#all-albums-list').children().should('have.length', 0)
    
    // check that the description show have the is-invalid class.
    cy.get('select[name="album-art"]').should('have.class', 'is-invalid')
    // check that image and title should not have is-invalid class.
    cy.get('input[name="album-title"]').should('not.have.class', 'is-invalid')
    cy.get('input[name="album-description"]').should('not.have.class', 'is-invalid')
  })
})
