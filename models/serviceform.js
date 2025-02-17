module.exports = (sequelize, DataTypes) => {
  const ServiceForm = sequelize.define("ServiceForm", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    customer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    total: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    paid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    remain: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  })
  // TODO: link to serviceform detail

  return ServiceForm;
}