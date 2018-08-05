// ==============================================================================
// Required files
// ==============================================================================

var connection = require('../config/connection.js');

// ==============================================================================
// orm Object
// ==============================================================================

var orm = {

    getAll: function(table, cb) {

        var queryString =   "SELECT id, world_name, world_type, classification, image_slug, "
        queryString     +=  "IF(life, 'yes', 'no') life, IF(intelligent_life, 'yes', 'no') intelligent_life, destroyed "
        queryString     +=  'FROM ' + table + ';';

        connection.query(queryString, function (err, result) {
            if (err) throw err;

            cb(result);
        });
    },

    add: function(table, obj, cb) {
        var queryString = 'INSERT INTO ' + table + ' SET ?';

        connection.query(queryString, obj, function (err, result) {
            if (err) throw err;

            cb(result);
        });
    },

    update: function(table, update, condition, cb) {
        var queryString = 'UPDATE ' + table + ' SET ' + update + ' WHERE ' + condition + ';';

        connection.query(queryString, function(err, result) {
            if (err) throw err;

            cb(result);
        });
    }
}

module.exports = orm;