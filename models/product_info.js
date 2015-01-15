/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_info', { 
    product_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    file_url: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    timestamps: false,
  //  freezeTableName: true,
    classMethods: {
      tableName: 'product_info',
      associate: function(models) {
        // associations can be defined here
       //product_info.belongsTo(models.download_record, {foreignKey:'product_info_product_id'});
      }
    }
  });
  //return product_info;
};
