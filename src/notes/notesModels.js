// Use sequelize db connection 
const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connection");

// NoteBin is the section where each note is saved
// 1 = ToDo   2 = Doing   3 = Done

const Note =sequelize.define("Note", 
  {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    noteTitle : {
      type: DataTypes.STRING,
      allowNull: false
    },
    noteContent: {
      type: DataTypes.STRING,
    },
    noteBin: {
      type:DataTypes.INTEGER, 
      defaultValue: 1
    }
  },
  {timestamps:false}
); 



module.exports = Note;