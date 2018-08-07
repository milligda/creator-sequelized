
// ==============================================================================
// world Object
// ==============================================================================

module.exports = function(sequelize, DataTypes) {
    var World = sequelize.define("World", {

        world_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        world_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        classification: {
            type: DataTypes.STRING,
            allowNull: false
        },
        life: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        intelligent_life: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        image_slug: {
            type: DataTypes.STRING,
            allowNull: false
        },
        destroyed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    return World;
}
