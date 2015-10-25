mimus = require "mimus"
newline = require "./../lib"
chai = require "./helpers/sinon_chai"
expect = chai.expect

describe "finding newlines", ->
  afterEach newline.reset
  after newline.restore

  describe "with lf", ->

  describe "with crlf", ->

  describe "with whitespace", ->
    describe "crlf", ->

    describe "lf", ->
