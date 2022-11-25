// Use sequelize db connection 
const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");
const Note = require("../notes/notesModels")


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


// Set up foreign key between user and projects
Project.hasMany(Note);
Note.belongsTo(Project);



module.exports = Project;