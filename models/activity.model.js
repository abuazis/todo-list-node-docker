const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Activity = sequelize.define("Activity", {
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
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
  tableName: 'Activity',
  hooks: {
    afterCreate: (record) => {
      delete record.dataValues.deleted_at;
    },
  } 
});

(async () => {
  await Activity.sync();
})();

module.exports = Activity;