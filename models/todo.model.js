const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Todo = sequelize.define("Todo", {
  activity_group_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  is_active: {
    type: DataTypes.TEXT,
    defaultValue: "1"
  },
  priority: {
    type: DataTypes.TEXT,
    defaultValue: "very-high"
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  deleted_at: {
    type: DataTypes.DATE,
    defaultValue: null,
  },
}, { 
  timestamps: false,
  tableName: 'Todo',
  hooks: {
    afterCreate: (record) => {
      delete record.dataValues.deleted_at;
    },
  } 
});

(async () => {
  await Todo.sync();
})();

module.exports = Todo;
