import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import TeamsModel from '../database/models/TeamsModel';
import { team, teams } from './Mocks/mockTeam';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams test', ()=>{
  afterEach(sinon.restore);
  it('retorna todos os times', async ()=> {
      sinon.stub(TeamsModel, 'findAll').resolves(teams as any);
      const { status, body } = await chai.request(app).get('/teams');
      expect(status).to.equal(200);
      expect(body).to.deep.equal(teams);
  });

  it('retorna o time pelo id', async ()=> {
    sinon.stub(TeamsModel, 'findByPk').resolves(team as any);
    const { status, body } = await chai.request(app).get('/teams/1');
    expect(status).to.equal(200);
    expect(body).to.deep.equal(team);
  });

  it('se passar um id não existente', async () => {
    sinon.stub(TeamsModel, 'findByPk').resolves(null);
    const { status, body } = await chai.request(app).get('/teams/99');
    expect(status).to.equal(404);
    expect(body.message).to.equal('Team 99 not found');
  });

})