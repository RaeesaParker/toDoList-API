// Use sequelize db connection 
const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");
const Project = require("../projects/projectsModels");
const Note = require("../notes/notesModels");


const User =sequelize.define("User", 
  {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username : {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING
    }
  },
  {timestamps:false}
); 

// Set up foreign key between user and projects
User.hasMany(Project, {onDelete: "CASCADE", onUpdate:"CASCADE"});
Project.belongsTo(User);


module.exports = User;