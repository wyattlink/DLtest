/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var download_record = sequelize.define('download_record', { 
    download_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_gender: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '0'
    },
    user_company: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country_w_country_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    product_info_product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    }
  }, {
    timestamps: false,
  //  freezeTableName: true,
    classMethods: {
      tableName: 'download_record',
      associate: function(models) {
        // associations can be defined here
       //download_record.hasOne(models.country_w, {as: 'userCountry', foreignKey:'country_w_country_id'});
       //download_record.hasOne(models.product_info, {as: 'downloadProduct', foreignKey:'product_info_product_id'});
     }
    }
  });
  return download_record;
};
