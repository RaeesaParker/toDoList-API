// Use sequelize db connection 
const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");


const Project =sequelize.define("Project", 
  {
    project_id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    projectName : {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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