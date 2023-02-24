'use strict';


const { Sequelize, DataTypes } = require('sequelize');
const animeModel = require('./anime.js');
const Collection = require('./data-collection.js');
const userModel = require('./users.js');
const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory' : process.env.DATABASE_URL ;
const sequelize = new Sequelize(DATABASE_URL);
const anime = animeModel(sequelize, DataTypes);
const users = userModel(sequelize, DataTypes);




module.exports = {
  db: sequelize,
  anime: new Collection(anime),
  users,
};