// Use sequelize db connection 
const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");
const User = require("../users/usersModels");


const Project =sequelize.define("Project", 
  {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    projectName : {
      type: DataTypes.STRING,
      allowNull: false,
      require: true
    },
    themeName: {
      type: DataTypes.STRING,
      require: true,
      defaultValue: "yellow"
    }
  },
  {timestamps:false}
); 

module.exports = Project;