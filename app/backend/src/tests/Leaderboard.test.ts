import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard test', ()=>{
  afterEach(sinon.restore);
  it('retorna todos de home', async () => {
    const { status, body } = await chai.request(app).get('/leaderboard/home');
    expect(status).to.equal(200);
    expect(body.length).to.equal(16);
  });

})