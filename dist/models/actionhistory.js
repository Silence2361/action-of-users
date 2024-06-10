import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const ActionHistory = sequelize.define('ActionHistory', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    timestamps: true,
  });

  return ActionHistory;
};