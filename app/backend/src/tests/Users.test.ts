import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UsersModel from '../database/models/UsersModel';
import { user, userWithoutEmail, userWithoutPassword, mockToken, mockTokenWrong } from './Mocks/mockUser';

chai.use(chaiHttp);

const { expect } = chai;

describe('Users test', () => {
  afterEach(sinon.restore);
  describe('post /login', () => {
      it('caso de certo',async () => {
        const httpResponse = await chai.request(app).post('/login').send(user)
        expect(httpResponse.status).to.equal(200);
      });
      it('caso não passe email',async () => {
        const httpResponse = await chai.request(app).post('/login').send(userWithoutEmail)
        expect(httpResponse.status).to.equal(400);
        expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
      });
      it('caso não passe senha',async () => {
        const httpResponse = await chai.request(app).post('/login').send(userWithoutPassword)
        expect(httpResponse.status).to.equal(400);
        expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
      });
  });

  describe('get /login/role', () => {
    it('caso não passe o token',async () => {
      const httpResponse = await chai.request(app).get('/login/role');
      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.be.deep.equal({ message: 'Token not found' });
    });
    it('caso passe o token',async () => {
        const httpResponse = await chai.request(app).get('/login/role').set('authorization', mockToken);
        expect(httpResponse.status).to.equal(200);
        expect(httpResponse.body).to.be.deep.equal({ role: 'user' });
      });

    it('caso passe o token errado',async () => {
      const httpResponse = await chai.request(app).get('/login/role').set('authorization', mockTokenWrong);
      expect(httpResponse.status).to.equal(401);
      expect(httpResponse.body).to.be.deep.equal({ message: 'Token must be a valid token' });
    });
  });
})