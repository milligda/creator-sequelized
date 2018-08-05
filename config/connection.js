// ==============================================================================
// Set Dependencies & Global Variables
// ==============================================================================

var mysql = require('mysql');
var connection;

// ==============================================================================
// Establish Database Connection
// ==============================================================================

if (process.env.JAWSDB_URL) {

    connection = mysql.createConnection(process.env.JAWSDB_URL);

} else {

    connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'creator_db'
    });
}

// ==============================================================================
// Connect to Database
// ==============================================================================

connection.connect(function(err) {
    if (err) {
        console.log('Error connecting to database: ' + err.stack);
        return;
    }

    console.log('Connected to database as id: ' + connection.threadId);
});

module.exports = connection;