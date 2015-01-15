/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('country_w', { 
    country_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
    },
    short_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    long_name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
          timestamps: false,
          classMethods: {
            tableName: 'country_w',
            associate: function(models) {
              // associations can be defined here
             //country_t.belongsTo(models.download_record, {foreignKey:'country_t_country_id'});
            }
          }
        }
      );

  //return country_t;
};
