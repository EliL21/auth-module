'use strict';


const { server } = require('../src/server');
const { db, users } = require('../src/models');
const supertest = require('supertest');
const request = supertest(server);

let goku;

beforeAll(async()=> {

  await db.sync();

  goku = await users.create ({

    username:'goku',
    password: 'pass123',
    role: 'pain',

  });

});

afterAll(async()=> {

  await db.drop();

});

describe('v1 routes', () => {

  it('creates a anime', async() => {
    
    let response = await request.post('/api/v1/anime').send({

      name: 'naruto',
      genre: 'action',
      main: 'itachi',
    }).set('Authorization', `Bearer ${goku.token}`)
    console.log(response.body.name);
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('naruto');
    expect(response.body.genre).toEqual('action');
    expect(response.body.main).toEqual('itachi');

    
  });

  it('gets all animes', async() => {

    let response = await request.get('/api/v1/anime').set( 'Authorization', `Bearer ${goku.token}`);
    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual('naruto');
  });
  
  it('gets a single anime by id', async() => {
    let response = await request.get('/api/v1/anime/1').set( 'Authorization', `Bearer ${goku.token}`);
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('naruto');
  });

  it('update a single anime by id', async() => {
    let response = await request.put('/api/v1/anime/1').send({
      name: 'bleach',
      genre: 'action',
      main: 'ichigo',
    }).set( 'Authorization', `Bearer ${goku.token}`);

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('bleach');

  });

  it('deletes a single anime by id', async() => {
    let response = await request.delete('/api/v1/anime/1').set( 'Authorization', `Bearer ${goku.token}`);
    
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(1);

  });

});