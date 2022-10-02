import { getOfficers,getEvents,getProjects } from "../api/end_points.js";

import {expect} from 'chai';
//const chai = require('chai')
//onst expect = require('chai').expect;
//const {getOfficers} = require('../api/end_points')

it('get Officers', () => {
  console.log(getOfficers())
})
it('get Events', () => {
  console.log(getEvents())
})
it('get Projects', () => {
  console.log(getProjects())
})