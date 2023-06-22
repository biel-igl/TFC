import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { newMatch, newMatchIdWrong, newMatchIdDuplicate, results } from './Mocks/mockMatches';
import MatchesModel from '../database/models/MatchesModel';
import ValidateMatch from '../Middlewares/ValidateMatch';
import ValidateToken from '../Middlewares/ValidateToken';
import { mockToken, mockTokenWrong, user } from './Mocks/mockUser';

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

  describe('patch /matches/:id/finish', () => {
    it('caso não passe o token',async () => {
      const { status, body } =  await chai.request(app).patch('/matches/1/finish');
      expect(status).to.equal(401);
      expect(body).to.deep.equal({message: 'Token not found'});
    });

    it('caso passe o token incorreto',async () => {
      const { status, body } =  await chai.request(app).patch('/matches/1/finish').set('Authorization', mockTokenWrong)
      expect(status).to.equal(401);
      expect(body).to.deep.equal({message: 'Token must be a valid token'});
    });

    it('caso de certo',async () => {
      sinon.stub(MatchesModel, 'update').resolves([1] as any);
      sinon.stub(MatchesModel, 'findByPk').resolves(results as any);
      const { status, body } =  await chai.request(app).patch('/matches/1/finish').set('Authorization', mockToken);
      expect(status).to.equal(200);
      expect(body).to.deep.equal({message: 'Finished'});
    });
  });

  describe('patch /matches/:id', () => {
    it('caso não passe o token',async () => {
      const { status, body } =  await chai.request(app).patch('/matches/1')
      expect(status).to.equal(401);
      expect(body).to.deep.equal({message: 'Token not found'});
    });

    it('caso passe o token incorreto',async () => {
      const { status, body } =  await chai.request(app).patch('/matches/1').set('Authorization', mockTokenWrong)
      expect(status).to.equal(401);
      expect(body).to.deep.equal({message: 'Token must be a valid token'});
    });

    it('caso de certo',async () => {
      sinon.stub(MatchesModel, 'update').resolves([1] as any);
      sinon.stub(MatchesModel, 'findByPk').resolves(results as any);
      const { status, body } =  await chai.request(app).patch('/matches/1').set('Authorization', mockToken)
        .send({
          "homeTeamGoals": 7,
			    "awayTeamGoals": 1
        });
      expect(status).to.equal(200);
      expect(body).to.deep.equal({message: 'GOOOOOLLL!!!!'});
    });
  });

  describe('post /matches', () => {
    it('caso não passe o token',async () => {
      const { status, body } =  await chai.request(app).post('/matches')
      expect(status).to.equal(401);
      expect(body).to.deep.equal({message: 'Token not found'});
    });
    
    it('caso passe o token incorreto',async () => {
      const { status, body } =  await chai.request(app).post('/matches').set('Authorization', mockTokenWrong)
      expect(status).to.equal(401);
      expect(body).to.deep.equal({message: 'Token must be a valid token'});
    });

    it('caso passe o id to time incorreto',async () => {
      const { status, body } =  await chai.request(app).post('/matches').set('Authorization', mockToken)
        .send(newMatchIdWrong);
      expect(status).to.equal(404);
      expect(body).to.deep.equal({message: 'There is no team with such id!'});
    });

    it('caso passe o id to time duplicado',async () => {
      const { status, body } =  await chai.request(app).post('/matches').set('Authorization', mockToken)
        .send(newMatchIdDuplicate);
      expect(status).to.equal(422);
      expect(body).to.deep.equal({message: 'It is not possible to create a match with two equal teams'});
    });

    it('caso de certo',async () => {
      sinon.stub(MatchesModel, 'create').resolves(newMatch as any);
      const {id, inProgress, ...sendData} = newMatch;
      const { status, body } =  await chai.request(app).post('/matches').set('Authorization', mockToken)
        .send(sendData);
      expect(status).to.equal(201);
      expect(body).to.deep.equal(newMatch);
    });
  });
});