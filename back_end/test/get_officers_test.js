// import { getOfficers } from "../api/end_points";

const chai = require('chai')
const expect = chai.expect

const getOfficers = require('../api/end_points')

it('get officers', () => {
  expect(getOfficers).to.equal('')
})