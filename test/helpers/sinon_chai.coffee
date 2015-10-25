sinon = require "sinon"
chai = require "chai"
sinonChai = require "sinon-chai"

chai.use sinonChai
    .use chai.should
    .should()

module.exports = chai
