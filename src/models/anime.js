'use strict';

const { Sequelize } = require("sequelize");


const animeModel = (sequelize,DataTypes) => sequelize.define('Anime', {
  name: { type: DataTypes.STRING, required:true},
  genre: { type: DataTypes.STRING, required:true},
  main: { type: DataTypes.STRING, required:false},
});



module.exports = animeModel;