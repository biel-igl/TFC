import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { results } from './Mocks/mockMatches';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches test', () => {
  afterEach(sinon.restore);
  describe('get /matches', () => {
      it('caso de certo',async () => {
        const httpResponse = await chai.request(app).get('/matches')
        expect(httpResponse.status).to.equal(200);
      });
      it('caso passe filtro true',async () => {
        const httpResponse = await chai.request(app).get('/matches?inProgress=true');
        expect(httpResponse.status).to.equal(200);
      });
      it('caso passe filtro false',async () => {
        const httpResponse = await chai.request(app).get('/matches?inProgress=false');
        expect(httpResponse.status).to.equal(200);
      });
  });
})