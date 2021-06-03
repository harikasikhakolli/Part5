describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/test/reset')

    const user = {
      username: 'ericm',
      name: 'Eric Miranda',
      password: 'str',
    }

    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Check if on login page by default', function () {
    cy.contains('Please Login')
  })

  describe('Logging in...', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('ericm')
      cy.get('#password').type('str')
      cy.get('#login-button').click()

      cy.contains('blogs')
    })

    it('fails with incorrect creds', function () {
      cy.get('#username').type('ericm')
      cy.get('#password').type('blah')
      cy.get('#login-button').click()

      cy.get('#msg-p')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in..', function () {
    beforeEach(function () {
      const user = { username: 'ericm', password: 'str' }
      cy.login(user)
    })

    it('A blog can be created', function () {
      cy.contains('Create Blog')
    })

    describe('When blog is created..', function () {
      beforeEach(function () {
        const blog = {
          title: 'created using cypress',
          author: 'cypress',
          url: 'http://www.blah.com'
        }
        cy.createBlog(blog)
      })

      it('Created blog is added to list', function () {
        cy.contains('created using cypress')
      })

      it('user can like a blog', function () {
        cy.get('#show-details-button').click()
        cy.get('.likeButton').click()
        cy.get('#likes').contains('1')
      })

      it('user can delete a blog', function () {
        cy.get('#show-details-button').click()
        cy.contains('remove')
      })

      it('user can only delete own blogs', function () {
        // Create new user
        let user = {
          username: 'not_eric',
          name: 'Eric Miranda',
          password: 'str',
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)

        // Logout
        cy.contains('Logout').click()

        // Login new user
        user = { username: 'not_eric', password: 'str' }
        cy.login(user)

        // Check for remove button
        cy.contains('show').click()
        cy.get('.details').should('not.contain', 'remove')
      })

      it('blogs ordered by likes', function () {
        const blog = {
          title: 'second blog',
          author: 'also cypress',
          url: 'http://www.google.com'
        }

        cy.createBlog(blog)
        cy.wait(2500)

        cy.get('.blog')
          .each(blog => {
            cy.wrap(blog)
              .contains('show')
              .click()

            cy.wrap(blog)
              .contains('like')
              .click()
          })

        cy.get('.blog:last')
          .contains('like')
          .click()

        cy.get('.blog:first')
          .contains('second blog also cypress')
      })
    })
  })
})